import React from 'react';
import { useSelector } from 'react-redux';
import { State } from './store';
import { Field } from './components';
import './utils';

export const FieldDisplayer = () => {
  const { field, goodCombinations } = useSelector((state: State) => state);

  return (
    <div>
      <Field field={field} />
      <hr />
      <div className="row">
        {goodCombinations.map((field) => {
          return <Field scale={0.4} field={field} />;
        })}
      </div>
    </div>
  );
};
