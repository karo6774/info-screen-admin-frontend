import React, {useState} from "react";
import "./Login.scss";

import {Alert, Button, Card, Icon, Input} from "antd";
import {createToken} from "../api";
import {useDispatch} from "react-redux";

const wrapSetter = set => e => set(e.target.value);

const Login = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const enableLoginButton = username.length > 0 && password.length > 0;

    async function performLogin() {
        try {
            setErrorMessage(null);
            setLoading(true);

            const token = await createToken(username, password);
            setLoading(false);

            dispatch({type: 'login', token})
        }catch (e) {
            setLoading(false);
            switch(e.status) {
                case 422:
                    setErrorMessage("Unknown username or password");
                    break;
                case 500:
                    setErrorMessage("Internal server error");
                    break;
                default:
                    setErrorMessage("Unknown error");
                    console.error(e);
                    break;
            }
        }
    }

    return (
        <Card
            title="Login"
            className="login-card"
            actions={[
                <Button
                    type="primary"
                    disabled={!enableLoginButton}
                    onClick={performLogin}
                    loading={loading}
                >Login</Button>
            ]}>
            <span className="login-form">
                {errorMessage && <Alert type="error" message={errorMessage}/>}
                <Input
                    type="email"
                    placeholder="Username"
                    prefix={<Icon type="user" style={{opacity: 0.25}}/>}
                    value={username}
                    onChange={wrapSetter(setUsername)}
                    onPressEnter={performLogin}
                />
                <Input.Password
                    placeholder="Password"
                    prefix={<Icon type="lock" style={{opacity: 0.25}}/>}
                    value={password}
                    onChange={wrapSetter(setPassword)}
                    onPressEnter={performLogin}
                />
            </span>
        </Card>
    );
};

export default Login;
