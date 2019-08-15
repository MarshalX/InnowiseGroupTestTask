import React from "react";
import DataProvider from "../components/DataProvider";
import Table from "../components/Table";

const Home = () => <DataProvider endpoint="http://127.0.0.1:8000/api/books/"
                                 render={data => <Table data={data} />}
                                 updated={true} />;


export default Home
