import React, { useEffect, useRef, useState } from 'react';

import { Image, ImageBackground } from 'react-native';
import RNFS from 'react-native-fs';

import { LoadingSpinner } from './LoadingSpinner';

// TODO: cleanup, add props etc.
const useSaveImage = (base64: string, id: string) => {
  const savingImageRef = useRef(false);
  const [imageSaved, setImageSaved] = useState(false);

  const uri = `${RNFS.CachesDirectoryPath}/${id}.jpg`;
  console.log('image uri: ', uri);

  useEffect(() => {
    RNFS.exists(uri)
      .then((exists) => {
        if (exists) {
          console.log('found file: ', uri);
          setImageSaved(true);
        } else {
          console.log(
            'already trying to save file: ',
            id,
            savingImageRef.current,
          );
          if (!savingImageRef.current) {
            savingImageRef.current = true;
            console.log('trying to create file: ', typeof base64);
            RNFS.writeFile(uri, base64, 'base64')

              .then(() => {
                console.log('created file: ', uri);

                setImageSaved(true);
              })
              .catch((err) => console.log('error writing file: ', err));
          }
        }
      })
      .catch((err) => console.log('error reading file: ', err));
  }, [base64, id, uri]);

  return { imageSaved, setImageSaved, uri };
};

export const CachedImage = ({ base64, id, ...props }) => {
  const { imageSaved, uri } = useSaveImage(base64, id);
  console.log('image saved: ', uri, imageSaved);

  if (!imageSaved) {
    return <LoadingSpinner />;
  }

  return <Image source={{ uri: `file://${uri}` }} {...props} />;
};

export const CachedImageBackground = ({ base64, id, children, ...props }) => {
  const { imageSaved, uri } = useSaveImage(base64, id);

  if (!imageSaved) {
    return <LoadingSpinner />;
  }

  return (
    <ImageBackground source={{ uri: `file://${uri}` }} {...props}>
      {children}
    </ImageBackground>
  );
};
