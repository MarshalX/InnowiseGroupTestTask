import React from "react";
import PropTypes from "prop-types";
import Table from 'react-bootstrap/Table'


class BooksTable extends React.Component {
    propTypes = {
        data: PropTypes.array.isRequired,
    };
    static header = ["Название", "Автор", "Дата издания", "Количество страниц"];

    make_header = (items) => <tr>
        {items.map((elr, idx) => <th key={idx}>{elr}</th>)}
    </tr>;

    make_element = (el) => <tr key={el.id}>
        {Object.entries(el).slice(1).map((elr, idx) => <td key={idx}>{elr[1]}</td>)}
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
