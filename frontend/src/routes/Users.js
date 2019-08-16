import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";

const UsersTable = lazy(() => import('../components/UsersTable'));

class Users extends React.Component {
    onClickDelete = (id, event) => {
        fetch(
            "http://127.0.0.1:8000/api/short_user/" + id,
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
        return <DataProvider endpoint="http://127.0.0.1:8000/api/short_user/"
                             render={data => <UsersTable data={data} onDelete={this.onClickDelete}/>}
                             updated={true}/>
    }
}

export default Users
