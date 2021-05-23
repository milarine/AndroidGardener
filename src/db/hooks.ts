import React, { useEffect, useRef, useReducer, useCallback } from 'react';

import {
  createGarden,
  getDbObject,
  getGardens,
  getPlants,
  getPlantsSortedBy,
} from './db';
import { Image, Plant, Garden } from './schema';

const useForceUpdate = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0); // hack to force the UI to update: https://github.com/realm/realm-js/issues/2655#issuecomment-611575445
  return forceUpdate;
};

const useDbObject = <T>(id: string, table: string): T | undefined => {
  const forceUpdate = useForceUpdate();
  const dbObjectRef = useRef<T & Realm.Object>();

  useEffect(() => {
    dbObjectRef.current = getDbObject(id, table);
    dbObjectRef.current?.addListener((_, changes) => {
      if (changes.deleted) {
        console.log(`deleted ${table} ${id}`);
      } else {
        console.log(`${table} ${id} changed: `, changes);
        forceUpdate();
      }
    });
    return () => dbObjectRef.current?.removeAllListeners();
  }, [forceUpdate, id, table]);

  return dbObjectRef.current;
};

const useUpdateEffect = <T>(
  resultsRef: React.MutableRefObject<Realm.Results<T>>,
  resultsProvider: () => Realm.Results<T>,
) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    resultsRef.current = resultsProvider();
    resultsRef.current.addListener((objectsInDb) => {
      console.log('objects in db changed: ', objectsInDb);
      forceUpdate();
    });
    return () => resultsRef.current?.removeAllListeners();
  }, [forceUpdate, resultsProvider, resultsRef]);
};

const useDbResults = <T>(provider: () => Realm.Results<T>): T[] => {
  const resultsRef = useRef<Realm.Results<T>>(provider());

  useUpdateEffect(resultsRef, provider);

  return resultsRef.current.map((value) => value);
};

export const usePlantsSortedBy = (
  ids: string[],
  prop: keyof Plant,
): Plant[] => {
  const plantsProvider = useCallback(() => getPlantsSortedBy(prop, ids), [
    ids,
    prop,
  ]);
  return useDbResults(plantsProvider);
};

export const useGardens = (): Garden[] => {
  const gardenProvider = useCallback(getGardens, []);
  return useDbResults(gardenProvider);
};

export const usePlants = (): Plant[] => {
  const plantsProvider = useCallback(getPlants, []);
  return useDbResults(plantsProvider);
};

export const usePlant = (plantId: string): Plant | undefined => {
  return useDbObject<Plant>(plantId, Plant.schema.name);
};

export const useImage = (imageId: string): Image | undefined => {
  return useDbObject<Image>(imageId, Image.schema.name);
};

export const useGarden = (gardenId?: string): Garden | undefined => {
  // TODO: check if all this is really necessary
  const forceUpdate = useForceUpdate();
  const dbObjectRef = useRef<Garden & Realm.Object>();

  useEffect(() => {
    let garden;
    if (gardenId) {
      garden = getDbObject<Garden>(gardenId, Garden.schema.name);
    } else {
      const gardens = getGardens();
      garden =
        gardens && gardens.length > 0
          ? getDbObject<Garden>(gardens[0].id, Garden.schema.name)
          : createGarden({
              name: 'Your first garden',
              plantIds: getPlantsSortedBy('lastWatered').map(
                (plant) => plant.id,
              ),
            });
    }

    dbObjectRef.current = garden;
    dbObjectRef.current?.addListener((_, changes) => {
      if (changes.deleted) {
        console.log('deleted garden');
      } else {
        console.log(
          `garden '${dbObjectRef.current?.name}' with id '${dbObjectRef.current?.id}' changed: `,
          changes,
        );
        forceUpdate();
      }
    });

    return () => dbObjectRef.current?.removeAllListeners();
  }, [forceUpdate, gardenId]);

  return dbObjectRef.current;
};
