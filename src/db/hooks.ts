import { useState, useEffect, useRef, useReducer } from 'react';
import { getPlantsSortedBy } from '.';
import { Plant } from './schema';

export const usePlantsSortedBy = (prop: keyof Plant): Plant[] => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0); // hack to force the UI to update: https://github.com/realm/realm-js/issues/2655#issuecomment-611575445
  const [plants, setPlants] = useState<Plant[]>(() =>
    getPlantsSortedBy(prop).map((plant) => plant),
  );
  const plantsRef = useRef<Realm.Results<Plant>>();

  useEffect(() => {
    plantsRef.current = getPlantsSortedBy(prop);
    plantsRef.current.addListener((plantsInDb) => {
      console.log('plant change: ', plantsInDb);
      setPlants(plantsInDb.map((plant) => plant));
      forceUpdate();
    });
    return () => plantsRef.current?.removeAllListeners();
  }, [prop]);

  return plants;
};
