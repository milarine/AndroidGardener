import { useState, useEffect, useRef, useReducer } from 'react';
import { getPlant, getPlantsSortedBy } from '.';
import { Plant } from './schema';

const useForceUpdate = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0); // hack to force the UI to update: https://github.com/realm/realm-js/issues/2655#issuecomment-611575445
  return forceUpdate;
};

export const usePlantsSortedBy = (prop: keyof Plant): Plant[] => {
  const forceUpdate = useForceUpdate();
  const [plants, setPlants] = useState<Plant[]>(() =>
    getPlantsSortedBy(prop).map((plant) => plant),
  );
  const plantsRef = useRef<Realm.Results<Plant>>();

  useEffect(() => {
    plantsRef.current = getPlantsSortedBy(prop);
    plantsRef.current.addListener((plantsInDb) => {
      setPlants(plantsInDb.map((plant) => plant));
      forceUpdate();
    });
    return () => plantsRef.current?.removeAllListeners();
  }, [prop, forceUpdate]);

  return plants;
};

export const usePlant = (plantId: string): Plant | undefined => {
  const forceUpdate = useForceUpdate();
  const [plant, setPlant] = useState<(Plant & Realm.Object) | undefined>(() =>
    getPlant(plantId),
  );

  const plantRef = useRef<Plant & Realm.Object>();

  useEffect(() => {
    plantRef.current = getPlant(plantId);
    plantRef.current?.addListener((plantInDb, changes) => {
      if (changes.deleted) {
        console.log('deleted plant');
      } else {
        console.log('plant changed: ', changes);
        setPlant(plantInDb);
        forceUpdate();
      }
    });
    return () => plantRef.current?.removeAllListeners();
  }, [forceUpdate, plantId]);

  return plant;
};
