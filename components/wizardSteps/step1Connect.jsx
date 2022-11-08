import {
	useAddress,
	useCoinbaseWallet,
	useMetamask,
	useWalletConnect,
} from '@thirdweb-dev/react';

import React from 'react';

const Step1Connect = (props) => {
	const { goToStep } = props;
	const connectWithMetamask = useMetamask();
	const connectWithCoinbaseWallet = useCoinbaseWallet();
	const connectWithWalletConnect = useWalletConnect();
	const address = useAddress();

	return (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-12">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
						Connect your wallet
					</h1>
					<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
						quaerat expedita voluptate debitis, iste officiis esse. Ut
						reprehenderit consectetur temporibus. doctor.
					</p>
				</div>
				{address ? (
					<div className="flex flex-col space-y-5 justify-center items-center">
						<span className="truncate max-w-sm">
							You are signed in as {address}
						</span>
						<button
							onClick={goToStep}
							className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
						>
							Proceed to next step
						</button>
					</div>
				) : (
					<div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
						<button
							onClick={connectWithMetamask}
							className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg "
						>
							Sign in with metamask
						</button>
						<button
							onClick={connectWithCoinbaseWallet}
							className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg "
						>
							Sign in with Coinbase Wallet
						</button>
						<button
							onClick={connectWithWalletConnect}
							className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg "
						>
							Sign in with WalletConnect
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default Step1Connect;
