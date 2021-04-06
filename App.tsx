import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import {
  DefaultTheme,
  Provider as PaperProvider,
  Text,
} from 'react-native-paper';
import { AppState, AppStateStatus } from 'react-native';

import { closeDb, openDb } from './src/db';
import Navigation from './src/components/Navigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

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

      if (nextAppState.match(/inactive/)) {
        console.log('App will become inactive -> disconnecting db');
        closeDb();
        setShouldShowApp(false);
      } else if (
        appState.current.match(/inactive/) &&
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

  return (
    <PaperProvider theme={theme}>
      {shouldShowApp ? <Navigation /> : <Text>Loading</Text>}
    </PaperProvider>
  );
};

export default App;
