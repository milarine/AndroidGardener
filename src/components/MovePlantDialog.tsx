import React from 'react';
import { useState } from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  HelperText,
  Text,
  IconButton,
} from 'react-native-paper';

import { useGardens, usePlant } from 'db';
import { movePlant } from 'db/db';
import { Colors } from 'theme';

type Props = {
  plantId: string;
};

export const MovePlantDialog: React.FC<Props> = ({ plantId }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [selectedGarden, setSelectedGarden] = useState<string | undefined>(
    undefined,
  );
  const plant = usePlant(plantId);
  const gardens = useGardens();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const selectGarden = (gardenId: string) => setSelectedGarden(gardenId);

  const confirmSelection = () => {
    if (!selectedGarden) {
      setShowError(true);
    } else {
      movePlant(plantId, selectedGarden);
      setVisible(false);
    }
  };

  const currentGarden = plant?.garden?.[0];

  return (
    <View>
      <TouchableOpacity style={styles.gardenName} onPress={showDialog}>
        <Text>{currentGarden?.name}</Text>
        <IconButton icon="chevron-down" />
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Move {plant?.name} to garden</Dialog.Title>
          <Dialog.Content>
            {gardens
              .filter((g) => g.id !== currentGarden?.id)
              .map((garden) => {
                return (
                  <Button
                    key={garden.id}
                    style={[
                      styles.gardenButton,
                      {
                        backgroundColor:
                          selectedGarden === garden.id
                            ? Colors.lightest
                            : undefined,
                      },
                    ]}
                    onPress={() => selectGarden(garden.id)}>
                    {garden.name}
                  </Button>
                );
              })}
            <HelperText type="error" visible={showError}>
              You have to choose a garden.
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={confirmSelection}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  gardenName: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gardenButton: {
    borderWidth: 1,
    margin: 2,
    borderColor: Colors.darkest,
  },
});
