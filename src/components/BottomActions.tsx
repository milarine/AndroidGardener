import React from 'react';

import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import { Colors } from 'theme';

type Props = {
  children: Element;
  mainActionIcon: string;
  mainAction: () => void;
  leftActionIcon: string;
  leftAction: () => void;
  rightActionIcon: string;
  rightAction: () => void;
};

// https://medium.com/@prolongservices.com/inset-fab-in-bottomnavigation-react-native-ef239810419
export const BottomActions: React.FC<Props> = ({
  children,
  mainActionIcon,
  mainAction,
  leftActionIcon,
  leftAction,
  rightActionIcon,
  rightAction,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <View style={[styles.bottomContainer]}>
        <View style={styles.mainActionContainer}>
          <IconButton
            icon={mainActionIcon}
            color={Colors.lightest}
            style={[styles.mainAction, { backgroundColor: Colors.light }]}
            size={40}
            onPress={mainAction}
          />
        </View>
        <View
          style={[
            styles.otheractionsContainer,
            { backgroundColor: Colors.light },
          ]}>
          <IconButton
            icon={leftActionIcon}
            color={Colors.dark}
            onPress={leftAction}
          />
          <IconButton
            icon={rightActionIcon}
            color={Colors.dark}
            onPress={rightAction}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'column',
  },
  mainActionContainer: {
    position: 'absolute',
    alignSelf: 'center',
    elevation: 20,
    backgroundColor: 'transparent',
    width: 70,
    height: 70,
    borderRadius: 35,
    bottom: 25,
    zIndex: 10,
  },
  mainAction: {
    alignSelf: 'center',
  },
  otheractionsContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});
