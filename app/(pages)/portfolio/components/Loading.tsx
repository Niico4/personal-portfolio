import { Spinner } from '@nextui-org/react';
import React from 'react';

const Loading = () => {
  return (
    <Spinner
      label="Cargando Proyectos..."
      color="warning"
      labelColor="warning"
      size="lg"
      className="mt-52 mx-auto"
    />
  );
};

export default Loading;
