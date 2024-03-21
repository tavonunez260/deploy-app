import { FormEvent, useState } from 'react';

export function LeadCaptureForm() {
	const [loading, setLoading] = useState(false);
	const handleForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData(e.currentTarget);
		const formObject = Object.fromEntries(formData);
		const jsonFormObject = JSON.stringify(formObject);
		console.log(jsonFormObject);

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: jsonFormObject
		};

		const response = await fetch('/api/submit-form', options);
		const data = await response.json();
		console.log(data);
		setLoading(false);
	};
	return (
		<form className="flex flex-col gap-4 w-80" onSubmit={handleForm}>
			<div>
				<label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
					Email
				</label>
				<div className="mt-2">
					<input
						className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						id="email"
						name="email"
						placeholder="you@example.com"
						type="email"
					/>
				</div>
			</div>
			<div>
				<label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="firstName">
					First Name
				</label>
				<div className="mt-2">
					<input
						className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						id="firstName"
						name="firstName"
						type="text"
					/>
				</div>
			</div>
			<div>
				<label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="lastName">
					Last Name
				</label>
				<div className="mt-2">
					<input
						className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						id="lastName"
						name="lastName"
						type="lastName"
					/>
				</div>
			</div>
			<button
				className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				disabled={loading}
				type="submit"
			>
				{loading ? 'Loading...' : 'Subscribe'}
			</button>
		</form>
	);
}
