import React from "react";
import {Form as IForm, Option} from 'informed';
import {Alert, Button, Form} from 'react-bootstrap';
import {api_url, cookies} from "../config";
import Select from "./informed-bootstrap/Select";
import PropTypes from "prop-types";


class GiveBookForm extends React.Component {
    propTypes = {
        user: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: null,
            success: null,
            books: null
        }
    }

    setFormApi = (formApi) => {
        this.formApi = formApi;
    };


    componentDidMount() {
        fetch(api_url + 'api/book/?fields=id,name', {credentials: "include", 'method': 'GET'})
            .then(response => {
                if (response.status !== 200) {
                    return;
                }
                return response.json();
            })
            .then(data => {
                return this.setState({books: data});
            });
    }

    onSubmit = () => {
        const data = this.formApi.getState();

        if (!data.invalid) {
            const body = {...data.values, user: this.props.user};

            fetch(
                api_url + 'api/give_book',
                {
                    headers: {
                        "X-CSRFToken": cookies.get('csrftoken'),
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    method: 'POST',
                    body: JSON.stringify(body)
                }
            )
                .then(response => {
                    if (response.status === 200) {
                        return this.setState({success: 'Успешно выдана!'});
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
                <Form.Group controlId="book">
                    <Form.Label>Книга</Form.Label>
                    <Select field="book" validate={this.validate_rating} validateOnChange>
                        <Option value="" disabled>
                            Выберите книгу...
                        </Option>

                        {this.state.books ? Object.entries(this.state.books).map((elr, idx) => <Option key={idx}
                                                                               value={elr[1].id}>{elr[1].name}</Option>) : null}

                    </Select>
                </Form.Group>

                <Button type="submit" variant="success" size="lg" block>
                    Выдать книгу
                </Button>
            </IForm>
        </div>;
    }
}

export default GiveBookForm
