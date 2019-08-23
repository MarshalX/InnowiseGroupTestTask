import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";
import {api_url} from "../config";

const UserForm = lazy(() => import('../components/UserForm'));


class UserEdit extends React.Component {
    render() {
        return <span>
            <h1>Редактирование пользователя:</h1>
            <DataProvider endpoint={api_url + 'api/user/' + this.props.match.params.id}
                          render={data => <UserForm edit={true} initial={data}/>} />
        </span>
    }
}

export default UserEdit
