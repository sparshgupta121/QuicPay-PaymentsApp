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
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // For loading state
    const [message, setMessage] = useState("");    // For displaying response message

    const handleSignup = async () => {
        setLoading(true);  // Set loading to true when request starts
        setMessage("");    // Clear previous message
        try {
            const response = await axios.post(`${apiUrl}api/v1/user/signup`, {
                firstname,
                lastname,
                username,
                password,
            });

            if (response.data.message === "User Created Succesfully") {
                setMessage("User created successfully!");
                localStorage.setItem("token", response.data.Token);
                localStorage.setItem("firstname", firstname);
                navigate("/dashboard");
            } else {
                setMessage(response.data.message);  // Display the error message from response
            }
        } catch (error) {
            setMessage("Sign up failed. Please try again.");  // Set error message
            console.error("Signup error:", error);
        } finally {
            setLoading(false);  // Set loading to false when request finishes
        }
    };

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
                        onChange={(e) => setFirstname(e.target.value)}
                    />

                    <InputBox
                        label='Last Name'
                        placeholder='Doe'
                        onChange={(e) => setLastname(e.target.value)}
                    />

                    <InputBox
                        label='Email'
                        type='email'
                        placeholder='example@gmail.com'
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <InputBox
                        label='Password'
                        type='password'
                        placeholder='Password Must Be Between 6-15 Characters'
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        onClick={handleSignup}
                        label={loading ? "Signing up..." : "Sign up"}  // Change button label based on loading state
                        disabled={loading}  // Disable button when loading
                    />
                </div>

                {message && (
                    <div className="mt-3 text-center">
                        <p className={`text-sm ${message === "User created successfully!" ? "text-green-500" : "text-red-500"}`}>
                            {message}
                        </p>
                    </div>
                )}

                <BottomWarning
                    label={"Already have an account?"}
                    buttonText={"Sign in"}
                    to={"/signin"}
                />
            </div>
        </div>
    );
};
