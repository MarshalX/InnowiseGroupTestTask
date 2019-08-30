import React from "react";
import {NavDropdown} from 'react-bootstrap'
import {api_url} from "../config";
import LoginForm from "./LoginForm";


class Me extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            me: null
        }
    }

    componentDidMount = () => {
        this.getMe();
    };

    getMe = () => {
        fetch(api_url + 'api/me/', {credentials: "include"})
            .then(response => {
                if (response.status !== 200) {
                    return;
                }
                return response.json();
            })
            .then(data => {
                this.props.onSetMe(data);
                this.setState({me: data})
            });
    };

    logout = () => {
        fetch(api_url + 'api/logout/', {credentials: "include"})
            .then(() => {
                this.getMe()
            })
    };

    render() {
        const me = this.state.me;

        return <div>
            <NavDropdown title={!me ? 'Гость' : me.username} drop="left">
                {!me ? (
                    <LoginForm onLogin={() => {this.getMe()}}/>
                ) : (
                    <div>
                        <NavDropdown.Item href="#">Мой аккаунт</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item onClick={() => {this.logout()}}>Выход</NavDropdown.Item>
                    </div>
                )}
            </NavDropdown>
        </div>
    }
}

export default Me
