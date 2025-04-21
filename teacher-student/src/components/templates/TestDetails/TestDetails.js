import React from "react";
import { 
  withStyles, 
  Paper, 
  Typography,
  CircularProgress,
  Grid,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import { getAllTestAction, goBackToAllTest } from "../../../redux/actions/teacherTestAction";
import TestTable from "../../molecues/TestTable/TestTable";
import ViewTest from "../CreateTestForm/ViewTest";
import { ArrowBack } from "@material-ui/icons";

const useStyles = (theme) => ({
  root: {
    padding: theme.spacing(4),
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
    minHeight: 'calc(100vh - 64px)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
    background: 'white',
    marginBottom: theme.spacing(4)
  },
  header: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontWeight: 700,
    color: '#3a3a3a',
    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '2rem'
  },
  backButton: {
    background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 6px rgba(106, 17, 203, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 7px 14px rgba(106, 17, 203, 0.3)'
    }
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px'
  }
});

class TestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.testDetails.retrived === false) {
      this.props.getAllTestAction();
    }
  }

  render() {
    const { classes } = this.props;

    if (this.props.testDetails.searched) {
      return (
        <div className={classes.root}>
          <div className={classes.container}>
            <Paper className={classes.paper} elevation={0}>
              <div className={classes.header}>
                <Typography variant="h2" className={classes.title}>
                  Test Details
                </Typography>
                <Button 
                  className={classes.backButton}
                  startIcon={<ArrowBack />}
                  onClick={this.props.goBackToAllTest}
                >
                  Back to All Tests
                </Button>
              </div>
              <ViewTest />
            </Paper>
          </div>
        </div>
      );
    } else if (this.props.testDetails.retrived) {
      return (
        <div className={classes.root}>
          <div className={classes.container}>
            <Paper className={classes.paper} elevation={0}>
              <div className={classes.header}>
                <Typography variant="h2" className={classes.title}>
                  All Tests
                </Typography>
              </div>
              <TestTable />
            </Paper>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.loadingContainer}>
          <CircularProgress size={60} style={{ color: '#6a11cb' }} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  testDetails: state.testDetails
});

export default withStyles(useStyles)(connect(mapStateToProps, {
  getAllTestAction,
  goBackToAllTest
})(TestDetails));