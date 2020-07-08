import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { loaduser } from '../../actions'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static propTypes = {
        loggedin: PropTypes.string,
        token: PropTypes.string,
        name: PropTypes.string,
        mobileno: PropTypes.string,
        email: PropTypes.string,
        txs: PropTypes.array,
        loaduser: PropTypes.func.isRequired
    }

    loadUser() {

        // console.log("props",this.props);

        this.props.loaduser(this.props.token);
    }

    render() {
        //console.log("mobile",this.props.mobileno);

        if (this.props.loggedin === "true") {
            if (this.props.mobileno === "") {
                this.loadUser();
            } else {
                return (
                    <div>
                        <table>
                            <caption>Your Details</caption>
                            <tbody>
                                <tr>
                                    <td>
                                        Name
                                    </td>
                                    <th>:</th>
                                    <td>
                                        {this.props.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        E-Mail
                                    </td>
                                    <th>:</th>
                                    <td>
                                        {this.props.email}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Mobile No.
                                    </td>
                                    <th>:</th>
                                    <td>
                                        {this.props.mobileno}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {this.props.txs.length === 0 ?
                            <p>
                                You don't have any transactions...!!
                            </p> :
                            <table>
                                <caption>Transactions Details</caption>
                                <tbody>
                                    {this.props.txs.map((tx, index) => (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <th>:</th>
                                            <td>{tx.to} </td>
                                            <td>{tx.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                        <Link to="/">Go to HOME</Link>
                    </div>
                );
            }
        } else {
            return (
                <Redirect to="/login" />
            );
        }
        return (null)
    }
}

const mapStateToProps = (state) => ({
    loggedin: state.user.loggedin,
    token: state.user.token,
    name: state.user.name,
    mobileno: state.user.mobileno,
    email: state.user.email,
    txs: state.user.txs
});

export default connect(mapStateToProps, { loaduser })(Profile);