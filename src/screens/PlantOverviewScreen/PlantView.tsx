import React from 'react';

import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Headline, Text } from 'react-native-paper';

import { Plant } from 'db';
import { Colors } from 'theme';
import { dateDifferenceString } from 'utils';

const createPlantView: (
  onPressItem: (plant: Plant) => void,
) => ({ item }: ListRenderItemInfo<Plant>) => JSX.Element = (onPressItem) => ({
  item,
}: ListRenderItemInfo<Plant>) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPressItem(item)}
      activeOpacity={1}>
      {item.images && item.images.length > 0 && (
        <View style={[styles.item, styles.imageContainer]}>
          <Image style={styles.image} source={{ uri: item.images[0].uri }} />
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
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 10,
  },
  item: {
    height: 100,
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
});

export default createPlantView;
