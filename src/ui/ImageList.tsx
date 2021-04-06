import React from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
  images: string[];
}

const ImageList: React.FC<Props> = ({ images }) => {
  return (
    <SafeAreaView>
      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(item, index) => `key-${index}`}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <Image style={styles.image} source={{ uri: item }} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
