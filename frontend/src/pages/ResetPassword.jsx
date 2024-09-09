import axios from "axios";
import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;


export const ResetPassword = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();
	const handleReset = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.put(`${apiUrl}api/v1/user/resetpassword`, {
				username,
				password,
			});

			if (response.data.message == "Password Reset Successfully") {
				setMessage(response.data.message);
				setSuccess(true);
			} else {
				throw error;
			}
		} catch (error) {
			setMessage("Error resetting password");
			setSuccess(false);
		}
		setTimeout(() => {
			navigate("/signin");
		}, 2000);
	};

	return (
		<div className='bg-gradient-to-r from-blue-200 to-green-200 h-screen flex items-center justify-center'>
			<div className='flex flex-col items-center bg-white rounded-lg shadow-lg px-4 py-3 max-w-xs sm:max-w-sm w-full'>
				<div className='flex justify-center mb-4'>
					<img
						src={logo}
						alt='App Logo'
						className='h-10'
					/>
				</div>

				<Heading label={"Reset Your Password"} />
				<SubHeading label={"Enter your email and new password"} />

				<div className='w-full space-y-3'>
					<InputBox
						label='Email'
						type='email'
						placeholder='example@gmail.com'
						onChange={(e) => setUsername(e.target.value)}
					/>
					<InputBox
						label='New Password'
						type='password'
						placeholder='********'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						onClick={handleReset}
						label={"Reset Password"}
					/>
				</div>

				{message && (
					<div className={`mt-4 text-center ${success ? "text-green-600" : "text-red-600"}`}>
						{message}
						<div className={`mt-4 text-center`}>Redirecting to Sign-in</div>
					</div>
				)}

				<BottomWarning
					label={"Go Back! "}
					buttonText={"Signin"}
					to={"/signin"}
				/>
			</div>
		</div>
	);
};
