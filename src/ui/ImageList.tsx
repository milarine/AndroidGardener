import React from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { Image } from '../db/schema';
import { Colors } from './Colors';

interface Props {
  images: Image[];
  deleteImage: (image: Image) => void;
  navigateToFullScreenImage?: (imageId: string) => void;
}

const ImageList: React.FC<Props> = ({
  images,
  deleteImage,
  navigateToFullScreenImage,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(item, index) => `key-${index}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => {
                if (navigateToFullScreenImage) {
                  navigateToFullScreenImage(item.id);
                }
              }}>
              <ImageBackground style={styles.image} source={{ uri: item.uri }}>
                <IconButton
                  icon="close-circle-outline"
                  size={30}
                  color={Colors.white}
                  onPress={() => {
                    deleteImage(item);
                  }}
                />
              </ImageBackground>
            </TouchableOpacity>
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
    height: '100%',
    width: '100%',
  },
  itemContainer: {
    padding: 5,
    height: 200,
    width: '50%',
  },
});

export default ImageList;
