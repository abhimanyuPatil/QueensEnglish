/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Home } from 'screens/Home';
import { ThemeProvider } from './src/context/ThemeContext';
const App = () => {
  return (
    <PaperProvider>
    <ThemeProvider>
      <SafeAreaView style={{flex: 1}}>
        <Home />
      </SafeAreaView>
    </ThemeProvider></PaperProvider>
  );
};
export default App;
