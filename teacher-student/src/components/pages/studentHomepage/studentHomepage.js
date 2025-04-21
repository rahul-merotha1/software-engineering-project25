import React from "react";
import { connect } from "react-redux";
import LogoutButton from "../../atoms/LogoutButton/LogoutButton";
import Auth from "../../../helper/Auth";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../../redux/actions/loginAction";
import { 
  Drawer, Typography, withStyles, AppBar, Toolbar, 
  List, ListItem, ListItemText, Card, 
  Grid, Button, Divider, Avatar, Fade, Grow 
} from "@material-ui/core";
import AlertBox from '../../atoms/Alertbox/AlertBox';
import TestDetailsStudent from "../../templates/TestDetails/TestDetailsStudent";
import UpcomingStudentTestsDetails from "../../templates/TestDetails/UpcomingStudentTestsDetails";
import CompletedTestsDetailsStudent from "../../templates/TestDetails/CompletedTestsDetailsStudent";
import { 
  CalendarToday, AssignmentTurnedIn, 
  Email, Phone, Home, MenuBook 
} from "@material-ui/icons";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';


const drawerWidth = 240;
const appbarHeight = 70;

const theme = createTheme({
  palette: {
    primary: {
      main: '#6a11cb',
      light: '#9d4edd',
      dark: '#3a0ca3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f72585',
      light: '#ff70a6',
      dark: '#c9184a',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@keyframes float': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        '@keyframes pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
});

const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    height: `calc(100% - ${appbarHeight}px)`,
    top: appbarHeight,
    backgroundColor: theme.palette.primary.dark,
  },
  drawerPaper: {
    width: drawerWidth,
    height: `calc(100% - ${appbarHeight}px)`,
    top: appbarHeight,
    backgroundColor: theme.palette.primary.dark,
    borderRight: 'none',
  },
  flex: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    margin: 'auto',
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: '1400px',
    minHeight: `calc(100vh - ${appbarHeight}px)`,
  },
  addHeight: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    fontWeight: 600,
    letterSpacing: '1px',
  },
  appbar: {
    height: appbarHeight,
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  welcomeCard: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(106, 17, 203, 0.3)',
    animation: '$pulse 4s ease-in-out infinite',
  },
  featureCard: {
    height: '100%',
    textAlign: 'center',
    padding: theme.spacing(3),
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 8px 32px rgba(106, 17, 203, 0.2)',
      background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
      color: theme.palette.primary.contrastText,
      '& $icon': {
        color: theme.palette.primary.contrastText,
        animation: '$float 3s ease-in-out infinite',
      },
    },
  },
  icon: {
    fontSize: 60,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    transition: 'all 0.3s ease',
  },
  quickAction: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5, 3),
    borderRadius: '50px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  divider: {
    margin: theme.spacing(4, 0),
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    height: '2px',
  },
  menuItem: {
    color: 'white',
    borderRadius: '8px',
    margin: theme.spacing(0.5, 1),
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateX(5px)',
    },
  },
  activeMenuItem: {
    backgroundColor: theme.palette.secondary.main + '!important',
    color: 'white',
    fontWeight: 600,
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    borderRadius: '8px',
    backgroundColor: 'rgba(106, 17, 203, 0.05)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(106, 17, 203, 0.1)',
      transform: 'scale(1.02)',
    },
  },
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0px)' },
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.02)' },
    '100%': { transform: 'scale(1)' },
  },
});

