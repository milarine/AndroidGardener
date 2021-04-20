/* eslint-disable import/order */
import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';

import { AppState, AppStateStatus } from 'react-native';
import {
  DefaultTheme,
  Provider as PaperProvider,
  Text,
} from 'react-native-paper';

import { closeDb, openDb } from 'db';
import { Colors } from 'theme';
import { Navigation } from 'navigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // - primary color for your app, usually your brand color.
    primary: Colors.darkest,
    // - secondary color for your app which complements the primary color.
    accent: Colors.lightest,
    // - background color for pages, such as lists.
    // background: Colors.light,
    // - background color for elements containing content, such as cards.
    surface: Colors.light,
    // - text color for content.
    // text: '',
    // - color for disabled elements.
    // disabled: '',
    // - color for placeholder text, such as input placeholder.
    placeholder: Colors.dark,
    // - color for backdrops of various components such as modals.
    // backdrop: '',
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
