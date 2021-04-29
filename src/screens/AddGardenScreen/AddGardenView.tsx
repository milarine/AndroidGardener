import React, { useState } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { FloatingActionButton, TextInput } from 'components';
import { createGarden, Plant, usePlants } from 'db';
import { StackParamList } from 'navigation';
import PlantList from 'screens/GardenViewScreen/PlantList';

type Props = StackScreenProps<StackParamList, 'AddGardenView'>;

// TODO: clean up
export const AddGardenView: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const plantsInDb = usePlants();
  // console.log(
  //   'plants in db: ',
  //   plantsInDb.map((p) => p.garden.map((g) => g.name)),
  // );

  const [plantsToAdd, setPlantsToAdd] = useState<Plant[]>([]);
  const { colors } = useTheme();
  // console.log('====================================');
  // console.log(plantsToAdd);
  // console.log('====================================');

  const handleSubmit = () => {
    const garden = createGarden({ name, plants: plantsToAdd });
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
        <PlantList
          onPressPlant={(plant) =>
            setPlantsToAdd([...plantsToAdd.slice(), plant])
          }
          pressedPlantStyle={{
            borderColor: colors.accent,
            borderWidth: 2,
          }}
          plantIds={plantsInDb?.map((p) => p.id)}
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
});
