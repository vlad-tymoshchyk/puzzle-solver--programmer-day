import React from 'react';

export const Center: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="center">{children}</div>;
};
