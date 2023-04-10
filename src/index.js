import ReactDOM from "react-dom";
import TestGame from "./TestGame";
import { DAppProvider, DEFAULT_SUPPORTED_CHAINS } from "@usedapp/core";
import { Polygon } from "src/servises/network/Polygon";
import { ChakraProvider } from "@chakra-ui/provider";

(async () => {
  ReactDOM.render(
    <DAppProvider
      config={{
        readOnlyChainId: Polygon.chainId,
        readOnlyUrls: {
          [Polygon.chainId]: "https://polygon-rpc.com/",
        },
        networks: [...DEFAULT_SUPPORTED_CHAINS, Polygon],
      }}
    >
      <ChakraProvider>
      <TestGame />
      </ChakraProvider>
    </DAppProvider>,
    document.getElementById("root")
  );
})();
