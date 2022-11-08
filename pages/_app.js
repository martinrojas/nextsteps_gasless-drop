import '../styles/globals.css';

import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

/** Configure LogRocket */
if (
	typeof window !== 'undefined' &&
	!!process?.env?.NEXT_PUBLIC_LOGROCKET_APP_ID
) {
	console.log('LogRocket: Initializing...');
	LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_APP_ID);
	setupLogRocketReact(LogRocket);
}

function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider
			sdkOptions={{
				gasless: {
					openzeppelin: {
						relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
					},
				},
			}}
			desiredChainId={ChainId.Mumbai}
		>
			<Component {...pageProps} />
		</ThirdwebProvider>
	);
}

export default MyApp;
