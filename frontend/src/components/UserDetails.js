import React from "react";
import PropTypes from "prop-types";
import BooksTable from "./BooksTable";

class UsersDetails extends React.Component {
    propTypes = {
        data: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

    }

    render() {
        if (this.props.data === undefined) {
            return <p>Пользователь не найден</p>
        }

        return <span>
            <h1>Книги пользователя {this.props.data.user.username}</h1>
            <BooksTable data={this.props.data.books} />
        </span>
    }
}

export default UsersDetails;
