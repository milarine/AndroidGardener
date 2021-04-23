import React, { useState } from 'react';

import { Button, Dialog, Portal } from 'react-native-paper';

import { TextInput } from 'components';
import { createGarden } from 'db';

type Props = {
  visible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

export const AddGardenDialog: React.FC<Props> = ({ visible, setIsVisible }) => {
  const [name, setName] = useState('');
  const hideDialog = () => setIsVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Add garden</Dialog.Title>
        <Dialog.Content>
          {/* TODO: why is the keyboard flickering when entering text? */}
          <TextInput
            label="Name"
            onChangeText={(text) => setName(text)}
            value={name}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button
            onPress={() => {
              createGarden({ name, plants: [] });
              hideDialog();
            }}>
            Create
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
