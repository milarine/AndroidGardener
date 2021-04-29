import React, { useState } from 'react';

import { StyleProp, ViewStyle } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import { Plant, usePlantsSortedBy } from 'db';

import { createPlantView, renderHiddenItem } from './PlantView';

interface Props {
  plantIds: string[];
  onPressPlant: (plant: Plant) => void;
  pressedPlantStyle?: StyleProp<ViewStyle>;
}

const PlantList = ({ plantIds, onPressPlant, pressedPlantStyle }: Props) => {
  const plants = usePlantsSortedBy('lastWatered').filter((plant) =>
    plantIds.includes(plant.id),
  );

  const [pressed, setIsPressed] = useState<string[]>([]);

  const onPress = (plant: Plant) => {
    const pressedPlants = pressed.slice();
    if (pressed.some((p) => p === plant.id)) {
      pressedPlants.filter((p) => p !== plant.id);
    } else {
      pressedPlants.push(plant.id);
    }
    setIsPressed(pressedPlants);
    onPressPlant(plant);
  };

  return (
    <SwipeListView
      data={plants}
      disableRightSwipe
      renderItem={createPlantView(onPress, pressedPlantStyle, pressed)}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-150}
      keyExtractor={(item) => item.id}
    />
  );
};

export default PlantList;
