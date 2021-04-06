import React from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';

interface Props {
  onChange: (images: string[]) => void;
  images: string[];
}

const ImageList: React.FC<Props> = ({ onChange, images }) => {
  return (
    <View>
      <Button
        onPress={() => {
          launchImageLibrary(
            {
              mediaType: 'photo',
            },
            ({ uri, errorCode }) => {
              if (errorCode) {
                console.log(
                  'Could not launch image library. Error: ',
                  errorCode,
                );
              }
              if (uri) {
                onChange([...images.slice(), uri]);
              }
            },
          );
        }}>
        Add image
      </Button>
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
    </View>
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
