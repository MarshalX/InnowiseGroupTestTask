import React from "react";
import DataProvider from "./DataProvider";
import Table from "./Table";

const App = () => (
    <DataProvider endpoint="api/books/"
        render={data => <Table data={data} />} updated={true} />
);

export default App
