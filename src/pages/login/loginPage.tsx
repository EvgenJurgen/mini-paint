import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { loginUser } from '../../core/actions/userActions';

import { Form } from '../../core/components/Form/Form';
import { Input } from '../../core/components/Input/Input';

import { Container } from '../../core/styles/styled-container';
import { WorkingArea } from '../../core/styles/styled-working-area';

import { Main } from './styles/styled-main';

import { REGISTER_ROUTE } from '../AppRoutes';

const EMAIL = 'email';
const PASSWORD = 'password';

const INPUT_EMAIL_PLACEHOLDER_TEXT = 'Email';
const INPUT_PASSWORD_PLACEHOLDER_TEXT = 'Password';
const LOG_IN_BUTTON_TEXT = 'Log in';
const TEXT_OF_REGISTRATION_OFFER = 'Do you want to create a new account?';
const LINK_TO_REGISTER_PAGE_TEXT = 'Register';

export const LoginPage = (): React.ReactElement => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case EMAIL:
        setEmail(event.target.value);
        break;
      case PASSWORD:
        setPassword(event.target.value);
        break;
    }
  };

  const submitHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <Container>
      <WorkingArea>
        <Main>
          <Form onSubmit={submitHandler}>
            <Input
              type="email"
              placeholder={INPUT_EMAIL_PLACEHOLDER_TEXT}
              name={EMAIL}
              handleChange={handleChange}
            />
            <Input
              type="password"
              placeholder={INPUT_PASSWORD_PLACEHOLDER_TEXT}
              name={PASSWORD}
              handleChange={handleChange}
            />
            <button type="submit">{LOG_IN_BUTTON_TEXT}</button>

            <div>
              <h4>
                {TEXT_OF_REGISTRATION_OFFER}{' '}
                <Link to={REGISTER_ROUTE}>{LINK_TO_REGISTER_PAGE_TEXT}</Link>
              </h4>
            </div>
          </Form>
        </Main>
      </WorkingArea>
    </Container>
  );
};
