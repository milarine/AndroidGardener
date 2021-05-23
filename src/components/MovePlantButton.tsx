import React from 'react';
import { useState } from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

import { Plant } from 'db';

import { LoadingSpinner } from './LoadingSpinner';
import { MovePlantDialog } from './MovePlantDialog';

type Props = {
  plant: Plant;
};

export const MovePlantButton: React.FC<Props> = ({ plant }) => {
  const [visible, setVisible] = useState<boolean>(false);

  if (!plant) {
    return <LoadingSpinner />;
  }

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const currentGarden = plant.garden?.[0];

  return (
    <View>
      <TouchableOpacity style={styles.gardenName} onPress={showDialog}>
        <Text>{currentGarden?.name}</Text>
        <IconButton icon="chevron-down" />
      </TouchableOpacity>
      {visible && <MovePlantDialog plant={plant} hideDialog={hideDialog} />}
    </View>
  );
};

const styles = StyleSheet.create({
  gardenName: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
