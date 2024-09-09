import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
	return (
		<div className='text-center mt-4'>
			<span className='text-sm text-gray-600'>{label}</span>
			<Link
				className='text-blue-500 hover:underline ml-1'
				to={to}>
				{buttonText}
			</Link>
		</div>
	);
}
