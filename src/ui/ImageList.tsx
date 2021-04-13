import React from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ImageDto } from '../db/schema';

interface Props {
  images: ImageDto[];
}

const ImageList: React.FC<Props> = ({ images }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(item, index) => `key-${index}`}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <Image style={styles.image} source={{ uri: item.uri }} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: 200,
  },
  itemContainer: {
    height: 200,
    flex: 1 / 2,
  },
});

export default ImageList;
