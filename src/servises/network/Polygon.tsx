import { Chain } from '@usedapp/core'
import { getAddressLink, getTransactionLink } from './link'

const polygonExplorerUrl = 'https://polygonscan.com'

export const Polygon: Chain = {
    chainId: 137,
    chainName: 'Polygon',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
    rpcUrl: 'https://polygon-rpc.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrl: polygonExplorerUrl,
    getExplorerAddressLink: getAddressLink(polygonExplorerUrl),
    getExplorerTransactionLink: getTransactionLink(polygonExplorerUrl),
  }