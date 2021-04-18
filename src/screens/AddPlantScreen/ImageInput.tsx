import React from 'react';

import { StyleSheet, View } from 'react-native';
import { HelperText } from 'react-native-paper';

import { AddImageButton, ImageList } from 'components/index';
import { Image, uid } from 'db/index';

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
        <AddImageButton
          addImage={(uri: string) => {
            onChange([...images.slice(), { uri, date: new Date(), id: uid() }]);
          }}
        />
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
