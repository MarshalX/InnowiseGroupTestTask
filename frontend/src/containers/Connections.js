import {connect} from 'react-redux';
import BooksTable from '../components/BooksTable';
import MainNavbar from '../components/MainNavbar';
import UsersDetails from '../components/UserDetails';
import Books from '../routes/Books';
import Home from '../routes/Home';


const mapStateToProps = state => ({
    me: state.MeReducer.me,
});


export const ConnectedBooksTable = connect(
    mapStateToProps,
    null
)(BooksTable);

export const ConnectedMainNavbar = connect(
    mapStateToProps,
    null
)(MainNavbar);

export const ConnectedUsersDetails = connect(
    mapStateToProps,
    null
)(UsersDetails);

export const ConnectedBooks = connect(
    mapStateToProps,
    null
)(Books);

export const ConnectedHome = connect(
    mapStateToProps,
    null
)(Home);
