import React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import {
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import { Text } from 'react-native-paper';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';

import { FloatingActionButton } from 'components';
import { Plant, waterPlant, usePlantsSortedBy } from 'db';
import { StackParamList } from 'navigation';

import createPlantView from './PlantView';

type Props = StackScreenProps<StackParamList, 'PlantOverview'>;

const PlantOverview = ({ navigation }: Props) => {
  const plants = usePlantsSortedBy('lastWatered');

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
        icon="plus"
      />
    </>
  );
};

const styles = StyleSheet.create({
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
