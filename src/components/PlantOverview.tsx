import React from 'react';
import ActionButton from 'react-native-action-button';
import { Colors } from '../ui/Colors';
import { createPlant } from '../db';
import { usePlantsSortedBy } from '../db/hooks';
import GridView from '../ui/GridView';
import PlantView from './PlantView';
import { PlantInput } from '../db/schema';

const PlantOverview = () => {
  const plants = usePlantsSortedBy('created');
  console.log('PlantOverview plants:', plants);

  return (
    <>
      <GridView items={plants} renderItem={PlantView} />
      <ActionButton
        buttonColor={Colors.highlight}
        onPress={() => {
          console.log('Adding plant');
          const newPlant: PlantInput = {
            created: new Date(),
            lastWatered: new Date(),
            name: 'Test Plant',
            images: [],
            // TODO: pick images with https://www.npmjs.com/package/react-native-image-picker
          };
          const createdPlant = createPlant(newPlant);
          console.log('created plant: ', createdPlant);
        }}
      />
    </>
  );
};

export default PlantOverview;
