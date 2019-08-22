import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";
import {api_url} from "../config";

const BooksTable = lazy(() => import('../components/BooksTable'));
const BookForm = lazy(() => import('../components/BookForm'));


class Books extends React.Component {
    onClickDelete = (id, event) => {
        fetch(
            api_url + 'api/books/' + id,
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

    render() {
        return <span>
            <h1>Список книг:</h1>
            <DataProvider endpoint={api_url + 'api/books'}
                          render={data => <BooksTable data={data} onDelete={this.onClickDelete}/>}
                          updated={true}/>
            <h1>Добавить новую книгу:</h1>
            <DataProvider endpoint={api_url + 'api/books'}
                          render={data => <BookForm data={data}/>}
                          method='options'/>
        </span>
    }
}

export default Books
