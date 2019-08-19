import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";

const UserDetails = lazy(() => import('../components/UserDetails'));

class UserPage extends React.Component {
    render() {
        return <DataProvider endpoint={"http://127.0.0.1:8000/api/user/" + this.props.match.params.id}
                             render={data => <UserDetails data={data}/>}
                             updated={true}/>
    }
}

export default UserPage
