import React from "react";
import {Alert, Button, Form} from 'react-bootstrap';
import {Form as IForm, Option} from "informed";
import Text from "./informed-bootstrap/Text";
import Select from "./informed-bootstrap/Select";
import {api_url} from "../config";


class BookForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: null,
            success: null
        };

        this.rating = [...Array(10).keys()].map(i => i + 1)
    }

    setFormApi = (formApi) => {
        this.formApi = formApi;
    };

    onSubmit = () => {
        const data = this.formApi.getState();

        if (!data.invalid) {
            if (this.props.user)
                data.values.user = this.props.user;

            fetch(
                api_url + 'api/books/' + (this.props.initial ? this.props.initial.id + '/' : ''),
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    method: this.props.edit ? 'PUT' : 'POST',
                    body: JSON.stringify(data.values),
                }
            )
                .then(response => {
                    if (response.status === 201) {
                        return this.setState({success: 'Успешно добавлено!'});
                    }
                    if (response.status === 200) {
                        return this.setState({success: 'Успешно сохранено!'});
                    }

                    return response.json()
                })
                .then(data => {
                    this.setState({errors: data})
                })
        }
    };

    validate_text = (value) => {
        return !value || value.length > 150 || value.length < 4
            ? 'Обязательное поле. От 4 до 150 символов.'
            : undefined;
    };

    validate_number = (value) => {
        return !value || parseInt(value) < 0
            ? 'Обязательное поле. Не может быть меньше нуля.'
            : undefined;
    };

    validate_rating = (value) => {
        return !value
            ? 'Обязательное поле.'
            : undefined;
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

            <IForm initialValues={this.props.initial} getApi={this.setFormApi} onSubmit={this.onSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Название</Form.Label>
                    <Text validate={this.validate_text} validateOnChange field="name"/>
                </Form.Group>
                <Form.Group controlId="author">
                    <Form.Label>Автор</Form.Label>
                    <Text validate={this.validate_text} validateOnChange field="author"/>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Цена</Form.Label>
                    <Text validate={this.validate_number} validateOnChange field="price" type="number"/>
                </Form.Group>
                <Form.Group controlId="pages">
                    <Form.Label>Количество страниц</Form.Label>
                    <Text validate={this.validate_number} validateOnChange field="pages" type="number"/>
                </Form.Group>
                <Form.Group controlId="rating">
                    <Form.Label>Рейтинг</Form.Label>
                    <Select field="rating" validate={this.validate_rating} validateOnChange>
                        <Option value="" disabled>
                            Выберите одно...
                        </Option>
                        {Object.entries(this.rating).map((elr, idx) => <Option key={idx}
                                                                               value={elr[1]}>{elr[1]}</Option>)}
                    </Select>
                </Form.Group>

                <Button type="submit" variant="success" size="lg" block>
                    {this.props.edit ? 'Изменить ' : 'Добавить '}книгу
                </Button>
            </IForm>
        </div>;
    }
}

export default BookForm
