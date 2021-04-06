import React from 'react';
import ActionButton from 'react-native-action-button';

import { Colors } from '../ui/Colors';
import { usePlantsSortedBy } from '../db/hooks';
import GridView from '../ui/GridView';
import createPlantView from './PlantView';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from './Navigation';
import { Plant } from '../db/schema';
// import { FlatList } from 'react-native-gesture-handler';
// import { clearDb } from '../db';

type Props = StackScreenProps<StackParamList, 'PlantOverview'>;

const PlantOverview = ({ navigation }: Props) => {
  const plants = usePlantsSortedBy('created');
  // clearDb();

  const onPressItem = (plant: Plant) => {
    navigation.navigate('PlantDetailView', { plantId: plant.id });
  };

  return (
    <>
      {/* <FlatList data={plants} renderItem={createPlantView(onPressItem)} /> */}
      <GridView items={plants} renderItem={createPlantView(onPressItem)} />
      <ActionButton
        buttonColor={Colors.highlight}
        onPress={() => {
          navigation.navigate('AddPlantView');
        }}
      />
    </>
  );
};

export default PlantOverview;
