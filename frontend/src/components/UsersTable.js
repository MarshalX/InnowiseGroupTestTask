import React from "react";
import PropTypes from "prop-types";
import {LinkContainer} from 'react-router-bootstrap'
import Table from 'react-bootstrap/Table'
import {Button, ButtonToolbar} from "react-bootstrap";

const withoutId = (elr, idx) => {
    if (idx !== 0) {
        return <td key={idx}>{elr[1]}</td>
    }
};

class UsersTable extends React.Component {
    propTypes = {
        data: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

    }

    render() {
        return !this.props.data.length ? (
            <p>Nothing to show</p>
        ) : (
            <Table hover={true}>
                <thead className="thead-dark">
                <tr>
                    {["Аватарка", "Логин", "Количество книг", ""].map((elr, idx) => <th key={idx}>{elr}</th>)}
                </tr>
                </thead>
                <tbody>
                {this.props.data.map(el => (
                    <LinkContainer to={"/user/" + el.id}>
                        <tr key={el.id}>
                            {Object.entries(el).map((elr, idx) => withoutId(elr, idx))}
                            <td key={"action" + el.id}>
                                <ButtonToolbar className="btn-group">
                                    <LinkContainer to={"/user/" + el.id + "/edit"}>
                                        <Button variant="warning">
                                            Редактировать
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" onClick={this.props.onDelete.bind(this, el.id)}>
                                        Удалить
                                    </Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    </LinkContainer>
                ))}
                </tbody>
            </Table>
        )
    }
}

export default UsersTable;
