import React from 'react';

import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import { deleteGarden } from 'db';

type Props = {
  gardenId: string;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

export const DeleteGardenDialog: React.FC<Props> = ({
  gardenId,
  isVisible,
  setIsVisible,
}) => {
  const hideDialog = () => setIsVisible(false);

  const confirmDeletion = () => {
    deleteGarden(gardenId);
    hideDialog();
  };

  return (
    <View>
      <Portal>
        <Dialog visible={isVisible} onDismiss={hideDialog}>
          <Dialog.Title>Delete Garden</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to delete this garden? You will lose all the
              plants in there!
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={confirmDeletion}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
