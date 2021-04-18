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
    <TouchableOpacity onPress={() => onPressItem(item)} activeOpacity={1}>
      <View style={styles.container}>
        <View style={styles.item}>
          {item.images && item.images.length > 0 && (
            <Image style={styles.image} source={{ uri: item.images[0].uri }} />
          )}
        </View>
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
  },
  item: {
    height: 200,
    width: '50%',
  },
  infoBox: {
    padding: 5,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default createPlantView;
