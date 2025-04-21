import React from "react";
import Alert from "../../../services/alert";
import apis from '../../../services/Apis';
import axios from "axios";
import { connect } from "react-redux";
import './registerform.css';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  nameInputHandler = (event) => {
    this.setState({ name: event.target.value });
  }

  emailInputHandler = (event) => {
    this.setState({ email: event.target.value });
  }

  passwordInputHandler = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const response = await axios.post(apis.BASE + apis.REGISTER_USER, { name, email, password });

    if (response.data.success) {
      Alert("info", "Success", response.data.message);
    } else {
      Alert("error", "Failure", response.data.message);
    }
  }

  render() {
    return (
      <div className="register-box">
        <h2>🎓 Student Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.nameInputHandler}
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label>Email Address</label>
            <input
              type="email"
              value={this.state.email}
              onChange={this.emailInputHandler}
              placeholder="student@example.com"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.passwordInputHandler}
              placeholder="••••••••"
              required
            />
          </div>
          <button className="button" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(RegisterForm);
