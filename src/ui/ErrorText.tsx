import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  msg: string | string[];
}

const ErrorText: React.FC<Props> = ({ msg }) =>
  typeof msg === 'string' ? (
    <Text style={styles.error}>{msg}</Text>
  ) : (
    <>
      {msg.map((text) => (
        <Text style={styles.error}>{text}</Text>
      ))}
    </>
  );

const styles = StyleSheet.create({
  error: { fontSize: 12, color: '#bf0a0c' },
});

export default ErrorText;
