import React from 'react';

import {
  StyleProp,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { Headline } from 'react-native-paper';

// import { CachedImage } from 'components/CachedImage';
import { Plant } from 'db';
import { Colors } from 'theme';

interface Props {
  plants: SelectablePlant[];
  onPressPlant: (plantId: SelectablePlant) => void;
  pressedPlantStyle?: StyleProp<ViewStyle>;
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface SelectablePlant
  extends Optional<Plant, 'lastWatered' | 'created'> {
  selected: boolean;
}

const SelectablePlantList = ({
  plants,
  onPressPlant,
  pressedPlantStyle,
}: Props) => {
  const renderItem = ({ item }: { item: SelectablePlant }) => {
    const containerStyles = item.selected
      ? [styles.plantContainer, pressedPlantStyle]
      : [styles.plantContainer];

    // const image = item.images[0];

    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={() => {
          onPressPlant(item);
        }}
        activeOpacity={1}>
        {/* TODO: improve performance, this makes rendering extremely slow: */}
        {/* {item.images && item.images.length > 0 && (
          <View style={[styles.item, styles.imageContainer]}>
            <CachedImage
              style={styles.image}
              base64={image.uri}
              id={image.id}
            />
          </View>
        )} */}
        <View style={[styles.item, styles.infoBox]}>
          <Headline>{item.name}</Headline>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={plants}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  plantContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    elevation: 10,
  },
  item: {
    minHeight: 100,
  },
  imageContainer: {
    width: '40%',
  },
  infoBox: {
    padding: 5,
    width: '60%',
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: '100%',
    width: '100%',
  },
});

export default SelectablePlantList;
