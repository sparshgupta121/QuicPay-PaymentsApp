import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import logo from "../assets/logo.png"


export const ContactPage = () => {
	return (
		<div className='bg-gradient-to-r from-pink-100 to-red-200 h-screen flex items-center justify-center'>
			<div className='flex flex-col items-center bg-white rounded-lg shadow-lg px-6 py-8 max-w-md w-full'>
            <div className='flex justify-center'>
					<img
						src={logo}
						alt='App Logo'
						className='m-2'
					/>
				</div>

				<Heading label={"Contact Us"} />
				<SubHeading label={"Get in touch with us"} />

				<div className='w-full space-y-4'>
					<div className='text-left'>
						<h2 className='font-bold text-xl mt-8'>About Us</h2>
						<p className='mt-2 text-sm text-gray-600'>
							We are a team of dedicated professionals committed to providing the best service possible. If you have any questions or
							concerns, please don't hesitate to reach out to us.
						</p>
					</div>

					<div className='text-left'>
						<h2 className='font-bold text-xl'>Contact Information</h2>
						<p className='mt-2 text-sm text-gray-600'>
							<strong>Email:</strong> contact@quicpay.com
						</p>
						<p className='mt-1 text-sm text-gray-600'>
							<strong>Phone:</strong> +91 9876543210
						</p>
						<p className='mt-1 text-sm text-gray-600'>
							<strong>Address:</strong> 123 Payment St, Suite 100, Payment City, PA 12345
						</p>
					</div>
				</div>

				<BottomWarning
					label={"Back to Dashboard"}
					buttonText={"Go Back"}
					to={"/dashboard"}
				/>
			</div>
		</div>
	);
};
