import React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import {
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import {
  Headline,
  IconButton,
  Text,
  Title,
  useTheme,
} from 'react-native-paper';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';

import { FloatingActionButton } from 'components';
import { Plant, waterPlant, usePlantsSortedBy } from 'db';
import { StackParamList } from 'navigation';

import createPlantView from './PlantView';

type Props = StackScreenProps<StackParamList, 'PlantOverview'>;

const PlantOverview = ({ navigation }: Props) => {
  const plants = usePlantsSortedBy('lastWatered');
  const { colors } = useTheme();

  const onPressItem = (plant: Plant) => {
    navigation.navigate('PlantDetailView', { plantId: plant.id });
  };

  const renderHiddenItem = (
    { item }: ListRenderItemInfo<Plant>,
    rowMap: RowMap<Plant>,
  ) => (
    <TouchableOpacity
      style={styles.hiddenItemContainer}
      onPress={() => {
        Animated.timing(new Animated.Value(1), {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          waterPlant(item.id);
          rowMap[item.id].closeRow();
        });
      }}>
      <View style={styles.waterText}>
        <Text style={styles.waterText}>Water</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
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
          <Headline style={styles.gardenTitle}>garden.name</Headline>
          <SwipeListView
            data={plants}
            disableRightSwipe
            renderItem={createPlantView(onPressItem)}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            keyExtractor={(item) => item.id}
          />
          <FloatingActionButton
            onPress={() => {
              navigation.navigate('AddPlantView');
            }}
            icon="spa"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
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
  hiddenItemContainer: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  waterText: {
    marginRight: 20,
    fontSize: 30,
  },
});

export default PlantOverview;
