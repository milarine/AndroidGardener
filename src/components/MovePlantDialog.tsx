import React from 'react';
import { useState } from 'react';

import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, HelperText } from 'react-native-paper';

import { Plant, getGardens, movePlant } from 'db';
import { Colors } from 'theme';

type Props = {
  plant: Plant;
  hideDialog: () => void;
};

export const MovePlantDialog: React.FC<Props> = ({ plant, hideDialog }) => {
  const [showError, setShowError] = useState<boolean>(false);
  const [selectedGarden, setSelectedGarden] = useState<string | undefined>(
    undefined,
  );
  const gardens = getGardens();

  const selectGarden = (gardenId: string) => setSelectedGarden(gardenId);

  const confirmSelection = () => {
    if (!selectedGarden) {
      setShowError(true);
    } else {
      hideDialog();
      movePlant(plant.id, selectedGarden);
    }
  };

  const currentGarden = plant?.garden?.[0];

  return (
    <Portal>
      <Dialog visible={true} onDismiss={hideDialog}>
        <Dialog.Title>Move {plant.name} to garden</Dialog.Title>
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
  );
};

const styles = StyleSheet.create({
  gardenButton: {
    borderWidth: 1,
    margin: 2,
    borderColor: Colors.darkest,
  },
});
