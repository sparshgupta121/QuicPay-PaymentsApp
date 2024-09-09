export const Balance = ({ value }) => {
	return (
		<div className='flex items-center space-x-4'>
			<span className='text-xl font-bold'>Your balance:</span>
			<span className='text-2xl font-semibold text-green-600'>₹ {value}</span>
		</div>
	);
};
