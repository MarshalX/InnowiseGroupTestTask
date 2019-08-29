import React from "react";
import {NavDropdown} from 'react-bootstrap'
import {api_url} from "../config";
import {ReactReduxContext} from "react-redux";
import LoginForm from "./LoginForm";


class Me extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        fetch(api_url + 'api/me')
            .then(response => {
                if (response.status !== 200) {
                    return;
                }
                return response.json();
            })
            .then(data => {
                this.props.onSetMe(data);
            });
    };

    render() {
        let state = null;

        return <div>
            <ReactReduxContext.Consumer>
                {({store}) => state = store.getState()}
            </ReactReduxContext.Consumer>
            <NavDropdown title="Dropdown" drop="left">
                {console.log(state)}
                {!state || !state.me ? (
                    <LoginForm/>
                ) : (
                    <div>
                        <NavDropdown.Item href="#">Log out</NavDropdown.Item>
                        <NavDropdown.Divider/>
                    </div>
                )}
            </NavDropdown>
        </div>
    }
}

export default Me
