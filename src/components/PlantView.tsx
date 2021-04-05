import React from 'react';
import { StyleSheet, View, Text, Image, ListRenderItem } from 'react-native';
import { Plant } from '../db/schema';
import { Colors } from '../ui/Colors';

interface Props {
  item: Plant;
}

const PlantView: ListRenderItem<Plant> = ({ item }: Props) => {
  // const PlantView: ListRenderItem<Plant> = ({ item }) => {
  console.log('rendering plant view for: ', item.id);

  return (
    <View style={styles.container}>
      <Text style={styles.imageThumbnail}>{item.name}</Text>
      {/* <Image style={styles.imageThumbnail} source={{ uri: item.src }} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  imageThumbnail: {
    color: Colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

export default PlantView;
