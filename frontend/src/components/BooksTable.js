import React from "react";
import PropTypes from "prop-types";
import Table from 'react-bootstrap/Table'
import {Button, ButtonToolbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";


class BooksTable extends React.Component {
    propTypes = {
        data: PropTypes.array.isRequired,
        onDelete: PropTypes.func.isRequired
    };
    static header = ["Название", "Автор", "Количество страниц", "Рейтинг", "Цена", ""];

    make_header = (items) => <tr>
        {items.map((elr, idx) => <th key={idx}>{elr}</th>)}
    </tr>;

    make_element = (el) => <tr key={el.id}>
        {Object.entries(el).slice(1, -1).map((elr, idx) => <td key={idx}>{elr[1]}</td>)}
        <td key={Object.entries(el).length}>{(Object.entries(el).pop()[1] / 100).toFixed(2)}</td>
        <td>
            <ButtonToolbar className="btn-group">
                <LinkContainer to={"/book/" + el.id + "/edit"}>
                    <Button variant="warning">
                        Редактировать
                    </Button>
                </LinkContainer>
                <Button variant="danger" onClick={(e) => this.props.onDelete(el.id, e)}>
                    Удалить
                </Button>
            </ButtonToolbar>
        </td>
    </tr>;

    render() {
        const data = this.props.data;

        return !data.length ? (
            <p>У пользователя книг нет</p>
        ) : (
            <Table hover={true}>
                <thead className="thead-dark">
                {this.make_header(BooksTable.header)}
                </thead>
                <tbody>
                {data.map(el => this.make_element(el))}
                </tbody>
            </Table>
        );
    }
}

export default BooksTable;
