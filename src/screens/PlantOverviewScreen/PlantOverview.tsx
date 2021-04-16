import React from 'react';

import { usePlantsSortedBy } from '../../db/hooks';
import createPlantView from './PlantView';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../components/Navigation';
import { Plant } from '../../db/schema';
import { FlatList } from 'react-native-gesture-handler';
import FloatingActionButton from '../../ui/FAB';

type Props = StackScreenProps<StackParamList, 'PlantOverview'>;

const PlantOverview = ({ navigation }: Props) => {
  const plants = usePlantsSortedBy('lastWatered');

  const onPressItem = (plant: Plant) => {
    navigation.navigate('PlantDetailView', { plantId: plant.id });
  };

  return (
    <>
      <FlatList
        data={plants}
        renderItem={createPlantView(onPressItem)}
        keyExtractor={(item) => item.id}
      />
      <FloatingActionButton
        onPress={() => {
          navigation.navigate('AddPlantView');
        }}
        icon="plus"
      />
    </>
  );
};

export default PlantOverview;
