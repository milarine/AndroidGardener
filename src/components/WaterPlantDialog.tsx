import * as React from 'react';
import { Platform, View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { waterPlant } from '../db';
import { useState } from 'react';

type Props = {
  plantId: string;
};

const WaterPlantDialog: React.FC<Props> = ({ plantId }) => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  const onChange = (_: Event, selectedDate: Date | undefined) => {
    if (selectedDate) {
      waterPlant(plantId, selectedDate);
    }
    setShow(Platform.OS === 'ios');
    hideDialog();
  };

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

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
                setShow(true);
              }}>
              Pick date
            </Button>
            <Button
              onPress={() => {
                waterPlant(plantId);
                hideDialog();
              }}>
              Today
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {show && (
        <DateTimePicker
          value={new Date()}
          is24Hour={true}
          display="default"
          maximumDate={new Date()}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default WaterPlantDialog;
