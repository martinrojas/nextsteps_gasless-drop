import React from 'react';
import clsx from 'clsx';

const StepIndicator = ({
	label,
	active = false,
	icon,
	goToStep = () => {},
}) => {
	return (
		<div
			onClick={goToStep}
			className={clsx(
				'sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none  tracking-wider rounded-t',
				active && 'border-red-500 text-red-500 bg-gray-100 ',
				!active && 'border-gray-200 hover:text-gray-900'
			)}
		>
			{!!icon ? (
				icon
			) : (
				<svg
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					className="w-5 h-5 mr-3"
					viewBox="0 0 24 24"
				>
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
				</svg>
			)}
			{label}
		</div>
	);
};

export default StepIndicator;
