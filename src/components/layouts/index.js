import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        loggedin: PropTypes.string
    }

    render() {
        if (this.props.loggedin) {
            return (
                <Redirect to="/user" />
            );
        } else {
            return (
                <Redirect to="/login" />
            );
        }
    }
}

const mapStateToProps = (state) => ({
    loggedin: state.user.loggedin
})

export default connect(mapStateToProps)(Index);