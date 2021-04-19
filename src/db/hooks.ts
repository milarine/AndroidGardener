import { useEffect, useRef, useReducer } from 'react';

import {
  Image,
  Plant,
  getImage,
  getPlant,
  getPlantsSortedBy,
  Garden,
} from 'db';

import { createGarden, getDbObject, getGardens } from './db';

const useForceUpdate = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0); // hack to force the UI to update: https://github.com/realm/realm-js/issues/2655#issuecomment-611575445
  return forceUpdate;
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

export const usePlant = (plantId: string): Plant | undefined => {
  const forceUpdate = useForceUpdate();
  const plantRef = useRef<Plant & Realm.Object>();

  useEffect(() => {
    plantRef.current = getPlant(plantId);
    plantRef.current?.addListener((_, changes) => {
      if (changes.deleted) {
        console.log('deleted plant');
      } else {
        console.log('plant changed: ', changes);
        forceUpdate();
      }
    });
    return () => plantRef.current?.removeAllListeners();
  }, [forceUpdate, plantId]);

  return plantRef.current;
};

export const useImage = (imageId: string): Image | undefined => {
  const forceUpdate = useForceUpdate();
  const imageRef = useRef<Image & Realm.Object>();

  useEffect(() => {
    imageRef.current = getImage(imageId);
    imageRef.current?.addListener((_, changes) => {
      if (changes.deleted) {
        console.log('deleted image');
      } else {
        console.log('image changed: ', changes);
        forceUpdate();
      }
    });
    return () => imageRef.current?.removeAllListeners();
  }, [forceUpdate, imageId]);

  return imageRef.current;
};

// TODO:
const useDbObject = <T>(id: string, table: string): T | undefined => {
  const forceUpdate = useForceUpdate();
  const dbObjectRef = useRef<T & Realm.Object>();

  useEffect(() => {
    dbObjectRef.current = getDbObject(table, id);
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

export const useDefaultGarden = (): Garden | undefined => {
  const forceUpdate = useForceUpdate();
  const dbObjectRef = useRef<Garden & Realm.Object>();

  useEffect(() => {
    const gardens = getGardens();
    console.log('found gardens: ', gardens);
    const garden =
      gardens && gardens.length > 0
        ? getDbObject<Garden>(gardens[0].id, 'Garden')
        : createGarden({
            name: 'Your first garden',
            plants: getPlantsSortedBy('lastWatered').map((plant) => plant),
          });
    console.log('default garden: ', garden?.name);
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
  }, [forceUpdate]);

  return dbObjectRef.current;
};

// TODO: refactor using generics!!!
