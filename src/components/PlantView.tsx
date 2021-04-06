import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet, View, Image, ListRenderItem } from 'react-native';
import { Plant } from '../db/schema';
import { Colors } from '../ui/Colors';

interface Props {
  item: Plant;
}

const PlantView: ListRenderItem<Plant> = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Image style={styles.image} source={{ uri: item.images[0] }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
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

export default PlantView;
