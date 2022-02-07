import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../core/components/Container';
import { Form } from '../../core/components/Form';
import { Input } from '../../core/components/Input';
import { MainStyle } from '../../core/components/Main';
import { WorkingAria } from '../../core/components/WorkingAria';
import { useAppDispatch } from '../../core/hooks/redux';
import { loginUser } from '../../core/reducers/userReducer';

export const LoginPage = () => {
	const dispatch = useAppDispatch();

	const [user, setUser] = useState({ email: '', password: '' });

	const handleChange = (event: any) => {
		setUser((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const submitHandler = (event: any) => {
		event.preventDefault();
		dispatch(loginUser(user));
	};

	return (
		<Container>
			<WorkingAria>
				<Main>
					<Form onSubmit={submitHandler}>
						<Input type="email" placeholder="Email" name="email" handleChange={handleChange} />
						<Input
							type="password"
							placeholder="Password"
							name="password"
							handleChange={handleChange}
						/>
						<button type="submit">Log in</button>

						<div>
							<h4>
								Already have an account? <Link to={'/'}>Register</Link>
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
	background-color: ${({theme})=>theme.primary};
	border: none;
`;
