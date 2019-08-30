import React from "react";
import UserPage from "./UserPage";


class Books extends React.Component {
    isEmpty = (arg) => {
        for(var item in arg) {
            return false;
        }
        return true;
    };

    render() {
        const me = this.props.me;

        return <span>
            {me !== null && !me.is_staff ? null : (
                <div>
                    <h1>Товарищ администратор, давайте отнимать книги!</h1>
                </div>
            )}
            {this.isEmpty(me) ? <h1>Не хотите ли пройти авторизацию?</h1> : (
                <UserPage match={{params: {id: me.id}}}/>
            )}
        </span>
    }
}

export default Books
