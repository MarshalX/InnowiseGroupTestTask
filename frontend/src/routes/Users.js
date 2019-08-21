import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";
import {api_url} from "../config";

const UsersTable = lazy(() => import('../components/UsersTable'));


class Users extends React.Component {
    onClickDelete = (id, event) => {
        fetch(
            api_url + 'api/short_user/' + id,
            {method: 'DELETE'}
        ).then(response => {
            if (response.status !== 204) {
                alert('Произошла ошибка при удалении! Возможно, пользователь не вернул все книги в библиотеку!')
            } else {
                alert('Успешно удалено!')
            }
        });

        event.preventDefault();
    };

    render() {
        return <DataProvider endpoint={api_url + 'api/short_user/'}
                             render={data => <UsersTable data={data} onDelete={this.onClickDelete}/>}
                             updated={true}/>
    }
}

export default Users
