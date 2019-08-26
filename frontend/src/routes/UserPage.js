import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";
import {api_url} from "../config";

const UserDetails = lazy(() => import('../components/UserDetails'));

class UserPage extends React.Component {
    render() {
        return <DataProvider endpoint={api_url + 'api/user/' + this.props.match.params.id}
                             render={data => <UserDetails data={data}/>} updated={true}/>
    }
}

export default UserPage
