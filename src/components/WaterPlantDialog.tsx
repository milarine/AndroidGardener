import * as React from 'react';
import { useState } from 'react';

import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { Platform, View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import { waterPlant } from 'db/index';

type Props = {
  plantId: string;
};

export const WaterPlantDialog: React.FC<Props> = ({ plantId }) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const onChange = (_: Event, selectedDate: Date | undefined) => {
    if (selectedDate) {
      waterPlant(plantId, selectedDate);
      setIsDatePickerVisible(Platform.OS === 'ios');
      hideDialog();
    } else {
      hideDatePicker();
    }
  };

  const showDialog = () => setIsDialogVisible(true);
  const hideDialog = () => setIsDialogVisible(false);
  const showDatePicker = () => setIsDatePickerVisible(true);
  const hideDatePicker = () => setIsDatePickerVisible(false);

  return (
    <View>
      <Button onPress={showDialog}>Water</Button>
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Water plant</Dialog.Title>
          <Dialog.Content>
            <Paragraph>When did you last water this plant?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={showDatePicker}>Pick date</Button>
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
      {isDatePickerVisible && (
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
