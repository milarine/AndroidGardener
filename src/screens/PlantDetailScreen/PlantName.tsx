import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { Headline, IconButton } from 'react-native-paper';

import { TextInput } from 'components/index';
import { updatePlant, Plant } from 'db/index';

interface Props {
  plant: Plant;
}

const PlantName: React.FC<Props> = ({ plant }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [name, setName] = useState(plant.name);

  const icon = isEditingTitle ? 'check' : 'pencil';

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 70,
  },
  input: {
    width: '80%',
  },
});

export default PlantName;
