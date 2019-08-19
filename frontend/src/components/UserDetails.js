import React from "react";
import PropTypes from "prop-types";
import BooksTable from "./BooksTable";

class UsersDetails extends React.Component {
    propTypes = {
        data: PropTypes.array.isRequired
    };

    render() {
        const data = this.props.data;

        if (data === undefined) {
            return <p>Пользователь не найден</p>
        }

        return <span>
            <h1>Книги пользователя {data.user.username}</h1>
            <BooksTable data={data.books} />
        </span>
    }
}

export default UsersDetails
