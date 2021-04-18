import React, { useEffect } from 'react';

import type { StackScreenProps } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import {
  AddImageButton,
  DeletePlantDialog,
  ImageList,
  WaterPlantDialog,
} from 'components/index';
import { addImage, deleteImage, usePlant } from 'db/index';
import { StackParamList } from 'navigation/index';
import { formatDate } from 'utils/index';

import PlantName from './PlantName';

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
