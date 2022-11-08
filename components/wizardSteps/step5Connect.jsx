import {
	MediaRenderer,
	ThirdwebNftMedia,
	useAddress,
	useEditionDrop,
	useEditions,
} from '@thirdweb-dev/react';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import LogRocket from 'logrocket';
import clsx from 'clsx';

const Step5Connect = (props) => {
	const { goToStep, saveReceipt } = props;
	const [owned, setOwned] = useState([]);

	const address = useAddress();
	const editionDropContract = useEditionDrop(
		process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
	);

	useEffect(() => {
		const getOwned = async () => {
			try {
				const owned = await editionDropContract?.getOwned(address);
				console.log('🎉 Owned: ', owned);
				setOwned(owned);
			} catch (err) {
				console.log('💩 Error getting owned: ', err);
				LogRocket.captureException(err);
			}
		};
		console.log('editionDropContract', editionDropContract);
		console.log('address', address);

		if (!!editionDropContract && !!address) getOwned();
	}, [editionDropContract, address]);

	return (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-20">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
						See your NFT in your wallet
					</h1>
					<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
						Use the Contract address to import The NFT to your wallet
					</p>
					<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
						Contract address:{' '}
						<span
							className="font-semibold text-lg hover:underline"
							onClick={() => {
								navigator.clipboard.writeText(
									process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
								);
							}}
						>
							{process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
						</span>{' '}
						(click to copy)
					</p>
				</div>
				<div className="flex flex-wrap justify-center">
					{owned?.map((nft, idx) => (
						<div key={idx} className="lg:w-1/4 md:w-1/2 p-4 w-full">
							<a className="block relative rounded-lg drop-shadow-lg overflow-hidden">
								<ThirdwebNftMedia metadata={nft.metadata} />
							</a>
							<div className="mt-4">
								<h3 className="text-gray-500 text-md tracking-widest title-font mb-1">
									{`${
										nft.metadata.name
									} - tokenID: ${nft.metadata.id.toString()}`}
								</h3>
								<h2 className="text-gray-900 title-font text-lg font-medium">
									{nft.metadata.description}
								</h2>
								<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
									{nft.quantityOwned.toString()} owned
								</p>
								<ul className="mt-1">
									{nft.metadata.attributes.map((attr, idx2) => (
										<li
											className="text-gray-900 title-font text-sm font-medium capitalize"
											key={idx2}
										>{`${attr?.trait_type}: ${attr?.value}`}</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Step5Connect;
