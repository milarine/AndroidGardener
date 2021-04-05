import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { StackParamList } from '../../App';

import { createPlant } from '../db';
import { PlantInput } from '../db/schema';

type PlantOverviewNavigationProp = StackNavigationProp<
  StackParamList,
  'PlantOverview'
>;

type Props = {
  navigation: PlantOverviewNavigationProp;
};

const AddPlantView = ({ navigation }: Props) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    if (image) {
      console.log('Adding plant');
      const newPlant: PlantInput = {
        created: new Date(),
        lastWatered: new Date(),
        name: 'Test Plant',
        images: [image],
        // TODO: pick images with https://www.npmjs.com/package/react-native-image-picker
      };
      const createdPlant = createPlant(newPlant);
      console.log('created plant: ', createdPlant);
      navigation.navigate('PlantOverview');
    }
  }, [image, navigation]);

  return (
    <>
      <Button
        title="Add plant"
        onPress={() => {
          launchImageLibrary(
            {
              mediaType: 'photo',
            },
            ({ didCancel, uri, fileName, errorCode }) => {
              if (errorCode) {
                console.log(
                  'Could not launch image library. Error: ',
                  errorCode,
                );
              }
              if (uri) {
                setImage(uri);
              }
            },
          );
        }}>
        Add plant
      </Button>
    </>
  );
};

export default AddPlantView;
