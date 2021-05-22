import React from 'react';

import type { StackScreenProps } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import EditableHeadline from 'components/EditableHeadline';
import {
  AddImageButton,
  DeletePlantDialog,
  ImageList,
  WaterPlantDialog,
} from 'components/index';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { MovePlantDialog } from 'components/MovePlantDialog';
import { addImage, deleteImage, renamePlant, usePlant } from 'db';
import { StackParamList } from 'navigation';
import { Colors } from 'theme';
import { formatDate } from 'utils';

type Props = StackScreenProps<StackParamList, 'PlantDetailView'>;

const PlantDetailView: React.FC<Props> = ({
  route: {
    params: { plantId },
  },
  navigation,
}) => {
  const plant = usePlant(plantId);

  if (!plant) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <EditableHeadline
        initialValue={plant.name}
        label="Plant name"
        onSave={(value) => {
          renamePlant(plant.id, value);
        }}
        textColor={Colors.black}
      />
      <MovePlantDialog plantId={plant.id} />
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
