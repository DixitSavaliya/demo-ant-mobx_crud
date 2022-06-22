import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';
import './login.css';

const Login = inject('store')(
    observer(({ store }) => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [login, setLogin] = useState(false);

        const handleSubmit = async () => {
            const data = {
                username: username,
                password: password,
                token: `${username}` + `${password}`
            };
            store.loginStore.login(data);
            setLogin(true);
        };

        const handleUsernameChange = (e) => {
            setUsername(e.target.value);
        };

        const handlePasswordChange = (e) => {
            setPassword(e.target.value);
        };

        return (
            <>
                {login && (
                    <Navigate to="/" replace={true} />
                )}
                <div className='login'>
                <Form layout="vertical" >
                    <Form.Item>
                        <Input
                            value={username}
                            placeholder="Username"
                            name="username"
                            onChange={handleUsernameChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            type="password"
                            value={password}
                            placeholder="Password"
                            name="password"
                            onChange={handlePasswordChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                </div>
            </>
        );
    })
);

export default Login;
