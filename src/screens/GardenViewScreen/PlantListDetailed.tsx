import React from 'react';

import { SwipeListView } from 'react-native-swipe-list-view';

import { usePlantsSortedBy } from 'db';

import { createPlantView, renderHiddenItem } from './PlantView';

interface Props {
  plantIds: string[];
  onPressPlant: (plantId: string) => void;
}

const PlantListDetailed: React.FC<Props> = ({ plantIds, onPressPlant }) => {
  const plants = usePlantsSortedBy(plantIds, 'lastWatered');

  const onPress = (plantId: string) => {
    onPressPlant(plantId);
  };

  return (
    <SwipeListView
      data={plants}
      disableRightSwipe
      renderItem={createPlantView(onPress)}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-150}
      keyExtractor={(item) => item.id}
    />
  );
};

export default PlantListDetailed;
