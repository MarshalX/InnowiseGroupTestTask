import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";
import {api_url} from "../config";
import {ConnectedBooksTable} from '../containers/Connections'

const BookForm = lazy(() => import('../components/BookForm'));


class Books extends React.Component {
    render() {
        const me = this.props.me;

        return <span>
            <h1>Список книг:</h1>
            <DataProvider endpoint={api_url + 'api/book'}
                          render={data => <ConnectedBooksTable data={data}/>}
                          updated={true}/>
            {me !== null && !me.is_staff ? null : (
                <div>
                    <h1>Добавить новую книгу:</h1>
                    <BookForm/>
                </div>
            )}
        </span>
    }
}

export default Books
