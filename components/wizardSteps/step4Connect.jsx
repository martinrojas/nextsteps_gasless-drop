import React, { useState } from 'react';

import Image from 'next/image';
import clsx from 'clsx';
import { useNetwork } from '@thirdweb-dev/react';

const Step4Connect = (props) => {
	const { goToStep, showReceipt } = props;
	const [networkData, switchNetwork] = useNetwork();
	// console.log('networkData', networkData);
	const {
		data: { chain: activeChain, chains },
		error,
		loading: isLoading,
	} = networkData;
	const blockExplorers = activeChain?.blockExplorers?.[0]?.url;

	return (
		<section className="text-gray-600">
			<div className="container px-5 py-24 mx-auto space-y-10">
				<div className="flex flex-col space-y-5">
					<div className="h-1 bg-gray-200 rounded overflow-hidden">
						<div className="w-24 h-full bg-red-500"></div>
					</div>
					<div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
						<h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
							Your NFT is now in your wallet
						</h1>
						<p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
							It is currently in your wallet, but it needs to be verified in
							order for the Transaction to complete
						</p>
					</div>
				</div>
				<div className="flex items-center w-full mx-auto border-b pb-10  border-gray-200 sm:flex-row flex-col">
					<div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 flex-shrink-0">
						<svg
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							className="sm:w-16 sm:h-16 w-10 h-10"
							viewBox="0 0 24 24"
						>
							<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
						</svg>
					</div>
					<div className="flex-grow sm:text-left text-center">
						<h2 className="text-gray-900 text-lg title-font font-medium mb-2">
							Transaction Details
						</h2>
						<p className="leading-relaxed text-base">to: {showReceipt.to}</p>
						<p className="leading-relaxed text-base">
							from: {showReceipt.from}
						</p>
						<p className="leading-relaxed text-base">
							transactionHash: {showReceipt.transactionHash}
						</p>
						<p className="leading-relaxed text-base">
							blockNumber: {showReceipt.blockNumber}
						</p>
						<p className="leading-relaxed text-base">
							confirmations: {showReceipt.confirmations}
						</p>
						<a
							href={`${blockExplorers}/tx/${showReceipt.transactionHash}`}
							target="_blank"
							className="mt-3 text-red-500 inline-flex items-center"
							rel="noreferrer"
						>
							Learn More
							<svg
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="w-4 h-4 ml-2"
								viewBox="0 0 24 24"
							>
								<path d="M5 12h14M12 5l7 7-7 7"></path>
							</svg>
						</a>
					</div>
				</div>
				<div>
					<button
						onClick={goToStep}
						className="flex-shrink-0 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg mt-10 sm:mt-0"
					>
						Proceed to next step
					</button>
				</div>
			</div>
		</section>
	);
};

export default Step4Connect;
