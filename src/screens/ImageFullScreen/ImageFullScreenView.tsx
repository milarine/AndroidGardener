import React from 'react';

import type { StackScreenProps } from '@react-navigation/stack';
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native';

import { useImage } from 'db';
import { StackParamList } from 'navigation';

type Props = StackScreenProps<StackParamList, 'ImageFullScreenView'>;

const ImageFullScreenView: React.FC<Props> = ({
  route: {
    params: { imageId },
  },
}) => {
  const image = useImage(imageId);

  if (!image) {
    return <Text>error</Text>;
  }

  return (
    <View style={styles.fullScreenContainer}>
      <Image
        style={[
          { width: Dimensions.get('window').width },
          styles.fullScreenImage,
        ]}
        source={{ uri: image.uri }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    height: '100%',
  },
});

export default ImageFullScreenView;
