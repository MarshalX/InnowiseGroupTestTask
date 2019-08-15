import DataProvider from "../components/DataProvider";
import Table from "../components/Table";

const Home = () => (
    <DataProvider endpoint="api/books/"
                  render={data => <Table data={data} />}
                  updated={true} />
);

export default Home
