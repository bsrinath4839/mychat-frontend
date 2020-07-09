import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userlogin } from '../../actions'
import { Link, Redirect } from 'react-router-dom';

class Login extends React.Component {
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
        loggedin: PropTypes.string,
        userlogin: PropTypes.func.isRequired,
    }

    setChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            message: ""
        })
    }

    login(e) {
        e.preventDefault();
        const { email, mobileno, password } = this.state;
       // console.log({ email, mobileno, password });

        if (email === "" || mobileno === "" || password === "") {
            this.setState({
                message: "Fill All the Fields"
            })
        } else {
            this.props.userlogin(email, mobileno, password)
        }
    }

    render() {
       // console.log(this.props.loggedin);
        
        if (this.props.initiated === "true" && this.props.loggedin === "false") {
            return (
                <div>
                    <p>Loading...!</p>
                </div>
            )
        } else if (this.props.initiated === "false" && this.props.loggedin === null) {
            return (
                <div className="login">
                    <table border="1" id="loginTable">
                        <tbody>
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
                                    <button type="submit" onClick={(event) => this.login(event)} disabled={this.state.isDisabled}>SUBMIT</button>
                                </th>
                            </tr>
                            <tr>
                                <th colSpan="3">
                                    <Link to="/signup">SIGN-UP</Link>
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
        } else if(this.props.loggedin === "true"){
            return (
                <Redirect to="/user" />
            )
        }else{
            return(
                <Redirect to="/" />
            )
        }
    }

}

const mapStateToProps = (state) => ({
    initiated: state.user.initiated,
    loggedin: state.user.loggedin
});

export default connect(mapStateToProps, { userlogin })(Login);