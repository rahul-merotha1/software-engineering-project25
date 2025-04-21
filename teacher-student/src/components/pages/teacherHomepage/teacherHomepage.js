import React from "react";
import { connect } from "react-redux";
import LogoutButton from "../../atoms/LogoutButton/LogoutButton";
import Auth from "../../../helper/Auth";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../../redux/actions/loginAction";
import AddQuestionForm from "../../templates/AddQuestionForm/AddQuestionForm";
import AlertBox from '../../atoms/Alertbox/AlertBox';
import {
  Drawer,
  Typography,
  withStyles,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Grid,
  Button,
  Divider
} from "@material-ui/core";
import QuestionDetails from "../../templates/QuestionDetails/questionDetails";
import CreateTestForm from "../../templates/CreateTestForm/CreateTestForm";
import TestDetails from "../../templates/TestDetails/TestDetails";
import { AddCircleOutline, ListAlt, Create, Assignment, QuestionAnswer } from "@material-ui/icons";

const drawerWidth = 200;
const appbarHeight = 64;

const useStyles = (theme) => ({
  drawer: {
    width: drawerWidth,
    height: `calc(100% - ${appbarHeight}px)`,
    top: appbarHeight
  },
  drawerPaper: {
    width: drawerWidth,
    height: `calc(100% - ${appbarHeight}px)`,
    top: appbarHeight,
    background: 'linear-gradient(to bottom, #1e3c72, #2a5298)',
    color: 'white'
  },
  flex: {
    display: 'flex'
  },
  content: {
    margin: 'auto',
    padding: theme.spacing(3),
    width: '100%',
    maxWidth: '1200px'
  },
  addHeight: theme.mixins.toolbar,
  title: {
    flexGrow: 1
  },
  appbar: {
    height: appbarHeight,
    background: 'linear-gradient(to right, #667eea, #764ba2)'
  },
  welcomeCard: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: '#3f51b5',
    color: 'white',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    borderRadius: '12px',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  },
  featureCard: {
    height: '100%',
    textAlign: 'center',
    padding: theme.spacing(2),
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    borderRadius: '16px',
    background: 'linear-gradient(to right, #fbc2eb, #a6c1ee)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
    }
  },
  icon: {
    fontSize: 50,
    color: '#3f51b5',
    marginBottom: theme.spacing(2)
  },
  quickAction: {
    margin: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(3, 0)
  }
});

class TeacherHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  getSelectedContent = () => {
    switch (this.state.selectedIndex) {
      case 0:
        return this.renderHomeContent();
      case 1:
        return <AddQuestionForm />;
      case 2:
        return <QuestionDetails />;
      case 3:
        return <CreateTestForm />;
      case 4:
        return <TestDetails />;
      default:
        return this.renderHomeContent();
    }
  }

  onMenuItemClick(index) {
    this.setState({ selectedIndex: index });
  }

  renderHomeContent = () => {
    const { classes } = this.props;
    const user = this.props.user.userDetails || { username: 'Teacher' };

    return (
      <div>
        <Card className={classes.welcomeCard}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Teacher Portal
          </Typography>
          <Typography variant="h6">
            Hello, {user.username}!
          </Typography>
        </Card>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              className={classes.featureCard} 
              onClick={() => this.onMenuItemClick(1)}
            >
              <AddCircleOutline className={classes.icon} />
              <Typography variant="h5" gutterBottom>
                Add Question
              </Typography>
              <Typography variant="body2">
                Create new questions for your tests
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card 
              className={classes.featureCard}
              onClick={() => this.onMenuItemClick(2)}
            >
              <QuestionAnswer className={classes.icon} />
              <Typography variant="h5" gutterBottom>
                Manage Questions
              </Typography>
              <Typography variant="body2">
                View and edit all your questions
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card 
              className={classes.featureCard}
              onClick={() => this.onMenuItemClick(3)}
            >
              <Create className={classes.icon} />
              <Typography variant="h5" gutterBottom>
                Create Test
              </Typography>
              <Typography variant="body2">
                Design new examinations
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />

        <Typography variant="h5" gutterBottom align="center">
          Quick Actions
        </Typography>
        <Grid container justifyContent="center">
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.quickAction}
            onClick={() => this.onMenuItemClick(1)}
          >
            Add New Question
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            className={classes.quickAction}
            onClick={() => this.onMenuItemClick(3)}
          >
            Create New Test
          </Button>
          <Button 
            variant="outlined" 
            className={classes.quickAction}
            onClick={() => this.onMenuItemClick(4)}
          >
            View All Tests
          </Button>
        </Grid>

        <Divider className={classes.divider} />

        <Typography variant="h5" gutterBottom align="center">
          Recent Activity
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          Your recent actions will appear here
        </Typography>
      </div>
    );
  }

  render() {
    if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
      return (<Navigate to='/' />);
    } else if (!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
      return (<div></div>);
    } else if (this.props.user.userDetails.type !== 'TEACHER') {
      return (<Navigate to='/' />);
    }
    return (
      <div>
        <div>
          <AppBar
            elevation={0}
            className={this.props.classes.appbar}
          >
            <Toolbar>
              <Typography variant='h5' className={this.props.classes.title}>
                Teacher Homepage
              </Typography>
              <Typography variant='h6'>
                Welcome, {this.props.user.userDetails.username} !!
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={this.props.classes.addHeight}></div>
        </div>
        <div className={this.props.classes.flex}>
          <Drawer
            className={this.props.classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: this.props.classes.drawerPaper }}
          >
            <List>
              {['Home', 'Add Question', 'Questions', 'Create Test', 'View Tests'].map((text, index) => (
                <ListItem button key={index} onClick={() => this.onMenuItemClick(index)}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
              <ListItem>
                <LogoutButton />
              </ListItem>
            </List>
          </Drawer>
          <div className={this.props.classes.content}>
            <AlertBox></AlertBox>
            {this.getSelectedContent()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  user: state.user
});

export default withStyles(useStyles)(connect(mapStatetoProps, {
  getUserDetails
})(TeacherHomepage));
