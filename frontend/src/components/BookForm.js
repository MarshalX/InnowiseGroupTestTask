import React from "react";

import Form from "react-jsonschema-form";
import PropTypes from "prop-types";


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
        fetch('http://127.0.0.1:8000/api/books/' + id)
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
