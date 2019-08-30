import React from "react";
import DataProvider from "../components/DataProvider";
import {api_url} from "../config";
import {ConnectedUsersDetails} from '../containers/Connections';


class UserPage extends React.Component {
    render() {
        return <DataProvider endpoint={api_url + 'api/user/' + this.props.match.params.id}
                             render={data => <ConnectedUsersDetails data={data}/>} updated={true}/>
    }
}

export default UserPage
