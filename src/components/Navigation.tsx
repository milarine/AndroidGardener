import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PlantOverview from './PlantOverview';
import AddPlantView from './AddPlantView';

// https://reactnavigation.org/docs/typescript/
export type StackParamList = {
  PlantOverview: undefined;
  AddPlantView: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PlantOverview" component={PlantOverview} />
        <Stack.Screen name="AddPlantView" component={AddPlantView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
