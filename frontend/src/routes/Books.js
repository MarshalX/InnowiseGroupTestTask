import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";
import {api_url} from "../config";

const BooksTable = lazy(() => import('../components/BooksTable'));
const BookForm = lazy(() => import('../components/BookForm'));


class Books extends React.Component {
    render() {
        return <span>
            <h1>Список книг:</h1>
            <DataProvider endpoint={api_url + 'api/books'}
                          render={data => <BooksTable data={data}/>}
                          updated={true}/>
            <h1>Добавить новую книгу:</h1>
            <BookForm />
        </span>
    }
}

export default Books
