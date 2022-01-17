import "../styles/globals.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store from "../app/store";
import { GelatoProvider } from "@gelatonetwork/limit-orders-react";
import { useActiveWeb3React } from "../hooks/web3";

import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { NetworkContextName } from "../constants/misc";
import getLibrary from "../utils/getLibrary";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function Gelato({ children }: { children?: React.ReactNode }) {
  const { library, chainId, account } = useActiveWeb3React();
  return (
    <GelatoProvider
      library={library}
      chainId={chainId}
      account={account ?? undefined}

      // Optionally your can set a specific handler to block trades on a specific handler
      // Currently we offer support out of the box for "uniswap", "quickswap", "spookyswap" and "spiritswap"
      // Please reach out to us if you want to register a custom handler
      // Make sure chainId and handler are valid
      // handler={'uniswap'}

      // [ONLY IF USING COMPONENT] Optionally pass a toggle modal to be able to connect
      // to a wallet via the component button
      // toggleWalletModal={toggleWalletModal}

      // By default `useDefaultTheme`and `useDarkMode` are set to true
      // Optionally, if you can try to use and pass your own theme by setting `useDefaultTheme`={false}
      // as long as it conforms with our theme definitions (you can check our `ThemeProvider` [here](https://github.com/gelatodigital/limit-orders-lib/tree/master/packages/limit-orders-react/theme/index.tsx))
      // Optionally, if your main theme does not comply with our definitions, you can also wrap `GelatoProvider`
      // with a custom `ThemeProvider` with your own custom definitions. (check our `ThemeProvider` as an example)
      // useDefaultTheme={false}
      // useDarkMode={false}
    >
      {children}
    </GelatoProvider>
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <Gelato>
            <Component {...pageProps} />
          </Gelato>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
}
