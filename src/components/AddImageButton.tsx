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
            includeBase64: true,
          },
          ({ errorCode, base64 }) => {
            if (errorCode) {
              console.log('Could not launch image library. Error: ', errorCode);
            }
            if (base64) {
              addImage(base64);
            }
          },
        );
      }}>
      Add image
    </Button>
  );
};
