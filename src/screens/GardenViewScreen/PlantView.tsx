import React from 'react';

import {
  Animated,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Headline, Text } from 'react-native-paper';
import { RowMap } from 'react-native-swipe-list-view';

import { CachedImage } from 'components/CachedImage';
import { Plant, waterPlant } from 'db';
import { Colors } from 'theme';
import { dateDifferenceString } from 'utils';

export const renderHiddenItem = (
  { item }: ListRenderItemInfo<Plant>,
  rowMap: RowMap<Plant>,
) => (
  <TouchableOpacity
    style={[styles.hiddenItemContainer, styles.container]}
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
    <Text style={styles.waterText}>Water</Text>
  </TouchableOpacity>
);

export const createPlantView: (
  onPressItem: (plantId: string) => void,
) => ({ item }: ListRenderItemInfo<Plant>) => JSX.Element = (onPressItem) => ({
  item,
}: ListRenderItemInfo<Plant>) => {
  const image = item.images[0];
  console.log('creating plant view: ', item.name);

  return (
    <TouchableOpacity
      style={[styles.plantContainer, styles.container]}
      onPress={() => {
        onPressItem(item.id);
      }}
      activeOpacity={1}>
      {item.images && item.images.length > 0 && (
        <View style={[styles.item, styles.imageContainer]}>
          <CachedImage style={styles.image} base64={image.uri} id={image.id} />
        </View>
      )}
      <View style={[styles.item, styles.infoBox]}>
        <Headline>{item.name}</Headline>
        <Text>{`last watered ${dateDifferenceString(
          item.lastWatered,
          new Date(),
        )}`}</Text>
        <Text>{`added to your garden ${dateDifferenceString(
          item.created,
          new Date(),
        )}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  plantContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    elevation: 10,
  },
  item: {
    minHeight: 100,
  },
  imageContainer: {
    width: '40%',
  },
  infoBox: {
    padding: 5,
    width: '60%',
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
  },
  hiddenItemContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  waterText: {
    marginRight: 20,
    fontSize: 30,
  },
});
