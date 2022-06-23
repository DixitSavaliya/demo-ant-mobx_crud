import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import './login.css';

const Login = inject('store')(
    observer(({ store, otherProp }) => {
    const [login, setLogin] = useState(false);
    const onFinish = (values) => {
        const data = {
            username: values.username,
            password: values.password,
            token: `${values.username}` + `${values.password}`
        };
        store.loginStore.login(data);
        setLogin(true);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {login && (
                <Navigate to="/" replace={true} />
            )}
            <div className='login'>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}));

export default Login;