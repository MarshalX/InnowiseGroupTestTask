import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";
import {api_url} from "../config";

const BookForm = lazy(() => import('../components/BookForm'));


class BookEdit extends React.Component {
    render() {
        return <span>
            <h1>Редактирование книги:</h1>
            <DataProvider endpoint={api_url + 'api/books'}
                          render={data => <BookForm data={data} initial={this.props.match.params.id}/>}
                          method='options'/>
        </span>
    }
}

export default BookEdit
