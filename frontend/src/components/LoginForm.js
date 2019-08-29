import React from "react";
import {Form as IForm} from 'informed';
import {Alert, Button, Form} from 'react-bootstrap';
import Text from "./informed-bootstrap/Text";
import {api_url} from "../config";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: null,
            success: null
        }
    }

    setFormApi = (formApi) => {
        this.formApi = formApi;
    };

    validate_username = (value) => {
        return !value || value.length > 150 || value.length < 4 || !new RegExp("^[\\w.@+-]+$").test(value)
            ? 'Обязательное поле. От 4 до 150 символов. Только буквы, цифры и символы @/./+/-/_.'
            : undefined;
    };

    validate_password = (value) => {
        return !value || value.length > 150 || value.length < 4
            ? 'Обязательное поле. От 4 до 150 символов.'
            : undefined;
    };

    onSubmit = () => {
        const data = this.formApi.getState();

        if (!data.invalid) {
            fetch(
                api_url + 'api/login/',
                {
                    method: 'POST',
                    body: JSON.stringify(data.values)
                }
            )
                .then(response => {
                    if (response.status === 200) {
                        return this.setState({success: 'Успешно вошли!'});
                    }

                    return response.json()
                })
                .then(data => {
                    this.setState({errors: data})
                });
        }
    };

    render() {
        return <div>
            {this.state.success ? (
                <Alert variant="success">
                    {this.state.success}
                </Alert>
            ) : null}

            {this.state.errors ? (
                <Alert variant="danger">
                    <ul>
                        {Object.entries(this.state.errors).map((elr, idx) => <li key={idx}>{elr[1]}</li>)}
                    </ul>
                </Alert>
            ) : null}

            <IForm getApi={this.setFormApi} onSubmit={this.onSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Юзернейм</Form.Label>
                    <Text validate={this.validate_username} validateOnChange field="username"/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Text validate={this.validate_password} validateOnChange field="password" type="password"/>
                </Form.Group>

                <Button type="submit" variant="success" size="lg" block>
                    Войти
                </Button>
            </IForm>
        </div>;
    }
}

export default LoginForm
