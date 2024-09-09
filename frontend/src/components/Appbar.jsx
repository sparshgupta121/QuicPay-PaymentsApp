import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export const Appbar = ({ firstname, UserAlphabet }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const navigate = useNavigate();

	const handleDropdownToggle = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleProfileUpdate = () => {
		navigate("/updateprofile");
		setIsDropdownOpen(false);
	};

	const handleLogout = () => {
		setIsDropdownOpen(false);
		localStorage.clear();
		navigate("/signin", { replace: true });

		window.history.pushState(null, "", window.location.href);
		window.addEventListener("popstate", () => {
			window.history.go(1);
		});
	};

	return (
		<div className='shadow-md bg-green-500 text-white flex justify-between items-center p-4'>
			<div className='flex items-center space-x-4'>
				<img
					src={logo}
					alt='App Logo'
					className='h-10'
				/>
			</div>
			<div className='flex items-center space-x-4'>
				<span className='text-lg'>Hello, {firstname}</span>
				<div className='relative'>
					<div
						onClick={handleDropdownToggle}
						className='bg-gray-200 text-gray-800 rounded-full h-12 w-12 flex items-center justify-center text-xl font-semibold cursor-pointer'>
						{UserAlphabet}
					</div>
					{isDropdownOpen && (
						<div className='absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg'>
							<button
								onClick={handleProfileUpdate}
								className='block w-full px-4 py-2 text-left hover:bg-gray-200'>
								Update Profile
							</button>
							<button
								onClick={handleLogout}
								className='block w-full px-4 py-2 text-left hover:bg-gray-200'>
								Log Out
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
