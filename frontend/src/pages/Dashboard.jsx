import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
const apiUrl = import.meta.env.VITE_API_URL;

export const Dashboard = () => {
	const [balance, setBalance] = useState(null);

	const fetchBalance = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.get(`${apiUrl}api/v1/account/balance`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setBalance(response.data.balance);
		} catch (error) {
			console.error("Error fetching balance:", error);
		}
	};

	useEffect(() => {
		fetchBalance();
	}, []);

	const firstname = localStorage.getItem("firstname");
	const UserAlphabet = firstname ? firstname[0] : "";

	return (
		<div className='min-h-screen bg-gradient-to-r from-green-50 to-teal-50'>
			<Appbar
				UserAlphabet={UserAlphabet}
				firstname={firstname}
			/>

			<div className='max-w-4xl mx-auto px-4 py-6'>
				<Balance value={balance} />
				<Users />

				<div className='max-w-4xl mx-auto px-4 py-6 mt-4'>If You Don't See the Users List, try to log-in again !</div>
			</div>
		</div>
	);
};
