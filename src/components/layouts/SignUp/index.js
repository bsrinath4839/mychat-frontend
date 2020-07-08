import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { usersignup } from '../../actions'
import { Redirect } from 'react-router-dom';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            mobileno: "",
            password: "",
            message: "",
        }
    }

    static propTypes = {
        initiated: PropTypes.string,
        signedup : PropTypes.string,
        usersignup: PropTypes.func.isRequired,
    }

    setChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            message: ""
        })
    }

    signup(e) {
        e.preventDefault();
        const { name, email, mobileno, password } = this.state;
        //console.log({ name, email, mobileno, password });

        if (email === "" || mobileno === "" || password === "") {
            this.setState({
                message: "Fill All the Fields"
            })
        } else {
            this.props.usersignup(name, email, mobileno, password)
        }
    }

    render() {
        if (this.props.initiated === "true" && this.props.signedup === "false") {
            return (
                <div>
                    <p>Loading...!</p>
                </div>
            )
        } else if (this.props.initiated === "false" && this.props.signedup === "false") {
            return (
                <div className="signup">
                    <table border="1" id="signupTable">
                        <tbody>
                            <tr>
                                <td>
                                    <label>Name</label>
                                </td>
                                <th>
                                    :
                                </th>
                                <td>
                                    <input type="text" name="name" className="name" id="name" value={this.state.name} onChange={(event) => this.setChange(event)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Email</label>
                                </td>
                                <th>
                                    :
                                </th>
                                <td>
                                    <input type="email" name="email" className="email" id="email" value={this.state.email} onChange={(event) => this.setChange(event)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Mobile No</label>
                                </td>
                                <th>
                                    :
                        </th>
                                <td>
                                    <input type="text" name="mobileno" className="mobileno" id="mobileno" value={this.state.mobileno} onChange={(event) => this.setChange(event)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Password</label>
                                </td>
                                <th>
                                    :
                        </th>
                                <td>
                                    <input type="password" name="password" className="password" id="password" value={this.state.password} onChange={(event) => this.setChange(event)} />
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="3">
                                    <button type="submit" onClick={(event) => this.signup(event)} disabled={this.state.isDisabled}>SUBMIT</button>
                                </th>
                            </tr>
                            <tr>
                                <th colSpan="3">
                                    <p>{this.state.message}</p>
                                </th>
                            </tr>
                        </tbody>
                    </table>

                </div>
            );
        } else {
            return (
                <Redirect to="/" />
            );
        }
    }

}

const mapStateToProps = (state) => ({
    initiated: state.user.initiated,
    signedup : state.user.signedup
});

export default connect(mapStateToProps, { usersignup })(Signup);