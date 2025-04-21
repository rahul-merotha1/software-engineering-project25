import { Button, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AlertBox from '../../atoms/Alertbox/AlertBox';
import LoginForm from '../../templates/loginForm/loginForm';
import Auth from '../../../helper/Auth';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = (theme) => ({
  addHeight: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    fontWeight: 800,
    letterSpacing: 1.5,
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
  },
  main: {
    textAlign: 'center',
    padding: '5% 20px',
    margin: 'auto',
    maxWidth: '500px',
    width: '90%'
  },
  appbar: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
  },
  endtestbtn: {
    background: 'linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)',
    border: 0,
    borderRadius: 25,
    boxShadow: '0 4px 15px rgba(255, 117, 140, 0.4)',
    color: 'white',
    height: 42,
    padding: '0 30px',
    fontWeight: 600,
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(255, 117, 140, 0.6)'
    }
  },
  loginContainer: {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh'
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    boxShadow: '0 15px 35px rgba(50,50,93,0.1), 0 5px 15px rgba(0,0,0,0.07)',
    padding: '40px 30px',
    marginTop: '30px',
    border: '1px solid rgba(255,255,255,0.3)'
  },
  decorativeElement: {
    height: 4,
    background: 'linear-gradient(to right, #667eea 0%, #764ba2 100%)',
    width: '80px',
    margin: '20px auto',
    borderRadius: 2
  }
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotoStudentRegister: false
    }
  }

  onStudentRegisterClick() {
    this.setState({
      ...this.state,
      gotoStudentRegister: true
    })
  }

  render() {
    if (this.state.gotoStudentRegister) {
      return (<Navigate to='/studentRegisterPage' />)
    }
    if (this.props.user.isLoggedIn) {
      if (this.props.user.userDetails.type === 'TEACHER')
        return (<Navigate to='/homeTeacher' />);
      else
        return (<Navigate to='/homeStudent' />);
    } else if (Auth.retriveToken() && Auth.retriveToken() !== 'undefined') {
      return (<Navigate to='/homeStudent' />);
    }
    else {
      return (
        <div className={this.props.classes.loginContainer}>
          <AppBar
            elevation={0}
            className={this.props.classes.appbar}
          >
            <Toolbar>
              <Typography variant='h4' className={this.props.classes.title}>
                Examination Portal NITT
              </Typography>
              <Button 
                variant="contained" 
                className={this.props.classes.endtestbtn} 
                onClick={() => (this.onStudentRegisterClick())}
              >
                Register Now
              </Button>
            </Toolbar>
          </AppBar>
          <div className={this.props.classes.addHeight}></div>
          <div className={this.props.classes.main}>
            <AlertBox />
            <div className={this.props.classes.formContainer}>
              <Typography variant='h5' style={{color: '#2d3748', marginBottom: 10}}>
                Welcome Back!
              </Typography>
              <Typography variant='subtitle1' style={{color: '#718096', marginBottom: 20}}>
                Sign in to access your account
              </Typography>
              <div className={this.props.classes.decorativeElement}></div>
              <LoginForm />
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStatetoProps = state => ({
  user: state.user
});

export default withStyles(useStyles)(connect(mapStatetoProps, {})(LoginPage));