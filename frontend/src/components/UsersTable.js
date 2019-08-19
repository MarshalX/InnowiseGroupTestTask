import React from "react";
import PropTypes from "prop-types";
import {LinkContainer} from 'react-router-bootstrap'
import Table from 'react-bootstrap/Table'
import {Button, ButtonToolbar} from "react-bootstrap";


class UsersTable extends React.Component {
    propTypes = {
        data: PropTypes.array.isRequired,
        onDelete: PropTypes.func.isRequired
    };
    static header = ["Аватарка", "Логин", "Количество книг", ""];

    make_header = (items) => <tr>
        {items.map((elr, idx) => <th key={idx}>{elr}</th>)}
    </tr>;

    make_element = (el) => <LinkContainer to={"/user/" + el.id}>
        <tr key={el.id}>
            {Object.entries(el).slice(1).map((elr, idx) => <td key={idx}>{elr[1]}</td>)}
            <td>
                <ButtonToolbar className="btn-group">
                    <LinkContainer to={"/user/" + el.id + "/edit"}>
                        <Button variant="warning">
                            Редактировать
                        </Button>
                    </LinkContainer>
                    <Button variant="danger" onClick={(e) => this.props.onDelete(el.id, e)}>
                        Удалить
                    </Button>
                </ButtonToolbar>
            </td>
        </tr>
    </LinkContainer>;

    render() {
        const data = this.props.data;

        return !data.length ? (
            <p>Нечего показывать</p>
        ) : (
            <Table hover={true}>
                <thead className="thead-dark">
                {this.make_header(UsersTable.header)}
                </thead>
                <tbody>
                {data.map(el => this.make_element(el))}
                </tbody>
            </Table>
        )
    }
}

export default UsersTable
