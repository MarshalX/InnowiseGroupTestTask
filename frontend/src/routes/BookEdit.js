import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";


const BookForm = lazy(() => import('../components/BookForm'));


class BookEdit extends React.Component {
    render() {
        return <span>
            <h1>Редактирование книги:</h1>
            <DataProvider endpoint="http://127.0.0.1:8000/api/books/"
                          render={data => <BookForm data={data} initial={this.props.match.params.id}/>}
                          method='options'/>
        </span>
    }
}

export default BookEdit
