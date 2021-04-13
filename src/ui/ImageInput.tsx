import React from 'react';
import { StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, HelperText } from 'react-native-paper';
import { ImageDto } from '../db/schema';
import ImageList from './ImageList';

interface Props {
  onChange: (images: ImageDto[]) => void;
  images: ImageDto[];
  errors: string | string[] | undefined;
}

const ImageInput: React.FC<Props> = ({ onChange, images, errors }) => {
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
                  onChange([...images.slice(), { uri }]);
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
      <ImageList images={images} />
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
