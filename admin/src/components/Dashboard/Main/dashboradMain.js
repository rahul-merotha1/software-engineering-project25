import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logoutUser, getAdminDetails } from "../../../redux/actions/loginAction";
import { getDashboardCount } from "../../../redux/actions/dashboardDetails";
import Auth from "../../../services/Auth";
import { HomepageHeader } from "../../basic/header/header";
import logoImg from '../../basic/Homepage/main.jpg';
import { MainCard } from "../Card/card";
import TeacherImg from '../teacher.png';
import StudentImg from '../student.jfif';
import SubjectImg from '../subject.jfif';
import TeacherTable from "../teacherTable/teacherTable";
import SubjectTable from "../subjectTable/subjectTable";
import StudentTable from "../studentTable/studentTable";

const useStyles = (theme) => ({
  logout_btn: {
    marginLeft: 'auto',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
    display: 'block',
    marginTop: 20,
    marginRight: 40,
    '&:hover': {
      backgroundColor: '#c0392b'
    }
  },
  headerMargin: {
    marginTop: 100
  },
  dashboardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: '40px',
    marginTop: 40,
    padding: '0 40px'
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: 10
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'background 0.3s ease',
    '&:hover': {
      backgroundColor: '#2980b9'
    }
  },
  inlineGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

class DashboardMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.expand = "none";
  }

  logout(obj) {
    obj.props.logoutUser();
    obj.forceUpdate();
  }

  handleTableExapand(type) {
    if (type === this.expand) {
      this.expand = "none";
    } else {
      this.expand = type;
    }
    this.forceUpdate();
  }

  render() {
    if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
      return (<Navigate to='/' />);
    } else if (!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
      return (<div></div>);
    } else {
      if (!this.props.dashboardDetails.retrived) {
        this.props.getDashboardCount();
      }

      let x;
      if (this.expand === "Teacher") {
        x = <TeacherTable />;
      } else if (this.expand === "Student") {
        x = <StudentTable />;
      } else if (this.expand === "Subject") {
        x = <SubjectTable />;
      }

      return (
        <div>
          <HomepageHeader title='Examination Portal NITT' img={logoImg} />
          <div className={this.props.classes.headerMargin}></div>
          <button onClick={() => (this.logout(this))} className={this.props.classes.logout_btn}>Logout</button>

          <div className={this.props.classes.dashboardContainer}>
            <div className={this.props.classes.inlineGroup}>
              <MainCard
                title='Teacher'
                value={this.props.dashboardDetails.teacherActive}
                total={this.props.dashboardDetails.teacherActive + this.props.dashboardDetails.teacherBlocked}
                image={TeacherImg}
              />
              <div className={this.props.classes.cardActions}>
                <Link to="/addTeacher" className={this.props.classes.button}>Add Teacher</Link>
                <button onClick={() => (this.handleTableExapand("Teacher"))} className={this.props.classes.button}>Show</button>
              </div>
            </div>

            <div className={this.props.classes.inlineGroup}>
              <MainCard
                title='Student'
                value={this.props.dashboardDetails.studentActive}
                total={this.props.dashboardDetails.studentActive + this.props.dashboardDetails.studentBlocked}
                image={StudentImg}
              />
              <div className={this.props.classes.cardActions}>
                <button onClick={() => (this.handleTableExapand("Student"))} className={this.props.classes.button}>Show</button>
              </div>
            </div>

            <div className={this.props.classes.inlineGroup}>
              <MainCard
                title='Subject'
                value={this.props.dashboardDetails.subjectActive}
                total={this.props.dashboardDetails.subjectActive + this.props.dashboardDetails.subjectBlocked}
                image={SubjectImg}
              />
              <div className={this.props.classes.cardActions}>
                <Link to="/addSubject" className={this.props.classes.button}>Add Subject</Link>
                <button onClick={() => (this.handleTableExapand("Subject"))} className={this.props.classes.button}>Show</button>
              </div>
            </div>
          </div>

          <br />
          {x}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  dashboardDetails: state.dashboardDetails
});

export default withStyles(useStyles)(connect(mapStateToProps, {
  logoutUser,
  getAdminDetails,
  getDashboardCount,
})(DashboardMain));
