import ReactDOM from 'react-dom';
import TestGame from './TestGame';

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { polygon, mainnet} from 'wagmi/chains'
import { DAppProvider } from "@usedapp/core"

const chains = [polygon, mainnet]
const projectId = '1030895f8d361665a4de6d31b1ab0bf3'

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

(async () => { 
  ReactDOM.render(
    <>
    <WagmiConfig client={wagmiClient}>
      <DAppProvider config={{}}>
        <TestGame />,
      </DAppProvider>
    </WagmiConfig>,

    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />,
    </>,
  document.getElementById('root'),
)})();


