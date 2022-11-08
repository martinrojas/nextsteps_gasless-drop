import { BiWallet } from 'react-icons/bi';
import { CgArrowsExchangeAlt } from 'react-icons/cg';
import { GrGallery } from 'react-icons/gr';
import { IoTicketOutline } from 'react-icons/io5';
import React from 'react';
import Step1Connect from './wizardSteps/step1Connect';
import Step2Connect from './wizardSteps/step2Connect';
import Step3Connect from './wizardSteps/step3Connect';
import Step4Connect from './wizardSteps/step4Connect';
import Step5Connect from './wizardSteps/step5Connect';
import StepIndicator from './stepIndicator';

const Wizard = () => {
	const [step, setStep] = React.useState(1);
	const [receipt, setReceipt] = React.useState(null);

	return (
		<section className="mx-auto flex flex-wrap flex-col">
			<div className="flex mx-auto flex-wrap mb-20">
				<StepIndicator
					label="1 - Connect Wallet"
					active={step === 1}
					icon={<BiWallet className="w-5 h-5 mr-3" />}
					goToStep={() => setStep(1)}
				/>
				<StepIndicator
					label="2 - Verify Network"
					active={step === 2}
					icon={
						<svg
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							className="w-5 h-5 mr-3"
							viewBox="0 0 24 24"
						>
							<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
						</svg>
					}
					goToStep={() => setStep(2)}
				/>
				<StepIndicator
					label="3 - Claim NFT"
					active={step === 3}
					icon={<IoTicketOutline className="w-5 h-5 mr-3" />}
					goToStep={() => setStep(3)}
				/>
				<StepIndicator
					label="4 - Follow Transaction"
					active={step === 4}
					icon={<CgArrowsExchangeAlt className="w-5 h-5 mr-3" />}
				/>

				<StepIndicator
					label="5 - See your NFT in your wallet"
					active={step === 5}
					icon={<GrGallery className="w-5 h-5 mr-3" />}
					goToStep={() => setStep(5)}
				/>
			</div>
			<div>
				{
					{
						1: <Step1Connect goToStep={() => setStep(2)} />,
						2: <Step2Connect goToStep={() => setStep(3)} />,
						3: (
							<Step3Connect
								goToStep={() => setStep(4)}
								saveReceipt={setReceipt}
							/>
						),
						4: (
							<Step4Connect goToStep={() => setStep(5)} showReceipt={receipt} />
						),
						5: <Step5Connect />,
					}[step]
				}
			</div>
		</section>
	);
};

export default Wizard;
