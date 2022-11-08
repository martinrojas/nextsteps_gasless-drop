import React, { useState } from 'react';
import { useAddress, useDisconnect, useEditionDrop } from '@thirdweb-dev/react';

import Head from 'next/head';
import Image from 'next/image';
import Wizard from '../components/wizard';
import styles from '../styles/Home.module.css';

export default function Home() {
	const disconnect = useDisconnect();
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
					{address && (
						<div className="flex">
							<h2 className=" rounded-lg py-2 px-4 truncate max-w-sm">
								You are signed in as {address}
							</h2>
							<button
								onClick={disconnect}
								className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
							>
								disconnect
							</button>
						</div>
					)}
				</div>
			</header>
			<main className="container mx-auto flex flex-col flex-1 justify-center items-center min-h-screen">
				<Wizard />
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
