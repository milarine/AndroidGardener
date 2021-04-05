import React, { useState, useEffect, useRef } from 'react';
import { Text, AppState, AppStateStatus } from 'react-native';

import { closeDb, openDb } from './src/db';
import PlantOverview from './src/components/PlantOverview';

const App = () => {
  const appState = useRef(AppState.currentState);
  const [shouldShowApp, setShouldShowApp] = useState(false);

  useEffect(() => {
    console.log('App mounting');
    const _connectToDb = async () => {
      console.log('connecting to db...');
      const canConnectToDb = await openDb();
      if (canConnectToDb) {
        console.log('connected!');
        setShouldShowApp(true);
      }
    };
    const _handleAppStateChange = (nextAppState: AppStateStatus) => {
      console.log('App state changed: ', nextAppState);

      if (nextAppState.match(/inactive|background/)) {
        console.log('App will go to background -> disconnecting db');
        closeDb();
        setShouldShowApp(false);
      } else if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground -> reconnecting to db');
        _connectToDb();
      }

      appState.current = nextAppState;
    };

    AppState.addEventListener('change', _handleAppStateChange);
    _connectToDb();

    return () => {
      console.log('App unmounting');
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  console.log('app ready: ', shouldShowApp);

  return shouldShowApp ? <PlantOverview /> : <Text>Loading</Text>;
};

export default App;
