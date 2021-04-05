import React from 'react';
import ActionButton from 'react-native-action-button';

import { Colors } from '../ui/Colors';
import { usePlantsSortedBy } from '../db/hooks';
import GridView from '../ui/GridView';
import PlantView from './PlantView';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../App';
import { clearDb } from '../db';

type PlantOverviewNavigationProp = StackNavigationProp<
  StackParamList,
  'PlantOverview'
>;

type Props = {
  navigation: PlantOverviewNavigationProp;
};

const PlantOverview = ({ navigation }: Props) => {
  const plants = usePlantsSortedBy('created');
  console.log('PlantOverview plants:', plants);

  // clearDb();

  return (
    <>
      <GridView items={plants} renderItem={PlantView} />
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
