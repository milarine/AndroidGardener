import React, { useState } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity, FlatList, StyleSheet, View } from 'react-native';
import { Headline, IconButton } from 'react-native-paper';

import { BottomActions } from 'components';
import { useGardens } from 'db';
import { StackParamList } from 'navigation';
import { Colors } from 'theme';

import { AddGardenDialog } from './AddGardenDialog';
import { DeleteGardenDialog } from './DeleteGardenDialog';

type Props = StackScreenProps<StackParamList, 'GardensOverview'>;

const GardensOverview = ({ navigation }: Props) => {
  const gardens = useGardens();
  const [isAddingGarden, setIsAddingGarden] = useState<boolean>(false);
  const [gardenToDelete, setGardenToDelete] = useState<string | undefined>(
    undefined,
  );

  return (
    <BottomActions
      leftAction={() => console.log('TODO: implement search plant')}
      leftActionIcon="magnify"
      mainAction={() => {
        setIsAddingGarden(true);
      }}
      mainActionIcon="plus"
      rightAction={() => console.log('TODO: choose what to do here')}
      rightActionIcon="spa">
      <View style={styles.container}>
        <FlatList
          style={{
            transform: [{ scaleY: -1 }],
          }}
          data={gardens.reverse()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [
                      { name: 'GardenView', params: { gardenId: item.id } },
                    ],
                  });
                }}>
                <IconButton
                  icon="fire"
                  onPress={() => {
                    console.log('TODO: deleting garden', item.id);
                    setGardenToDelete(item.id);
                  }}
                />
                <Headline>{item.name}</Headline>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
        <AddGardenDialog
          setIsVisible={setIsAddingGarden}
          visible={isAddingGarden}
        />
        {gardenToDelete && (
          <DeleteGardenDialog
            gardenId={gardenToDelete}
            isVisible={true}
            setIsVisible={(isVisible) => {
              if (!isVisible) {
                setGardenToDelete(undefined);
              }
            }}
          />
        )}
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