import React from "react";
import {Form as IForm} from 'informed';
import {Alert, Button, Form} from 'react-bootstrap';
import Text from "./informed-bootstrap/Text";
import {api_url} from "../config";


class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
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

    onSubmit = () => {
        const data = this.formApi.getState();

        if (!data.invalid) {
            let formData = new FormData();
            formData.append('username', data.values.username);
            if (this.fileInput.current && this.fileInput.current.files.length === 1)
                formData.append('avatar', this.fileInput.current.files[0]);

            fetch(
                api_url + 'api/user/' + (this.props.initial ? this.props.initial.id + '/' : ''),
                {
                    credentials: "include",
                    method: this.props.edit ? 'PUT' : 'POST',
                    body: formData
                }
            )
                .then(response => {
                    if (response.status === 201) {
                        return this.setState({success: 'Успешно добавлен!'});
                    }
                    if (response.status === 200) {
                        return this.setState({success: 'Успешно сохранен!'});
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

            <IForm initialValues={{username: this.props.initial ? this.props.initial.username : null}}
                   getApi={this.setFormApi} onSubmit={this.onSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Юзернейм</Form.Label>
                    <Text validate={this.validate_username} validateOnChange field="username"/>
                </Form.Group>

                <Form.Group controlId="formAvatar">
                    <Form.Label>Аватарка</Form.Label>
                    <Text field="avatar" type="file" forwardedRef={this.fileInput}/>
                </Form.Group>

                <Button type="submit" variant="success" size="lg" block>
                    {this.props.edit ? 'Изменить ' : 'Добавить '}пользователя
                </Button>
            </IForm>
        </div>;
    }
}

export default UserForm
