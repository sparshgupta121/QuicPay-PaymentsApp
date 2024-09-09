import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;


export const Users = () => {
	const [users, setUsers] = useState([]);
	const [filter, setfilter] = useState("");

	useEffect(() => {
		axios
			.get(`${apiUrl}api/v1/user/bulk?filter=${filter}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setUsers(response.data.users);
			});
	}, [filter]);

	let globalkey = 1;

	return (
		<>
			<div className='font-bold mt-6 text-lg'>Users</div>
			<div className='my-2'>
				<input
					type='text'
					onChange={(e) => setfilter(e.target.value)}
					placeholder='Search users...'
					className='w-full px-2 py-1 border rounded border-slate-200'></input>
			</div>
			<div>
				{users.map((user) => (
					<User
						key={globalkey++}
						user={user}
					/>
				))}
			</div>
		</>
	);
};

function User({ user }) {
	const navigate = useNavigate();
	return (
		<div className='flex justify-between'>
			<div className='flex'>
				<div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2'>
					<div className='flex flex-col justify-center h-full text-xl'>{user.firstname[0]}</div>
				</div>
				<div className='flex flex-col justify-center h-ful'>
					<div>
						{user.firstname} {user.lastname}
					</div>
				</div>
			</div>

			<div className='flex flex-col justify-center h-ful'>
				<Button
					onClick={(e) => {
						navigate(`/send?id=${user._id}&name=${user.firstname}`);
					}}
					label={"Send Money"}
				/>
			</div>
		</div>
	);
}
