import React from 'react';
import { StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, HelperText } from 'react-native-paper';
import { uid } from '../db';
import { Image } from '../db/schema';
import ImageList from './ImageList';

interface Props {
  onChange: (images: Image[]) => void;
  images: Image[];
  errors: string | string[] | undefined;
}

const ImageInput: React.FC<Props> = ({ onChange, images, errors }) => {
  const deleteImage = (image: Image) => {
    onChange(images.filter((img) => img.id !== image.id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
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
                  onChange([
                    ...images.slice(),
                    { uri, date: new Date(), id: uid() },
                  ]);
                }
              },
            );
          }}>
          Add image
        </Button>
      </View>
      <HelperText type="error" visible={errors !== undefined}>
        {errors}
      </HelperText>
      <ImageList images={images} deleteImage={deleteImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ImageInput;
