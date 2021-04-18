import React from 'react';

import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';

interface Props {
  addImage: (uri: string) => void;
}

export const AddImageButton: React.FC<Props> = ({ addImage }) => {
  return (
    <Button
      onPress={() => {
        launchImageLibrary(
          {
            mediaType: 'photo',
          },
          ({ uri, errorCode }) => {
            if (errorCode) {
              console.log('Could not launch image library. Error: ', errorCode);
            }
            if (uri) {
              addImage(uri);
            }
          },
        );
      }}>
      Add image
    </Button>
  );
};
