import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Text, Title } from 'react-native-paper';
import { getPlant } from '../db';
import ImageList from '../ui/ImageList';
import { formatDate } from '../utils/dates';
import { StackParamList } from './Navigation';

type Props = StackScreenProps<StackParamList, 'PlantDetailView'>;

const PlantDetailView = ({
  route: {
    params: { plantId },
  },
}: Props) => {
  const plant = getPlant(plantId);

  if (!plant) {
    return <Text>error</Text>;
  }

  console.log(formatDate(plant.lastWatered));

  return (
    <View>
      <Title>{plant.name}</Title>
      <Text>{`was last watered on ${formatDate(plant.lastWatered)}`}</Text>
      <Text>{`and added to your garden on ${formatDate(plant.created)}`}</Text>
      <ImageList images={plant.images} />
    </View>
  );
};

export default PlantDetailView;
