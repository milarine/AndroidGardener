import React, { useState } from 'react';

import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { Button } from 'react-native-paper';

import { LoadingSpinner } from 'components/LoadingSpinner';
import { updateImageDate, getImage } from 'db';
import { formatDate } from 'utils';

interface Props {
  imageId: string;
}

export const ChangeImageDateButton: React.FC<Props> = ({ imageId }) => {
  const image = getImage(imageId);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  if (!image) {
    return <LoadingSpinner />;
  }

  const showDatePicker = () => setIsDatePickerVisible(true);
  const hideDatePicker = () => setIsDatePickerVisible(false);

  const onChange = (_: Event, selectedDate: Date | undefined) => {
    if (selectedDate) {
      updateImageDate(imageId, selectedDate);
      setIsDatePickerVisible(Platform.OS === 'ios');
    } else {
      hideDatePicker();
    }
  };

  return (
    <>
      <Button onPress={showDatePicker}>{formatDate(image.date)}</Button>
      {isDatePickerVisible && (
        <DateTimePicker
          value={image.date}
          is24Hour={true}
          display="default"
          maximumDate={new Date()}
          onChange={onChange}
        />
      )}
    </>
  );
};
