import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Alert from "../../../services/alert";
import Auth from "../../../services/Auth";
import { getAdminDetails } from "../../../redux/actions/loginAction";
import "./AddSubject.css";
import axios from "axios";
import apis from "../../../services/Apis";

class AddSubject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isSubmitting: false
    };
  }

  nameInputHandler = (event) => {
    this.setState({
      ...this.state,
      name: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    
    axios.post(apis.BASE + apis.ADD_SUBJECT, {
      name: this.state.name
    }, {
      headers: {
        'Authorization': `Bearer ${Auth.retriveToken()}`
      }
    }).then(response => {
      this.setState({ isSubmitting: false });
      if(response.data.success) {
        Alert('info','Success',response.data.message);
        this.setState({ name: "" }); // Clear input on success
      } else {
        Alert('error','Failed',response.data.message);
      }
    }).catch(() => {
      this.setState({ isSubmitting: false });
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
      <div className="add-subject-container">
        <form onSubmit={this.handleSubmit} className="form-class">
          <h2 className="form-title">Add New Subject</h2>
          <div className="form-group">
            <label className="input-label">Subject Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.nameInputHandler}
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
              {this.state.isSubmitting ? 'Adding...' : 'Add Subject'}
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
})(AddSubject);