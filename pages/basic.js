import React, { useState } from 'react';
import { useAddress, useEditionDrop, useMetamask } from '@thirdweb-dev/react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Basic() {
	const connectWithMetamask = useMetamask();
	const address = useAddress();
	const editionDrop = useEditionDrop(process.env.NEXT_CONTRACT_ADDRESS);
	const [claimed, setClaimed] = useState(false);
	const [claiming, setClaiming] = useState(false);

	const tokenId = 1;
	const quantity = 1;

	const claimNFT = async () => {
		try {
			setClaiming(true);
			await editionDrop?.claimTo(address, tokenId, quantity);
			console.log('🎉 NFT claimed successfully!');
			setClaimed(true);
		} catch (err) {
			console.log('💩 Error claiming NFT: ', err);
		}
	};

	return (
		<div className="">
			<Head>
				<title>Gasless NFT PoC</title>
				<meta name="description" content="PoC for claiming NFTs" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className="text-gray-600 body-font">
				<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
					<a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-10 h-10 p-2 rounded-full"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
							/>
						</svg>
						<span className="ml-3 text-xl">
							Martin&apos;s Awesome NFT Collection
						</span>
					</a>
					{address ? (
						<h2 className="border-2 border-slate-400 rounded-lg py-2 px-4 truncate max-w-sm">
							You are signed in as {address}
						</h2>
					) : (
						<button
							onClick={connectWithMetamask}
							className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
						>
							Sign in with metamask
						</button>
					)}
				</div>
			</header>
			<main className="container mx-auto flex flex-col flex-1 justify-center items-center min-h-screen">
				<section className="text-gray-600 body-font">
					<div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
						<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
							<h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
								Ready to Claim your Martin NFT?
							</h1>
							{address ? (
								<>
									<p className="mb-8 leading-relaxed">
										By pressing the claim button you will be able to claim your
										NFT
									</p>
									<div className="flex justify-center">
										<button
											disabled={claiming}
											onClick={claimNFT}
											className="inline-flex text-white bg-blue-500 disabled:bg-gray-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
										>
											{claiming ? (
												<>
													<svg
														className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
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
													</svg>
													Claiming...
												</>
											) : (
												<>Claim NFT </>
											)}
										</button>
									</div>
								</>
							) : (
								<p className="mb-8 leading-relaxed">
									Sign in with metamask to claim your NFT
								</p>
							)}

							{claimed && (
								<h3 className="text-center">
									You have claimed your NFT! check your wallet
								</h3>
							)}
						</div>
						<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
							<Image
								src="/avatar_blue.jpg"
								className="rounded-lg"
								width={720}
								height={720}
								alt="collection image"
							/>
						</div>
					</div>
				</section>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by Martin
				</a>
			</footer>
		</div>
	);
}
