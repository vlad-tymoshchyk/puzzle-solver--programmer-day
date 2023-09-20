import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Center } from './components/Center';
import { FieldDisplayer } from './FieldDisplayer';
import { Controller } from './Controller';
import { store } from './store';

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <Center>
        <FieldDisplayer />
      </Center>
      <Center>
        <Controller />
      </Center>
    </ReduxProvider>
  );
};
