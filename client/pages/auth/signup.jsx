import React, { useState } from "react";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const onSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post("/api/users/signup", {
			email,
			password,
		});

		console.log(response.data);
	};
	return (
		<form onSubmit={onSubmit}>
			<h1>Sign up</h1>
			<div className="form-group">
				<label htmlFor="">Email Address</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="">Password</label>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					className="form-control"
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Sign up
			</button>
		</form>
	);
};

export default SignUp;
