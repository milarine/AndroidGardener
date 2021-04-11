import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Title } from 'react-native-paper';
import { usePlant } from '../db/hooks';
import ImageList from '../ui/ImageList';
import { formatDate } from '../utils/dates';
import DeletePlantDialog from './DeletePlantDialog';
import { StackParamList } from './Navigation';
import WaterPlantDialog from './WaterPlantDialog';

type Props = StackScreenProps<StackParamList, 'PlantDetailView'>;

const PlantDetailView: React.FC<Props> = ({
  route: {
    params: { plantId },
  },
  navigation,
}) => {
  const plant = usePlant(plantId);

  if (!plant) {
    return <Text>error</Text>;
  }

  return (
    <View style={styles.container}>
      <Title>{plant.name}</Title>
      <View style={styles.actions}>
        <WaterPlantDialog plant={plant} />
        <DeletePlantDialog plantId={plant.id} goBack={navigation.goBack} />
      </View>
      <Text>{`was last watered on ${formatDate(plant.lastWatered)}`}</Text>
      <Text>{`and added to your garden on ${formatDate(plant.created)}`}</Text>
      <ImageList images={plant.images} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  actions: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PlantDetailView;
