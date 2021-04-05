// Example of GridView using FlatList in React Native
// https://aboutreact.com/example-of-gridview-using-flatlist-in-react-native/

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from 'react-native';

type Identifiable = {
  id: string;
};

type Props<T extends Identifiable> = {
  renderItem: ListRenderItem<T>;
  items: T[];
};

function GridView<T extends Identifiable>({ items, renderItem }: Props<T>) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export default GridView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
