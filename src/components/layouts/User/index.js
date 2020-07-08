import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            mobileno: "",
            password: "",
            message: "",
        }
    }

    static propTypes = {
        initiated: PropTypes.string,
        name: PropTypes.string,
        loggedin: PropTypes.string,
    }

    render() {
        if (this.props.loggedin === "true") {
            return (
                <div className="userclass">
                    <h1>Hi, {this.props.name}</h1>
                    <div className="userclass">
                        <Link className="userclasslink" to="/profile" >PROFILE</Link>
                        <Link className="userclasslink" to="/newtx">NEW Tx</Link>
                        <Link className="userclasslink" to="/logout">LOGOUT</Link>
                    </div>
                </div>
            )
        } else {
            return (
                <Redirect to="/" />
            )
        }

    }

}

const mapStateToProps = (state) => ({
    initiated: state.user.initiated,
    name: state.user.name,
    loggedin: state.user.loggedin
});

export default connect(mapStateToProps)(User);