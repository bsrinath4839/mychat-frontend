import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { searchUserForTo } from '../../actions';
import { connect } from 'react-redux';

class NewTx extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to: "",
            amount: "",
            msg: "",
        }
    }

    static propTypes = {
        searchUserForTo: PropTypes.func.isRequired,
        usersto: PropTypes.array,
        error: PropTypes.string,
    }

    searchPerson(e) {
        this.setState({
            to: e.target.value
        })
        this.props.searchUserForTo(e.target.value);
    }

    render() {
        return (
            <div>
                <input type="number" value={this.state.to} placeholder="Enter mobile Number" className="tosearch" name="tosearch" id="tosearch" onChange={(e) => this.searchPerson(e)} />
                {
                    this.state.to.length > 3 ?
                        this.props.usersto.length > 0 ?
                            <table width="100%" >
                                <tbody>
                                    {this.props.usersto.map((users, index) => (
                                        <tr key={index}>
                                            <th>
                                                <Link to={{
                                                    pathname: "/select/user",
                                                    state: { sendto: users }
                                                }}>
                                                    {users.name.toUpperCase()}
                                                </Link>
                                            </th>
                                            <th>
                                                <Link to={{
                                                    pathname: "/select/user",
                                                    state: { sendto: users }
                                                }}>
                                                    {users.mobileno}
                                                </Link>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : <table width="100%">
                                <tbody>
                                    <tr>
                                        <th colSpan="2">
                                            No Users Found...
                                    </th>
                                    </tr>
                                </tbody>
                            </table>
                        : null
                }

                <Link to="/">Go to HOME</Link>
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    usersto: state.user.usersto,
    error: state.user.error,
})

export default connect(mapStateToProps, { searchUserForTo })(NewTx);