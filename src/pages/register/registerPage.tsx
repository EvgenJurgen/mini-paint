import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../core/components/Container';
import { Form } from '../../core/components/Form';
import { Input } from '../../core/components/Input';
import { MainStyle } from '../../core/components/Main';
import { WorkingAria } from '../../core/components/WorkingAria';
import { useAppDispatch } from '../../core/hooks/redux';
import { registerUser } from '../../core/reducers/userReducer';

export const RegisterPage = () => {
	const dispatch = useAppDispatch();

	const [user, setUser] = useState({ nickname: '', email: '', password: '' });

	const handleChange = (event: any) => {
		setUser((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const submitHandler = (event: any) => {
		event.preventDefault();
		dispatch(registerUser(user));
	};

	// return (
	// 	<form onSubmit={submitHandler}>
			// <Input type="text" placeholder="Nickname" name="nickname" handleChange={handleChange} />
			// <Input type="email" placeholder="Email" name="email" handleChange={handleChange} />
			// <Input type="password" placeholder="Password" name="password" handleChange={handleChange} />

			// <button type="submit">Sign up</button>

			// <div>
			// 	<h4>
			// 		Already have an account? <Link to={'/login'}>Log In</Link>
			// 	</h4>
			// </div>
	// 	</form>
	// );

	return (
		<Container>
			<WorkingAria>
				<Main>
					<Form onSubmit={submitHandler}>
						<Input type="text" placeholder="Nickname" name="nickname" handleChange={handleChange} />
						<Input type="email" placeholder="Email" name="email" handleChange={handleChange} />
						<Input
							type="password"
							placeholder="Password"
							name="password"
							handleChange={handleChange}
						/>

						<button type="submit">Sign up</button>

						<div>
							<h4>
								Already have an account? <Link to={'/login'}>Log In</Link>
							</h4>
						</div>
					</Form>
				</Main>
			</WorkingAria>
		</Container>
	);
};

const Main = styled(MainStyle)`
	width: 100%;
	background-color: ${({ theme }) => theme.primary};
	border: none;
`;
