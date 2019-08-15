import React from "react";
import PropTypes from "prop-types";
// import key from "weak-key";

const Table = ({ data }) =>
    !data.length ? (
        <p>Nothing to show</p>
    ) : (
        <table className="table">
            <thead className="thead-dark">
            <tr>
                {Object.entries(data[0]).map((elr, idx) => <th key={idx}>{elr[0]}</th>)}
            </tr>
            </thead>
            <tbody>
            {data.map(el => (
                <tr key={el.id}>
                    {Object.entries(el).map((elr, idx) => <td key={idx}>{elr[1]}</td>)}
                </tr>
            ))}
            </tbody>
        </table>
    );

Table.propTypes = {
    data: PropTypes.array.isRequired
};

export default Table;
