export function Button({ label, onClick }) {
	return (
		<button
			onClick={onClick}
			type='button'
			className='w-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5'>
			{label}
		</button>
	);
}
