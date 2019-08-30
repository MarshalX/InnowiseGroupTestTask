import React from "react";
import PropTypes from "prop-types";
import {LinkContainer} from 'react-router-bootstrap'
import Table from 'react-bootstrap/Table'
import {Button, ButtonToolbar} from "react-bootstrap";
import Avatar from './Avatar'


class UsersTable extends React.Component {
    propTypes = {
        data: PropTypes.array.isRequired,
        onDelete: PropTypes.func.isRequired
    };
    static header = ["Аватарка", "Логин", "Количество книг", "Средняя цена всех книг", ""];

    make_header = (items) => <tr>
        {items.map((elr, idx) => <th key={idx}>{elr}</th>)}
    </tr>;

    make_element = (el) => <LinkContainer to={"/user/" + el.id}>
        <tr key={el.id}>
            <Avatar data={Object.entries(el)[1]}/>
            {Object.entries(el).slice(2, -1).map((elr, idx) => <td key={idx}>{elr[1]}</td>)}
            <td key={Object.entries(el).length}>{(Object.entries(el).pop()[1] / 100).toFixed(2)}</td>
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
        const page = this.props.page;

        return !data || !data.results.length ? (
            <p>Нечего показывать</p>
        ) : (
            <span>
                <Table hover={true} className="mb-3">
                    <thead className="thead-dark">
                    {this.make_header(UsersTable.header)}
                    </thead>
                    <tbody>
                    {data.results.map(el => this.make_element(el))}
                    </tbody>
                </Table>
                <ButtonToolbar className="btn-group mb-3">
                    {data.previous ? <LinkContainer to={"/users/" + (parseInt(page) - 1)}>
                        <Button variant="outline-primary">
                            ← Туда
                        </Button>
                    </LinkContainer> : null}
                    {data.next ? <LinkContainer to={"/users/" + (parseInt(page) + 1)}>
                        <Button variant="outline-primary">
                            Сюда →
                        </Button>
                    </LinkContainer> : null}
                </ButtonToolbar>
            </span>
        )
    }
}

export default UsersTable
