import React, { useState } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { FloatingActionButton, TextInput } from 'components';
import { createGarden, getPlantsSortedBy } from 'db';
import { StackParamList } from 'navigation';

import SelectablePlantList, { SelectablePlant } from './SelectablePlantList';

type Props = StackScreenProps<StackParamList, 'AddGardenView'>;

export const AddGardenView: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [plants, setPlants] = useState<SelectablePlant[]>(() => {
    return getPlantsSortedBy('name').map((p) => ({
      id: p.id,
      name: p.name,
      images: p.images,
      selected: false,
    }));
  });

  const { colors } = useTheme();

  const handleSubmit = () => {
    const plantsToAdd = plants.filter((p) => p.selected).map((p) => p.id);
    const garden = createGarden({ name, plantIds: plantsToAdd });
    navigation.reset({
      index: 0,
      routes: [{ name: 'GardenView', params: { gardenId: garden?.id } }],
    });
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          label="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <SelectablePlantList
          onPressPlant={(plant) => {
            plant.selected = !plant.selected;
            const index = plants.findIndex((p) => p.id === plant.id);
            const newPlants = plants.slice();
            newPlants[index] = plant;
            setPlants(newPlants);
          }}
          plants={plants}
          pressedPlantStyle={[
            styles.pressedPlantStyle,
            { borderColor: colors.accent },
          ]}
        />
      </View>
      <FloatingActionButton onPress={handleSubmit} icon="check" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  pressedPlantStyle: {
    borderWidth: 2,
  },
});
