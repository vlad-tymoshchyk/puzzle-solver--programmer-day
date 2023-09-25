import React from 'react';
import { useSelector } from 'react-redux';
import { State } from './types';
import { Field } from './components';
import './utils';

export const FieldDisplayer = () => {
  const field = useSelector(({ field }: State) => field);

  return <Field field={field} />;
};
