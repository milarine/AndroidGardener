import React from 'react';

import type {
  TextInputFocusEventData,
  NativeSyntheticEvent,
  TextStyle,
} from 'react-native';
import type { StyleProp } from 'react-native';
import { TextInput as Input } from 'react-native-paper';

import { Colors } from 'theme';

interface Props {
  label: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value: string;
  style?: StyleProp<TextStyle>;
}

export const TextInput: React.FC<Props> = ({
  label,
  onChangeText,
  onBlur,
  value,
  style,
}) => {
  return (
    <Input
      style={[style, { backgroundColor: Colors.darkest }]}
      label={label}
      mode="outlined"
      theme={{ colors: { primary: Colors.dark, text: Colors.lightest } }}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
    />
  );
};
