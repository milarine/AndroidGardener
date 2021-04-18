import React from 'react';

import { StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

interface Props {
  onPress: () => void;
  icon: string;
}

export const FloatingActionButton: React.FC<Props> = ({ onPress, icon }) => {
  const { colors } = useTheme();
  return (
    <FAB
      style={[styles.fab, { backgroundColor: colors.accent }]}
      onPress={onPress}
      icon={icon}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
