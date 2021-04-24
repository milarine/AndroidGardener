import React from 'react';

import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
