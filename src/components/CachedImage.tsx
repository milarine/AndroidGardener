import React, { useEffect, useRef, useState } from 'react';

import {
  Image,
  ImageBackground,
  ImageBackgroundProps,
  ImageProps,
} from 'react-native';
import RNFS from 'react-native-fs';

const useSaveImage = (base64: string, id: string): string | undefined => {
  const savingImageRef = useRef(false);
  const [imageSaved, setImageSaved] = useState(false);

  const uri = `${RNFS.CachesDirectoryPath}/${id}.jpg`;

  useEffect(() => {
    RNFS.exists(uri)
      .then((exists) => {
        if (exists) {
          setImageSaved(true);
        } else {
          if (!savingImageRef.current) {
            savingImageRef.current = true;
            RNFS.writeFile(uri, base64, 'base64')
              .then(() => {
                setImageSaved(true);
              })
              .catch((err) => console.log('error writing file: ', err));
          }
        }
      })
      .catch((err) => console.log('error reading file: ', err));
  }, [base64, id, uri]);

  return imageSaved ? `file://${uri}` : undefined;
};

interface Props {
  base64: string;
  id: string;
}

export const CachedImage: React.FC<Props & Omit<ImageProps, 'source'>> = ({
  base64,
  id,
  ...props
}) => {
  const uri = useSaveImage(base64, id);

  return <Image {...props} source={{ uri }} />;
};

export const CachedImageBackground: React.FC<
  Props & Omit<ImageBackgroundProps, 'source'>
> = ({ base64, id, children, ...props }) => {
  const uri = useSaveImage(base64, id);

  return (
    <ImageBackground {...props} source={{ uri }}>
      {children}
    </ImageBackground>
  );
};
