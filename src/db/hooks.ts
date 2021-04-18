import { useEffect, useRef, useReducer } from 'react';

import { Image, Plant, getImage, getPlant, getPlantsSortedBy } from 'db/index';

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

// TODO: refactor using generics!!!
