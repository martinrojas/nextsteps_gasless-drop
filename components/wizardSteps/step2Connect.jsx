import {
	useAddress,
	useNetwork,
	useNetworkMismatch,
} from '@thirdweb-dev/react';

import { BiNetworkChart } from 'react-icons/bi';
import React from 'react';
import { RiExchangeFundsLine } from 'react-icons/ri';
import clsx from 'clsx';

const Step2Connect = (props) => {
	const { goToStep } = props;
	const isMismatched = useNetworkMismatch();
	const [networkData, switchNetwork] = useNetwork();
	console.log('networkData', networkData);
	console.log('isMismatched', isMismatched);
	const {
		data: { chain: activeChain, chains },
		error,
		loading: isLoading,
	} = networkData;
	// const activeChain = network?.[0]?;

	// const connectWithMetamask = useMetamask();
	const address = useAddress();

	return (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-12 space-y-5">
					<h1 className="sm:text-3xl text-2xl font-medium title-font  text-gray-900">
						Verify Network:
					</h1>
					{activeChain && (
						<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
							Currently connected to the{' '}
							<span className="text-2xl text-red-500">{activeChain?.name}</span>
							{` (${activeChain?.nativeCurrency?.symbol})`}
						</p>
					)}

					{isMismatched ? (
						<div className="flex w-full flex-col mx-auto space-y-4 items-center justify-center">
							{isLoading && (
								<span>
									<svg
										className="animate-spin -ml-1 mr-3 h-6 w-6 text-red-500 inline-block"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>{' '}
									switching network
								</span>
							)}
							<button
								onClick={() => switchNetwork(80001)}
								disabled={isLoading}
								className={clsx(
									'text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg ',
									isLoading && 'opacity-50 cursor-not-allowed'
								)}
							>
								{' '}
								<RiExchangeFundsLine className="inline-block mr-2" />
								Change to Mumbai Test Network
							</button>
						</div>
					) : (
						<div className="flex flex-col space-y-5 justify-center items-center">
							<button
								onClick={goToStep}
								className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
							>
								Proceed to next step
							</button>
						</div>
					)}
				</div>
				<div className="container px-5 py-24 mx-auto space-y-5">
					<div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
						<h3 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
							Other Available networks
						</h3>
						<p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
							This section is to see what other information is available for
							different wallets
						</p>
					</div>

					<div className="flex flex-wrap -m-4">
						{chains.map((x) => (
							<div key={x.id} className="xl:w-1/4 md:w-1/3 p-4">
								<div className="border border-gray-200 p-6 rounded-lg">
									<div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
										<BiNetworkChart className="w-6 h-6" />
									</div>
									<h2 className="text-lg text-gray-900 font-medium title-font mb-2">
										{x.name}
									</h2>
									<p className="leading-relaxed text-base">
										{`Currency: ${x?.nativeCurrency?.name} (${x?.nativeCurrency?.symbol})`}
									</p>
								</div>
							</div>
						))}
					</div>
					<div>{error && error.message}</div>
				</div>
			</div>
		</section>
	);
};

export default Step2Connect;
