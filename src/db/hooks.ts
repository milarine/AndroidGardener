import { useEffect, useRef, useReducer } from 'react';

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

export const usePlantsSortedBy = (prop: keyof Plant): Plant[] => {
  const forceUpdate = useForceUpdate();
  const plantsRef = useRef<Realm.Results<Plant>>(getPlantsSortedBy(prop));

  useEffect(() => {
    plantsRef.current = getPlantsSortedBy(prop);
    plantsRef.current.addListener((plantsInDb) => {
      console.log('plants in db changed: ', plantsInDb);
      forceUpdate();
    });
    return () => plantsRef.current?.removeAllListeners();
  }, [prop, forceUpdate]);

  return plantsRef.current.map((plant) => plant);
};

export const useGardens = (): Garden[] => {
  const forceUpdate = useForceUpdate();
  const gardensRef = useRef<Realm.Results<Garden>>(getGardens());

  useEffect(() => {
    gardensRef.current = getGardens();
    gardensRef.current.addListener((gardensInDb) => {
      console.log('gardens in db changed: ', gardensInDb);
      forceUpdate();
    });
    return () => gardensRef.current?.removeAllListeners();
  }, [forceUpdate]);

  return gardensRef.current.map((garden) => garden);
};

export const usePlants = (): Plant[] => {
  const forceUpdate = useForceUpdate();
  const plantsRef = useRef<Realm.Results<Plant>>(getPlants());

  useEffect(() => {
    plantsRef.current = getPlants();
    plantsRef.current.addListener((plantsInDb) => {
      console.log('plants in db changed: ', plantsInDb);
      forceUpdate();
    });
    return () => plantsRef.current?.removeAllListeners();
  }, [forceUpdate]);

  return plantsRef.current.map((plant) => plant);
};

export const usePlant = (plantId: string): Plant | undefined => {
  return useDbObject<Plant>(plantId, 'Plant');
};

export const useImage = (imageId: string): Image | undefined => {
  return useDbObject<Image>(imageId, 'Image');
};

export const useDefaultGarden = (gardenId?: string): Garden | undefined => {
  const forceUpdate = useForceUpdate();
  const dbObjectRef = useRef<Garden & Realm.Object>();

  useEffect(() => {
    let garden;
    if (gardenId) {
      garden = getDbObject<Garden>(gardenId, 'Garden');
    } else {
      const gardens = getGardens();
      garden =
        gardens && gardens.length > 0
          ? getDbObject<Garden>(gardens[0].id, 'Garden')
          : createGarden({
              name: 'Your first garden',
              plants: getPlantsSortedBy('lastWatered').map((plant) => plant),
            });
    }

    dbObjectRef.current = garden;
    dbObjectRef.current?.addListener((_, changes) => {
      if (changes.deleted) {
        console.log('deleted garden');
      } else {
        console.log('garden changed: ', changes);
        forceUpdate();
      }
    });
    return () => dbObjectRef.current?.removeAllListeners();
  }, [forceUpdate, gardenId]);

  return dbObjectRef.current;
};
