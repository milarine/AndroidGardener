import React from 'react';

import { SwipeListView } from 'react-native-swipe-list-view';

import { Plant, usePlantsSortedBy } from 'db';

import { createPlantView, renderHiddenItem } from './PlantView';

interface Props {
  plantIds: string[];
  onPressPlant: (plant: Plant) => void;
}

const PlantList = ({ plantIds, onPressPlant }: Props) => {
  const plants = usePlantsSortedBy('lastWatered').filter((plant) =>
    plantIds.includes(plant.id),
  );

  return (
    <SwipeListView
      data={plants}
      disableRightSwipe
      renderItem={createPlantView(onPressPlant)}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-150}
      keyExtractor={(item) => item.id}
    />
  );
};

export default PlantList;
