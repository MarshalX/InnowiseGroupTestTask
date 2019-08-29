import React from "react";
import PropTypes from "prop-types";
import Table from 'react-bootstrap/Table'
import {Button, ButtonToolbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {api_url} from "../config";


class BooksTable extends React.Component {
    propTypes = {
        data: PropTypes.array.isRequired
    };
    static header = ["Название", "Автор", "Количество страниц", "Рейтинг", "Цена", ""];

    onClickDelete = (id, event) => {
        fetch(
            api_url + 'api/book/' + id,
            {method: 'DELETE'}
        ).then(response => {
            if (response.status !== 204) {
                alert('Произошла ошибка при удалении!')
            } else {
                alert('Успешно удалено!')
            }
        });

        event.preventDefault();
    };

    make_header = (items) => <tr>
        {items.map((elr, idx) => <th key={idx}>{elr}</th>)}
    </tr>;

    make_element = (el) => <tr key={el.id}>
        {Object.entries(el).slice(1, -2).map((elr, idx) => <td key={idx}>{elr[1]}</td>)}
        <td key={Object.entries(el).length}>{(Object.entries(el)[Object.entries(el).length - 2][1] / 100).toFixed(2)}</td>
        <td>
            <ButtonToolbar className="btn-group">
                <LinkContainer to={"/book/" + el.id + "/edit"}>
                    <Button variant="warning">
                        Редактировать
                    </Button>
                </LinkContainer>
                <Button variant="danger" onClick={(e) => this.onClickDelete(el.id, e)}>
                    Удалить
                </Button>
            </ButtonToolbar>
        </td>
    </tr>;

    render() {
        const data = this.props.data;

        return !data || !data.length ? (
            <p>Книг нет</p>
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
