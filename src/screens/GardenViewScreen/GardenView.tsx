import React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { BottomActions } from 'components';
import EditableHeadline from 'components/EditableHeadline';
import { Garden, Plant, useDefaultGarden, updateGarden } from 'db';
import { StackParamList } from 'navigation';
import { Colors } from 'theme';

import PlantList from './PlantList';

type Props = StackScreenProps<StackParamList, 'GardenView'>;

const GardenView = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const garden = useDefaultGarden();

  if (!garden) {
    return <Text>error</Text>;
  }
  const plantIds = garden.plants.map((plant) => plant.id);

  const onPressItem = (plant: Plant) => {
    navigation.navigate('PlantDetailView', { plantId: plant.id });
  };

  return (
    <BottomActions
      leftAction={() => console.log('left action, TODO: water all plants')}
      leftActionIcon="spa"
      mainAction={() => {
        navigation.navigate('AddPlantView', { gardenId: garden.id });
      }}
      mainActionIcon="spa"
      rightAction={() => navigation.navigate('GardensOverview')}
      rightActionIcon="spa">
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <View style={styles.titleContainer}>
          <EditableHeadline
            initialValue={garden.name}
            label="Garden name"
            textColor={Colors.lightest}
            iconColorEdit={Colors.light}
            iconColorSave={Colors.lightest}
            onSave={(value) => {
              const { id, created, plants } = garden;
              const gardenToSave: Garden = {
                id,
                name: value,
                created,
                plants,
              };
              updateGarden(gardenToSave);
            }}
          />
        </View>
        <View
          style={[
            styles.gardenContainerContainer,
            { backgroundColor: Colors.darkest },
          ]}>
          <View
            style={[
              styles.gardenContainer,
              { backgroundColor: colors.background },
            ]}>
            <PlantList onPressPlant={onPressItem} plantIds={plantIds} />
          </View>
        </View>
      </View>
    </BottomActions>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 10,
  },
  gardenContainerContainer: {
    flex: 1,
    paddingTop: 10,
  },
  gardenContainer: {
    flex: 1,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});

export default GardenView;
