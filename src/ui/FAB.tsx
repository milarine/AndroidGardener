import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { Colors } from './Colors';

interface Props {
  onPress: () => void;
  icon: string;
}

const FloatingActionButton: React.FC<Props> = ({ onPress, icon }) => {
  return <FAB style={styles.fab} onPress={onPress} icon={icon} />;
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: Colors.highlight,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default FloatingActionButton;
