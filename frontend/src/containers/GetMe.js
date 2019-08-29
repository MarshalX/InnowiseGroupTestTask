import {connect} from 'react-redux';
import {setMe} from '../actions';
import Me from '../components/Me';


const mapDispatchToProps = dispatch => {
    return {
        onSetMe: me => {
            dispatch(setMe(me));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Me);
