import axios from "axios";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;


export const SendMoney = () => {
	const [SearchParams] = useSearchParams();
	const id = SearchParams.get("id");
	const firstname = SearchParams.get("name");

	const [amount, setAmount] = useState("");
	const [popupMessage, setPopupMessage] = useState("");
	const [showPopup, setShowPopup] = useState(false);
	const navigate = useNavigate();

	const handleTransaction = async () => {
		try {
			const response = await axios.post(
				`${apiUrl}api/v1/account/transfer`,
				{
					to: id,
					amount,
				},
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			);

			if (response.data.message === "Transfer successful") {
				setPopupMessage("Transaction Successful!");
			} else {
				setPopupMessage(response.data.message);
			}
			setShowPopup(true);
		} catch (error) {
			console.error("Error during transaction:", error);
			setPopupMessage("Transaction failed due to an error");
			setShowPopup(true);
		}

		setTimeout(() => {
			navigate(`/dashboard`);
		}, 2000);
	};

	return (
		<div className='flex justify-center h-screen bg-gray-100'>
			<div className='h-full flex flex-col justify-center'>
				<div className='border h-min max-w-md p-6 space-y-8 w-96 bg-white shadow-lg rounded-lg'>
					<div className='flex flex-col space-y-1.5'>
						<h2 className='text-3xl font-bold text-center text-gray-800'>Send Money</h2>
					</div>
					<div>
						<div className='flex items-center space-x-4 mb-6'>
							<div className='w-14 h-14 rounded-full bg-green-500 flex items-center justify-center'>
								<span className='text-3xl text-white font-semibold'>{firstname[0].toUpperCase()}</span>
							</div>
							<h3 className='text-2xl font-semibold text-gray-800'>{firstname}</h3>
						</div>
						<div className='space-y-4'>
							<div className='space-y-2'>
								<label
									className='text-sm font-medium text-gray-700'
									htmlFor='amount'>
									Amount (in ₹ )
								</label>
								<input
									onChange={(e) => setAmount(e.target.value)}
									type='number'
									className='flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm'
									id='amount'
									placeholder='Enter amount'
								/>
							</div>
							<button
								onClick={handleTransaction}
								className='flex justify-center items-center rounded-md text-sm          font-medium h-10 px-4 py-2 w-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300'>
								Initiate Transfer
							</button>
						</div>
					</div>
				</div>

				{showPopup && (
					<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70'>
						<div className='bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full'>
							<h3 className='text-lg font-semibold mb-4 text-gray-800'>{popupMessage}</h3>
							<button
								onClick={() => setShowPopup(false)}
								className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300'>
								Close
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
