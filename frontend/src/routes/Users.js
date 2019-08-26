import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";
import {api_url} from "../config";

const UsersTable = lazy(() => import('../components/UsersTable'));
const UserForm = lazy(() => import('../components/UserForm'));


class Users extends React.Component {
    onClickDelete = (id, event) => {
        fetch(
            api_url + 'api/user/' + id,
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
        const page = this.props.match.params.page;

        return <div>
            <DataProvider endpoint={api_url + 'api/short_user/?page=' + (page || 1)}
                          render={data => <UsersTable data={data} page={page || 1} onDelete={this.onClickDelete}/>}
                          updated={true}/>
            <UserForm/>
        </div>
    }
}

export default Users
