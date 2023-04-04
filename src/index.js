import ReactDOM from 'react-dom';
import TestGame from './TestGame';

import { DAppProvider, DEFAULT_SUPPORTED_CHAINS} from "@usedapp/core";
import { Polygon} from 'src/servises/network/Polygon'


(async () => { 
  ReactDOM.render(
    <>
    
      <DAppProvider config={{
      readOnlyChainId: Polygon.chainId,
      readOnlyUrls: {
        [Polygon.chainId]: 'https://polygon-rpc.com/',
        
      },
      networks: [...DEFAULT_SUPPORTED_CHAINS, Polygon],
      }}>
        <TestGame />,
      </DAppProvider>
   

    
    </>,
  document.getElementById('root'),
)})();


