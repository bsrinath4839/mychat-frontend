import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {


    static propTypes = {
        loggedin: PropTypes.string,
        logout: PropTypes.func.isRequired,
    }

    render() {
       // console.log(this.props.loggedin);
        this.props.logout();

        return (<Redirect to="/login" />)

    }
}
const mapStateToProps = (state) => ({
    loggedin: state.user.loggedin,
})

export default connect(mapStateToProps, { logout })(Logout);