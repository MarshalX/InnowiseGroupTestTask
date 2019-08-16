import React from "react";
import PropTypes from "prop-types";
import Table from 'react-bootstrap/Table'

const withoutId = (elr, idx) => {
    if (idx !== 0) {
        return <td key={idx}>{elr[1]}</td>
    }
};

const BooksTable = ({ data }) =>
    !data.length ? (
        <p>У пользователя книг нет</p>
    ) : (
        <Table hover={true}>
            <thead className="thead-dark">
            <tr>
                {["Название", "Автор", "Дата издания", "Количество страниц"].map((elr, idx) => <th key={idx}>{elr}</th>)}
            </tr>
            </thead>
            <tbody>
            {data.map(el => (
                <tr key={el.id}>
                    {Object.entries(el).map((elr, idx) => withoutId(elr, idx))}
                </tr>
            ))}
            </tbody>
        </Table>
    );

Table.propTypes = {
    data: PropTypes.array.isRequired
};

export default BooksTable;
