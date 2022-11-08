import React, { useState } from 'react';
import {
	ThirdwebNftMedia,
	useAddress,
	useEditionDrop,
	useEditions,
} from '@thirdweb-dev/react';

import clsx from 'clsx';

const Step3Connect = (props) => {
	const { goToStep, saveReceipt } = props;

	const address = useAddress();
	const editionDropContract = useEditionDrop(
		process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
	);
	const { data: nfts } = useEditions(editionDropContract);
	const [claimed, setClaimed] = useState(false);
	const [claiming, setClaiming] = useState(false);
	const quantity = 1;

	// console.log('editionDropContract', editionDropContract.getOwned(address));
	// console.log('nfts', nfts);

	const claimNFT = async (tokenId) => {
		try {
			setClaiming(true);
			const result = await editionDropContract?.claimTo(
				address,
				tokenId,
				quantity
			);
			console.log('🎉 NFT claimed successfully!', result?.receipt);
			saveReceipt(result?.receipt);
			setClaiming(false);
			setClaimed(true);
		} catch (err) {
			console.log('💩 Error claiming NFT: ', err);
		}
	};

	return (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col space-y-5">
					{claiming && (
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
							NFT is being claimed...
						</span>
					)}
					{claimed && (
						<div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
							<h2 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
								🎉 NFT claimed successfully!
							</h2>
							<button
								onClick={goToStep}
								className="flex-shrink-0 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg mt-10 sm:mt-0"
							>
								Proceed to next step
							</button>
						</div>
					)}
					<div className="h-1 bg-gray-200 rounded overflow-hidden">
						<div className="w-24 h-full bg-red-500"></div>
					</div>
					<div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
						<h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
							Ready to claim your NFT?
						</h1>
						<p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
							Select one of the NFTs below to claim it for free!
						</p>
					</div>
				</div>
				<div className="flex flex-wrap -m-4">
					{!nfts && (
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
							NFTs are loading...
						</span>
					)}
					{nfts?.map((nft, idx) => (
						<div key={idx} className="lg:w-1/4 md:w-1/2 p-4 w-full">
							<a className="block relative rounded-lg drop-shadow-lg overflow-hidden">
								<ThirdwebNftMedia metadata={nft.metadata} />
							</a>
							<div className="mt-4">
								<h3 className="text-gray-500 text-md tracking-widest title-font mb-1">
									{`${nft.metadata.name} - ${nft.metadata.id.toString()}`}
								</h3>
								<h2 className="text-gray-900 title-font text-lg font-medium">
									{nft.metadata.description}
								</h2>
								<ul className="mt-1">
									{nft.metadata.attributes.map((attr, idx2) => (
										<li
											className="text-gray-900 title-font text-sm font-medium capitalize"
											key={idx2}
										>{`${attr?.trait_type}: ${attr?.value}`}</li>
									))}
								</ul>
								<button
									disabled={claiming || claimed}
									onClick={() => claimNFT(nft.metadata.id.toString())}
									className={clsx(
										'mt-2 text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-lg',
										claiming && 'opacity-50 cursor-not-allowed',
										claimed && 'opacity-50 cursor-not-allowed'
									)}
								>
									Claim
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Step3Connect;
