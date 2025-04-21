import React from 'react';
import AlertBox from '../../atoms/Alertbox/AlertBox';
import StudentRegisterForm from '../../templates/studentRegisterForm/studentRegisterForm';
import { Button, AppBar, Toolbar, Typography, withStyles, Container, Paper, CssBaseline } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

// ====== Modern Theme with Color Enhancements ====== //
const theme = createTheme({
  palette: {
    primary: {
      main: '#6a11cb', // Deep purple
    },
    secondary: {
      main: '#2575fc', // Blue
    },
    background: {
      default: '#f0f2f5', // Subtle grayish
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@keyframes pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)' },
        },
        '@keyframes glow': {
          '0%': { boxShadow: '0 0 8px rgba(98, 0, 234, 0.6)' },
          '50%': { boxShadow: '0 0 20px rgba(98, 0, 234, 0.9)' },
          '100%': { boxShadow: '0 0 8px rgba(98, 0, 234, 0.6)' },
        },
      },
    },
  },
});

// ====== Enhanced Styles with More Color and Interaction ====== //
const styles = (theme) => ({
  addHeight: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    fontWeight: 800,
    fontSize: '1.7rem',
    background: 'linear-gradient(90deg, #ffffff, #b2ebf2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '1px',
  },
  main: {
    textAlign: 'center',
    padding: theme.spacing(4),
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
  },
  formContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: theme.spacing(4),
    borderRadius: '20px',
    background: 'linear-gradient(180deg, #ffffff 0%, #f1f3f6 100%)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: theme.shadows[10],
    },
  },
  appbar: {
    background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  homeButton: {
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '10px',
    padding: '8px 20px',
    fontWeight: 600,
    fontSize: '1rem',
    animation: '$glow 2s infinite',
    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
    '&:hover': {
      background: 'linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)',
      borderColor: 'white',
      transform: 'scale(1.07)',
    },
  },
  pageTitle: {
    marginBottom: theme.spacing(4),
    fontWeight: 700,
    color: theme.palette.primary.main,
    animation: '$pulse 2s infinite',
    fontSize: '2rem',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.03)' },
    '100%': { transform: 'scale(1)' },
  },
  '@keyframes glow': {
    '0%': { boxShadow: '0 0 8px rgba(98, 0, 234, 0.6)' },
    '50%': { boxShadow: '0 0 20px rgba(98, 0, 234, 0.9)' },
    '100%': { boxShadow: '0 0 8px rgba(98, 0, 234, 0.6)' },
  },
});

class StudentRegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotoHome: false,
    };
  }

  onHomeClick() {
    this.setState({
      ...this.state,
      gotoHome: true,
    });
  }

  render() {
    if (this.state.gotoHome) {
      return <Navigate to="/" />;
    }
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <AppBar position="fixed" className={classes.appbar}>
            <Toolbar>
              <Typography variant="h5" className={classes.title}>
                🚀 Student Registration
              </Typography>
              <Button
                variant="outlined"
                className={classes.homeButton}
                onClick={() => this.onHomeClick()}
              >
                Home
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.addHeight}></div>

          <Container maxWidth="lg" className={classes.main}>
            <Typography variant="h4" className={classes.pageTitle} gutterBottom>
              Join Us For Good Future
            </Typography>

            <Paper elevation={4} className={classes.formContainer}>
              <AlertBox />
              <StudentRegisterForm />
            </Paper>
          </Container>
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(StudentRegisterPage);
