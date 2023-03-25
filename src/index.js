import React from 'react';
import ReactDOM from 'react-dom/client';
import TestGame from './TestGame';
import { DAppProvider } from "@usedapp/core";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <DAppProvider config={{
      networks: [137]}}>
        <TestGame />
      </DAppProvider>
  </React.StrictMode>
);


