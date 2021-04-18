import type { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { addImage, deleteImage } from '../../db';
import { usePlant } from '../../db/hooks';
import ImageList from '../../ui/ImageList';
import { formatDate } from '../../utils/dates';
import DeletePlantDialog from '../../components/DeletePlantDialog';
import { StackParamList } from '../../components/Navigation';
import WaterPlantDialog from '../../components/WaterPlantDialog';
import PlantName from './PlantName';
import AddImageButton from '../../ui/AddImageButton';

type Props = StackScreenProps<StackParamList, 'PlantDetailView'>;

const PlantDetailView: React.FC<Props> = ({
  route: {
    params: { plantId },
  },
  navigation,
}) => {
  const plant = usePlant(plantId);

  useEffect(() => {
    navigation.setOptions({ title: plant?.name });
  }, [navigation, plant]);

  if (!plant) {
    return <Text>error</Text>;
  }

  return (
    <View style={styles.container}>
      <PlantName plant={plant} />
      <Text>{`was last watered on ${formatDate(plant.lastWatered)}`}</Text>
      <Text>{`and added to your garden on ${formatDate(plant.created)}`}</Text>
      <ImageList
        images={plant.images}
        deleteImage={(image) => {
          deleteImage(image.id);
        }}
        navigateToFullScreenImage={(imageId) => {
          navigation.navigate('ImageFullScreenView', { imageId });
        }}
      />
      <View style={styles.actions}>
        <DeletePlantDialog plantId={plant.id} goBack={navigation.goBack} />
        <AddImageButton
          addImage={(uri: string) => {
            addImage(plant, uri);
          }}
        />
        <WaterPlantDialog plantId={plant.id} />
      </View>
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
