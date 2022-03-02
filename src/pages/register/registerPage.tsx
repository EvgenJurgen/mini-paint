import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { registerUser } from '../../core/actions/userActions';

import { Form } from '../../core/components/Form/Form';
import { Input } from '../../core/components/Input/Input';

import { Container } from '../../core/styles/styled-container';
import { Main } from './styles/styled-main';
import { WorkingArea } from '../../core/styles/styled-working-area';

import { LOGIN_ROUTE } from '../AppRoutes';

const NICKNAME = 'nickname';
const EMAIL = 'email';
const PASSWORD = 'password';

const INPUT_NICKNAME_PLACEHOLDER_TEXT = 'Nickname';
const INPUT_EMAIL_PLACEHOLDER_TEXT = 'Email';
const INPUT_PASSWORD_PLACEHOLDER_TEXT = 'Password';
const SIGN_IN_BUTTON_TEXT = 'Sign in';
const TEXT_OF_LOG_IN_OFFER = 'Already have an account?';
const LINK_TO_LOG_IN_PAGE_TEXT = 'Log in';

export const RegisterPage = (): React.ReactElement => {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case NICKNAME:
        setNickname(event.target.value);
        break;
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
    dispatch(registerUser({ nickname, email, password }));
  };

  return (
    <Container>
      <WorkingArea>
        <Main>
          <Form onSubmit={submitHandler}>
            <Input
              type="text"
              placeholder={INPUT_NICKNAME_PLACEHOLDER_TEXT}
              name={NICKNAME}
              handleChange={handleChange}
            />
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

            <button type="submit">{SIGN_IN_BUTTON_TEXT}</button>

            <div>
              <h4>
                {TEXT_OF_LOG_IN_OFFER} <Link to={LOGIN_ROUTE}>{LINK_TO_LOG_IN_PAGE_TEXT}</Link>
              </h4>
            </div>
          </Form>
        </Main>
      </WorkingArea>
    </Container>
  );
};
