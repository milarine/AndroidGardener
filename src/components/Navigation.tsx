import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PlantOverview from '../screens/PlantOverviewScreen/PlantOverview';
import AddPlantView from '../screens/AddPlantScreen/AddPlantView';
import PlantDetailView from '../screens/PlantDetailScreen/PlantDetailView';
import ImageFullScreenView from '../screens/ImageFullScreen/ImageFullScreenView';

// https://reactnavigation.org/docs/typescript/
export type StackParamList = {
  PlantOverview: undefined;
  AddPlantView: undefined;
  PlantDetailView: { plantId: string };
  ImageFullScreenView: { imageId: string };
};

const Stack = createStackNavigator<StackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PlantOverview"
          component={PlantOverview}
          options={{ title: 'Your garden' }}
        />
        <Stack.Screen
          name="AddPlantView"
          component={AddPlantView}
          options={{ title: 'Add a plant' }}
        />
        {/* TODO: pass custom Header component to header prop of options */}
        <Stack.Screen name="PlantDetailView" component={PlantDetailView} />
        <Stack.Screen
          name="ImageFullScreenView"
          component={ImageFullScreenView}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
