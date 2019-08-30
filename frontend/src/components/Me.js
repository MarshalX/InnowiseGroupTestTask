import React from "react";
import {NavDropdown} from 'react-bootstrap'
import {api_url} from "../config";
import LoginForm from "./LoginForm";


class Me extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.getMe();
    };

    getMe = () => {
        fetch(api_url + 'api/me/', {credentials: "include"})
            .then(response => {
                if (response.status === 401) {
                    return this.props.onSetMe();
                }
                if (response.status !== 200) {
                    return;
                }
                return response.json();
            })
            .then(data => {
                this.props.onSetMe(data);
            });
    };

    logout = () => {
        fetch(api_url + 'api/logout/', {credentials: "include"})
            .then(() => {
                this.getMe()
            })
    };

    isEmpty = (arg) => {
        for(var item in arg) {
            return false;
        }
        return true;
    };

    render() {
        const me = this.props.me;

        return <div>
            <NavDropdown title={this.isEmpty(me) ? 'Гость' : me.username} drop="left">
                {this.isEmpty(me) ? (
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
