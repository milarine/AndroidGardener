import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { deletePlant } from '../db';

type Props = {
  plantId: string;
  goBack: () => void;
};

const DeletePlantDialog: React.FC<Props> = ({ plantId, goBack }) => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const confirmDeletion = () => {
    deletePlant(plantId);
    setVisible(false);
    goBack();
  };

  return (
    <View>
      <Button onPress={showDialog}>Delete</Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Delete Plant</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to remove this plant from your garden?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={confirmDeletion}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DeletePlantDialog;
