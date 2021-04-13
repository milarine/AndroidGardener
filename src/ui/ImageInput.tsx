import React from 'react';
import { StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';
import { ImageDto } from '../db/schema';
import ErrorText from './ErrorText';
import ImageList from './ImageList';

interface Props {
  onChange: (images: ImageDto[]) => void;
  images: ImageDto[];
  errors: string | string[] | undefined;
}

const ImageInput: React.FC<Props> = ({ onChange, images, errors }) => {
  console.log('image input received: ', images);
  return (
    <View style={styles.container}>
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
                onChange([...images.slice(), { uri }]);
              }
            },
          );
        }}>
        Add image
      </Button>
      {errors && <ErrorText msg={errors} />}
      <ImageList images={images} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ImageInput;
