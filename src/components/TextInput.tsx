import React from 'react';

import type {
  TextInputFocusEventData,
  NativeSyntheticEvent,
  TextStyle,
} from 'react-native';
import type { StyleProp } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput as Input } from 'react-native-paper';

import { Colors } from 'theme';

interface Props {
  label: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value: string;
  style?: StyleProp<TextStyle>;
}

export const TextInput: React.FC<Props> = ({
  label,
  placeholder,
  onChangeText,
  onBlur,
  value,
  style,
}) => {
  return (
    <Input
      style={[styles.input, style]}
      label={label}
      placeholder={placeholder ?? label}
      mode="outlined"
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.white,
  },
});