class StudentHomepage extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      activeMenu: 'Home',
      menuList: [] // temporarily empty, will populate below
    };
  
    // Now define menuList and set content based on it
    const menuList = [
      { title: 'Home', content: this.renderHomeContent(), icon: <Home /> },
      { title: 'View All Tests', content: <TestDetailsStudent />, icon: <MenuBook /> },
      { title: 'Upcoming Tests', content: <UpcomingStudentTestsDetails />, icon: <CalendarToday /> },
      { title: 'Completed Tests', content: <CompletedTestsDetailsStudent />, icon: <AssignmentTurnedIn /> },
    ];
  
    this.state = {
      ...this.state,
      menuList,
      content: menuList[0].content
    };
  }
  

  renderHomeContent = () => {
    const { classes } = this.props;
    // const user = this.props.user.userDetails || { username: 'Student' };

    return (
      <div>
        {/* Welcome Card */}
        <Grow in={true} timeout={500}>
          <Card className={classes.welcomeCard}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to Examination Portal NITT
            </Typography>
            <Typography variant="h6">
              Hello, {this.props.user.userDetails.username}!
            </Typography>
          </Card>
        </Grow>

        {/* Quick Access Cards */}
        <Grid container spacing={3}>
          {this.state.menuList.filter(item => item.title !== 'Home').map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Grow in={true} timeout={800 + index * 200}>
                <Card 
                  className={classes.featureCard} 
                  onClick={() => this.onMenuItemClick(item.content, item.title)}
                >
                  {React.cloneElement(item.icon, { className: classes.icon })}
                  <Typography variant="h5" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2">
                    {item.title === 'View All Tests' && 'Browse and register for available examinations'}
                    {item.title === 'Upcoming Tests' && 'Check your scheduled examinations'}
                    {item.title === 'Completed Tests' && 'Review your past test results'}
                  </Typography>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>

        <Divider className={classes.divider} />

        {/* Quick Actions */}
        <Fade in={true} timeout={1000}>
          <div>
            <Typography variant="h5" gutterBottom align="center">
              Quick Actions
            </Typography>
            <Grid container justifyContent="center">
              <Button 
                variant="contained" 
                color="primary" 
                className={classes.quickAction}
                onClick={() => this.onMenuItemClick(<TestDetailsStudent />, 'View All Tests')}
              >
                Register for Test
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                className={classes.quickAction}
                onClick={() => this.onMenuItemClick(<UpcomingStudentTestsDetails />, 'Upcoming Tests')}
              >
                View Schedule
              </Button>
            </Grid>
          </div>
        </Fade>

        <Divider className={classes.divider} />

        {/* Contact Information */}
        <Fade in={true} timeout={1200}>
          <div>
            <Typography variant="h5" gutterBottom align="center">
              Need Help? Contact Support
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <div className={classes.contactItem}>
                  <Email style={{ marginRight: 8 }} />
                  <Typography>support@examportal.com</Typography>
                </div>
              </Grid>
              <Grid item>
                <div className={classes.contactItem}>
                  <Phone style={{ marginRight: 8 }} />
                  <Typography>+1 (555) 123-4567</Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </div>
    );
  }

  onMenuItemClick(content, title = 'Home') {
    this.setState({
      content: content,
      activeMenu: title
    });
  }

  render() {
    if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
      return (<Navigate to='/' />);
    } else if (!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
      return (<div></div>);
    } else if (this.props.user.userDetails.type !== 'STUDENT') {
      return (<Navigate to='/' />);
    }

    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <AppBar position="fixed" className={classes.appbar}>
            <Toolbar>
              <Typography variant='h5' className={classes.title}>
                Student Dashboard
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar className={classes.avatar}>
                  {this.props.user.userDetails.username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant='subtitle1'>
                  Welcome, {this.props.user.userDetails.username}!
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
          <div className={classes.addHeight}></div>
        </div>
        <div className={classes.flex}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
          >
            <List>
              {this.state.menuList.map((item, index) => (
                <ListItem 
                  button 
                  key={index} 
                  className={classes.menuItem}
                  classes={{ selected: classes.activeMenuItem }}
                  selected={this.state.activeMenu === item.title}
                  onClick={() => this.onMenuItemClick(item.content, item.title)}
                >
                  <ListItemText 
                    primary={item.title} 
                    primaryTypographyProps={{ style: { fontWeight: this.state.activeMenu === item.title ? 600 : 400 } }}
                  />
                </ListItem>
              ))}
              <ListItem className={classes.menuItem}>
                <LogoutButton />
              </ListItem>
            </List>
          </Drawer>
          <div className={classes.content}>
            <AlertBox />
            {this.state.content}
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStatetoProps = state => ({
  user: state.user
});

export default withStyles(styles)(connect(mapStatetoProps, {
  getUserDetails
})(StudentHomepage));