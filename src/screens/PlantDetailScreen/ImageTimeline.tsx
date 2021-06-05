import React from 'react';

import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { IconButton } from 'react-native-paper';

import { CachedImageBackground } from 'components/CachedImage';
import { ChangeImageDateButton } from 'components/ChangeImageDateButton';
import { useImages } from 'db';
import { Colors } from 'theme';

interface Props {
  imageIds: string[];
  deleteImage: (imageId: string) => void;
  navigateToFullScreenImage?: (imageId: string) => void;
}

export const ImageTimeLine: React.FC<Props> = ({
  imageIds,
  deleteImage,
  navigateToFullScreenImage,
}) => {
  console.log('imageIds: ', imageIds);

  const images = useImages(imageIds);
  console.log(
    'iamges: ',
    images.map((img) => img.date),
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => `key-${index}`}
        renderItem={({ item }) => {
          return (
            <View style={styles.imageActions}>
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  if (navigateToFullScreenImage) {
                    navigateToFullScreenImage(item.id);
                  }
                }}>
                <CachedImageBackground
                  style={styles.image}
                  base64={item.uri}
                  id={item.id}>
                  {imageIds.length > 1 && (
                    <IconButton
                      icon="close-circle-outline"
                      size={30}
                      color={Colors.white}
                      onPress={() => {
                        deleteImage(item.id);
                      }}
                    />
                  )}
                </CachedImageBackground>
              </TouchableOpacity>
              <ChangeImageDateButton imageId={item.id} />
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
  imageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingEnd: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  itemContainer: {
    padding: 5,
    height: 200,
    width: '60%',
  },
});
