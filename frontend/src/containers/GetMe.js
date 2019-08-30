import {connect} from 'react-redux';
import {setMe} from '../actions';
import Me from '../components/Me';


const mapStateToProps = state => ({
    me: state.MeReducer.me,
});

const mapDispatchToProps = dispatch => {
    return {
        onSetMe: me => {
            dispatch(setMe(me));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Me);
