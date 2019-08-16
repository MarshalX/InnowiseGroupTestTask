import React, {lazy} from "react";
import DataProvider from "../components/DataProvider";

const BooksTable = lazy(() => import('../components/BooksTable'));

class Books extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <DataProvider endpoint="http://127.0.0.1:8000/api/books/"
                             render={data => <BooksTable data={data}/>}
                             updated={true}/>
    }
}

export default Books
