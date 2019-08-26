import React from "react";
import PropTypes from "prop-types";
import BooksTable from "./BooksTable";
import BookForm from "./BookForm";

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
            <h1>Книги пользователя {data.username}:</h1>
            <BooksTable data={data.books} />
            <h1>Добавить новую книгу пользователю:</h1>
            <BookForm user={data.id} />
        </span>
    }
}

export default UsersDetails
