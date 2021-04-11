import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { savePlant } from '../db';
import { Plant } from '../db/schema';

type Props = {
  plant: Plant;
};

const WaterPlantDialog: React.FC<Props> = ({ plant }) => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const waterPlant = (lastWatered: Date) => () => {
    const { id, name, created, images } = plant;
    const plantToSave: Plant = {
      id,
      name,
      created,
      images,
      lastWatered,
    };
    savePlant(plantToSave);
    setVisible(false);
  };

  return (
    <View>
      <Button onPress={showDialog}>Water</Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Water plant</Dialog.Title>
          <Dialog.Content>
            <Paragraph>When did you last water this plant?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button
              onPress={() => {
                console.log('TODO');
              }}>
              Pick date
            </Button>
            <Button onPress={waterPlant(new Date())}>Today</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default WaterPlantDialog;
