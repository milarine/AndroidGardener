import React from 'react';

import type { StackScreenProps } from '@react-navigation/stack';
import { View, StyleSheet, Dimensions } from 'react-native';

import { CachedImage } from 'components/CachedImage';
import { LoadingSpinner } from 'components/LoadingSpinner';
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
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.fullScreenContainer}>
      <CachedImage
        base64={image.uri}
        id={image.id}
        style={[
          { width: Dimensions.get('window').width },
          styles.fullScreenImage,
        ]}
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
