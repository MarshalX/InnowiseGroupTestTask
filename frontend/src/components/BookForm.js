import React from "react";

import Form from "react-jsonschema-form";
import PropTypes from "prop-types";

import {api_url} from "../config";


class BookForm extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            data: props.data
        };
    }

    getInitialData = (id) =>
        fetch(api_url + 'api/books/' + id)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({initialData: data});
            });

    render() {
        if (this.props.initial && !this.state.initialData)
            this.getInitialData(this.props.initial);

        return <Form formData={this.state.initialData} uiSchema={this.state.data.ui} schema={this.state.data.schema}/>
    }
}

export default BookForm
