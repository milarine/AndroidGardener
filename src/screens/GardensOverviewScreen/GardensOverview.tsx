import React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, StyleSheet, View } from 'react-native';
import { Headline, IconButton } from 'react-native-paper';

import { BottomActions } from 'components';
import { createGarden, useGardens } from 'db';
import { StackParamList } from 'navigation';
import { Colors } from 'theme';

type Props = StackScreenProps<StackParamList, 'GardensOverview'>;

const GardensOverview = ({ navigation }: Props) => {
  const gardens = useGardens();

  return (
    <BottomActions
      leftAction={() => console.log('TODO: implement search plant')}
      leftActionIcon="magnify"
      mainAction={() => console.log('TODO: implement add garden')}
      mainActionIcon="plus"
      rightAction={() => {
        console.log('TODO: let user create garden');

        createGarden({
          name: 'test',
          plants: [],
        });
      }}
      rightActionIcon="spa">
      <View style={styles.container}>
        <FlatList
          style={{
            transform: [{ scaleY: -1 }],
          }}
          data={gardens.reverse()}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <IconButton
                  icon="fire"
                  onPress={() => console.log('TODO: deleting garden', item.id)}
                />
                <Headline>{item.name}</Headline>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </BottomActions>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: Colors.white,
    transform: [{ scaleY: -1 }],
    borderRadius: 10,
    height: 50,
    margin: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default GardensOverview;
