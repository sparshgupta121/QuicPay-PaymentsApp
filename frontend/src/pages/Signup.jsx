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


export const Signup = () => {
	const navigate = useNavigate();
	const [firstname, setfirstname] = useState("");
	const [lastname, setlastname] = useState("");
	const [username, setusername] = useState("");
	const [password, setpassword] = useState("");

	return (
		<div className='bg-gradient-to-r from-green-100 to-teal-200 h-screen flex items-center justify-center'>
			<div className='flex flex-col items-center bg-white rounded-lg shadow-lg px-4 py-3 max-w-xs sm:max-w-sm w-full'>
				<div className='flex justify-center mb-2'>
					<img
						src={logo}
						alt='App Logo'
					/>
				</div>

				<Heading label={"Sign up"} />

				<SubHeading
					label={"Create an account"}
					className='mt-1'
				/>

				<div className='w-full space-y-2 sm:space-y-3'>
					<InputBox
						label='First Name'
						placeholder='John'
						onChange={(e) => setfirstname(e.target.value)}
					/>

					<InputBox
						label='Last Name'
						placeholder='Doe'
						onChange={(e) => setlastname(e.target.value)}
					/>

					<InputBox
						label='Email'
						type='email'
						placeholder='example@gmail.com'
						onChange={(e) => setusername(e.target.value)}
					/>

					<InputBox
						label='Password'
						type='password'
						placeholder='Password Must Between 6-15 Characters'
						onChange={(e) => setpassword(e.target.value)}
					/>

					<Button
						onClick={async () => {
							const response = await axios.post(`${apiUrl}api/v1/user/signup`, {
								firstname,
								lastname,
								username,
								password,
							});

							if (response.data.message == "User Created Succesfully") {
								alert("User Created Succesfully");
								localStorage.setItem("token", response.data.Token);
								localStorage.setItem("firstname", firstname);
								navigate("/dashboard");
							} else alert(response.data.message);
						}}
						label={"Sign up"}
					/>
				</div>

				<BottomWarning
					label={"Already have an account?"}
					buttonText={"Sign in"}
					to={"/signin"}
				/>
			</div>
		</div>
	);
};
