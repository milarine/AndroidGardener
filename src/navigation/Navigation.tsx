import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddPlantView from 'screens/AddPlantScreen/AddPlantView';
import GardensOverview from 'screens/GardensOverviewScreen/GardensOverview';
import GardenView from 'screens/GardenViewScreen/GardenView';
import ImageFullScreenView from 'screens/ImageFullScreen/ImageFullScreenView';
import PlantDetailView from 'screens/PlantDetailScreen/PlantDetailView';

// https://reactnavigation.org/docs/typescript/
export type StackParamList = {
  GardenView: { gardenId: string };
  GardensOverview: undefined;
  AddPlantView: { gardenId: string };
  PlantDetailView: { plantId: string };
  ImageFullScreenView: { imageId: string };
};

const Stack = createStackNavigator<StackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="GardenView"
          component={GardenView}
          initialParams={{ gardenId: undefined }}
          options={{ title: 'Your garden', headerShown: false }}
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
        <Stack.Screen
          name="GardensOverview"
          component={GardensOverview}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
