import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";
import {api_url} from "../config";

const BookForm = lazy(() => import('../components/BookForm'));


class BookEdit extends React.Component {
    render() {
        return <span>
            <h1>Редактирование книги:</h1>
            <DataProvider endpoint={api_url + 'api/book/' + this.props.match.params.id}
                          render={data => <BookForm edit={true} initial={data}/>}/>
        </span>
    }
}

export default BookEdit
