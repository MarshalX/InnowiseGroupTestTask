import React from "react";
import PropTypes from "prop-types";
import {ConnectedBooksTable} from '../containers/Connections'
import BookForm from "./BookForm";
import GiveBookForm from "./GiveBookForm";


class UsersDetails extends React.Component {
    propTypes = {
        data: PropTypes.array.isRequired
    };

    render() {
        const data = this.props.data;
        const me = this.props.me;

        if (data === undefined) {
            return <p>Пользователь не найден</p>
        }

        return <span>
            <h1>Книги пользователя {data.username}:</h1>
            <ConnectedBooksTable data={data.books}/>
            {me !== null && !me.is_staff ? null : (
                <div>
                    <h1>Выдать существующую книгу пользователю:</h1>
                    <GiveBookForm user={data.id}/>
                    <h1>Добавить новую книгу пользователю:</h1>
                    <BookForm user={data.id}/>
                </div>
            )}

        </span>
    }
}

export default UsersDetails
