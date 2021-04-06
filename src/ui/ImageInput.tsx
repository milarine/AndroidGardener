import React from 'react';
import { View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';
import ImageList from './ImageList';

interface Props {
  onChange: (images: string[]) => void;
  images: string[];
}

const ImageInput: React.FC<Props> = ({ onChange, images }) => {
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
      <ImageList images={images} />
    </View>
  );
};

export default ImageInput;
