import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Alert from "../../../services/alert";
import Auth from "../../../services/Auth";
import { getAdminDetails } from "../../../redux/actions/loginAction";
import "./AddTeacher.css";
import axios from "axios";
import apis from "../../../services/Apis";

class AddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      isSubmitting: false
    };
  }

  // ... (keep all your existing handler methods exactly the same)

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.confirmpassword !== this.state.password) {
      Alert('error','Invalid Input','Confirm Password does not match');
      return;
    }
    
    this.setState({ isSubmitting: true });
    
    axios.post(apis.BASE + apis.ADD_TEACHER, {
      username: this.state.name,
      email: this.state.email,
      password: this.state.password
    }, {
      headers: {
        'Authorization': `Bearer ${Auth.retriveToken()}`
      }
    }).then(response => {
      this.setState({ isSubmitting: false });
      if(response.data.success) {
        Alert('info','Success',response.data.message);
        this.setState({
          name: "",
          email: "",
          password: "",
          confirmpassword: ""
        });
      } else {
        Alert('error','Failed',response.data.message);
      }
    }).catch(error => {
      this.setState({ isSubmitting: false });
      Alert('error','Error',error.response?.data?.message || 'Something went wrong');
    });
  };

  render() {
    if(!Auth.retriveToken() || Auth.retriveToken()==='undefined') {
      return <Navigate to='/'/>;
    } else if(!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
      return <div className="loading-placeholder"></div>;
    }
    
    return (
      <div className="add-teacher-container">
        <form onSubmit={this.handleSubmit} className="form-class">
          <h2 className="form-title">Add New Teacher</h2>
          
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.nameInputHandler}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={this.state.email}
              onChange={this.emailInputHandler}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.passwordInputHandler}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              value={this.state.confirmpassword}
              onChange={this.confirmInputHandler}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={this.state.isSubmitting}
            >
              {this.state.isSubmitting ? 'Adding...' : 'Add Teacher'}
            </button>
            <Link to="/home" className="back-btn">
              Back to Dashboard
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {
  getAdminDetails
})(AddTeacher);