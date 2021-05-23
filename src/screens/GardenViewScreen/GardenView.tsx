import React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { BottomActions } from 'components';
import EditableHeadline from 'components/EditableHeadline';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { useGarden, renameGarden } from 'db';
// import { deleteImage, getImages } from 'db/db';
import { StackParamList } from 'navigation';
import { Colors } from 'theme';

import PlantListDetailed from './PlantListDetailed';

type Props = StackScreenProps<StackParamList, 'GardenView'>;

const GardenView = ({
  navigation,
  route: {
    params: { gardenId },
  },
}: Props) => {
  const { colors } = useTheme();
  const garden = useGarden(gardenId);

  if (!garden) {
    return <LoadingSpinner />;
  }

  // const images = getImages()
  //   .filter((i) => i.plant.map((p) => p.id).filter(Boolean).length === 0)
  //   .map((i) => i.id);

  // console.log('images without plant: ', images);
  // images.forEach((i) => deleteImage(i));

  const plantIds = garden.plants.map((plant) => plant.id);

  const onPressItem = (plantId: string) => {
    navigation.navigate('PlantDetailView', { plantId });
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
            iconColorEdit={Colors.dark}
            iconColorSave={Colors.lightest}
            onSave={(value) => {
              renameGarden(garden.id, value);
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
            <PlantListDetailed onPressPlant={onPressItem} plantIds={plantIds} />
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
