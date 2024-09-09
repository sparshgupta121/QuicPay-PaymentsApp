import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
const apiUrl = import.meta.env.VITE_API_URL;


export const Signin = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className='bg-gradient-to-r from-green-100 to-gray-200 h-screen flex items-center justify-center'>
			<div className='flex flex-col items-center bg-white rounded-lg shadow-lg px-4 py-3 max-w-xs sm:max-w-sm w-full'>
				<div className='flex justify-center'>
					<img
						src={logo}
						alt='App Logo'
						className='m-2'
					/>
				</div>

				<Heading label={"Sign in"} />
				<SubHeading label={"Enter your credentials"} />

				<div className='w-full space-y-2 sm:space-y-3'>
					<InputBox
						label='Email'
						type='email'
						placeholder='example@gmail.com'
						onChange={(e) => setUsername(e.target.value)}
					/>

					<InputBox
						label='Password'
						type='password'
						placeholder='Password Must Between 6-15 Characters'
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button
						onClick={async () => {
							try {
								const resp = await axios.post(`${apiUrl}api/v1/user/signin`, {
									username,
									password,
								});
								console.log(resp);

								alert(resp.data.message);
								localStorage.setItem("firstname", resp.data.firstname);
								localStorage.setItem("token", resp.data.Token);
								if (resp.data.message == "Sign In Successfully") {
									navigate("/dashboard");
								}
							} catch (error) {
								console.error("Signin error:", error);
							}
						}}
						label={"Sign in"}
					/>
				</div>

				<BottomWarning
					label={"Don't have an account?"}
					buttonText={"Sign up"}
					to={"/signup"}
				/>

				<BottomWarning
					label={"Forgot Password? "}
					buttonText={"Reset Here"}
					to={"/resetpassword"}
				/>
			</div>
		</div>
	);
};
