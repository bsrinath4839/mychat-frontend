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
        // console.log("txs",this.props.txs);

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
                            <table width="80%">
                                <caption>Transactions Details : RECIEVED</caption>
                                <tbody>
                                    <tr>
                                        <td>S.No</td>
                                        <th> : </th>
                                        <td>NAME</td>
                                        <td>MOBILE No.</td>
                                        <td>SENT To </td>
                                        <td>RECIEVED From </td>
                                        <td>Date of Tx</td>
                                    </tr>

                                    {this.props.txs.map((tx, index) => (
                                        tx.from === null ?
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <th>:</th>
                                                <td>{tx.to.name} </td>
                                                <td>{tx.to.mobileno}</td>
                                                <td>{tx.amount}</td>
                                                <td> - </td>
                                                <td>{tx.txat}</td>
                                            </tr>
                                            :

                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <th>:</th>
                                                <td>{tx.from.name} </td>
                                                <td>{tx.from.mobileno}</td>
                                                <td> - </td>
                                                <td>{tx.amount}</td>
                                                <td>{tx.txat}</td>
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