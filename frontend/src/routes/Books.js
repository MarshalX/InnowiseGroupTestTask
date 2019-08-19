import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";


const BooksTable = lazy(() => import('../components/BooksTable'));
const BookForm = lazy(() => import('../components/BookForm'));


class Books extends React.Component {
    render() {
        return <span>
            <h1>Список книг:</h1>
            <DataProvider endpoint="http://127.0.0.1:8000/api/books/"
                          render={data => <BooksTable data={data}/>}
                          updated={true}/>
            <h1>Добавить новую книгу:</h1>
            <DataProvider endpoint="http://127.0.0.1:8000/api/books/"
                          render={data => <BookForm data={data}/>}
                          method='options'/>
        </span>
    }
}

export default Books
