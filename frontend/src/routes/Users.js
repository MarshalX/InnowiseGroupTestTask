import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";

const UsersTable = lazy(() => import('../components/UsersTable'));

class Users extends React.Component {
    constructor(props) {
        super(props);

    }

    onClickDelete = (id, event) => {
        alert('Want to delete: ' + id);
        event.preventDefault();
    };

    render() {
        return <DataProvider endpoint="http://127.0.0.1:8000/api/short_user/"
                             render={data => <UsersTable data={data} onDelete={this.onClickDelete}/>}
                             updated={true}/>
    }
}

export default Users
