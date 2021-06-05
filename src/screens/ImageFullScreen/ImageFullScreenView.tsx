import React, { useEffect } from 'react';

import type { StackScreenProps } from '@react-navigation/stack';
import { View, StyleSheet, Dimensions } from 'react-native';

import { CachedImage } from 'components/CachedImage';
import { ChangeImageDateButton } from 'components/ChangeImageDateButton';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { useImage } from 'db';
import { StackParamList } from 'navigation';

type Props = StackScreenProps<StackParamList, 'ImageFullScreenView'>;

const ImageFullScreenView: React.FC<Props> = ({
  navigation,
  route: {
    params: { imageId },
  },
}) => {
  const image = useImage(imageId);

  useEffect(() => {
    navigation.setOptions({
      title: image ? image.plant?.[0].name : '',
    });
  }, [image, navigation]);

  if (!image) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.changeImageButton}>
        <ChangeImageDateButton imageId={imageId} />
      </View>
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
    height: '90%',
  },
  changeImageButton: {
    justifyContent: 'center',
    flex: 1,
  },
});

export default ImageFullScreenView;
