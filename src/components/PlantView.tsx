import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet, Image, Pressable } from 'react-native';
import { Plant } from '../db/schema';
import { Colors } from '../ui/Colors';

interface Props {
  item: Plant;
}

const createPlantView: (
  onPressItem: (plant: Plant) => void,
) => ({ item }: Props) => JSX.Element = (onPressItem) => ({ item }: Props) => {
  return (
    <Pressable style={styles.container} onPress={() => onPressItem(item)}>
      <Text style={styles.name}>{item.name}</Text>
      <Image style={styles.image} source={{ uri: item.images[0] }} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    flexDirection: 'column',
    margin: 1,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
  },
  name: {
    color: Colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default createPlantView;
