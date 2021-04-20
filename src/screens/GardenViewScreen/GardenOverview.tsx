import React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import {
  Headline,
  IconButton,
  Text,
  Title,
  useTheme,
} from 'react-native-paper';

import { BottomActions } from 'components';
import { Plant, useDefaultGarden } from 'db';
import { StackParamList } from 'navigation';

import PlantOverview from './PlantOverview';

type Props = StackScreenProps<StackParamList, 'GardenOverview'>;

const GardenOverview = ({ navigation }: Props) => {
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
      leftAction={() => console.log('left action')}
      leftActionIcon="spa"
      mainAction={() => {
        navigation.navigate('AddPlantView');
      }}
      mainActionIcon="spa"
      rightAction={() => console.log('right action')}
      rightActionIcon="spa">
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <View style={styles.titleContainer}>
          <View style={styles.title}>
            <Title>gardener</Title>
          </View>
          <View style={styles.titleMenu}>
            <IconButton
              icon="menu"
              size={30}
              onPress={() => {
                // TODO: create new garden
                console.log('TODO: create new garden');
              }}
            />
          </View>
        </View>
        <View
          style={[
            styles.gardenContainer,
            { backgroundColor: colors.background },
          ]}>
          <Headline style={styles.gardenTitle}>{garden.name}</Headline>
          <PlantOverview onPressPlant={onPressItem} plantIds={plantIds} />
        </View>
      </View>
    </BottomActions>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  titleMenu: {
    position: 'absolute',
    right: 0,
  },
  gardenContainer: {
    flex: 1,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    padding: 10,
  },
  gardenTitle: { padding: 10 },
});

export default GardenOverview;
