import React from 'react';
import ReactDOM from 'react-dom/client';
import TestGame from './TestGame';
import { DAppProvider } from "@usedapp/core";
import { ChainId } from '@usedapp/core';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <DAppProvider config={{
      supportedChains: [ChainId.MATIC]}}>
        <TestGame />
      </DAppProvider>
  </React.StrictMode>
);


