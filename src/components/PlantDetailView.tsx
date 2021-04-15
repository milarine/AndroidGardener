import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, IconButton, Text } from 'react-native-paper';

import { deleteImage, updatePlant } from '../db';
import { usePlant } from '../db/hooks';
import { Plant } from '../db/schema';
import ImageList from '../ui/ImageList';
import TextInput from '../ui/TextInput';
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
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [name, setName] = React.useState(plant?.name || '');

  if (!plant) {
    return <Text>error</Text>;
  }

  const icon = isEditingTitle ? 'check' : 'pencil';

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        {isEditingTitle ? (
          <TextInput
            style={styles.input}
            label={'Name'}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        ) : (
          <Headline>{plant.name}</Headline>
        )}
        <IconButton
          icon={icon}
          onPress={() => {
            if (isEditingTitle) {
              const { id, lastWatered, created, images } = plant;
              const plantToSave: Plant = {
                id,
                name,
                created,
                images,
                lastWatered,
              };
              updatePlant(plantToSave);
            }
            setIsEditingTitle(!isEditingTitle);
          }}
        />
      </View>

      <Text>{`was last watered on ${formatDate(plant.lastWatered)}`}</Text>
      <Text>{`and added to your garden on ${formatDate(plant.created)}`}</Text>
      <ImageList
        images={plant.images}
        deleteImage={(image) => {
          deleteImage(image.id);
        }}
      />
      <View style={styles.actions}>
        <DeletePlantDialog plantId={plant.id} goBack={navigation.goBack} />
        <WaterPlantDialog plant={plant} />
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
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '80%',
  },
});

export default PlantDetailView;
