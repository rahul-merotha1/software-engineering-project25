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
import { getCompletedTestsStudentAction } from "../../../redux/actions/studentTestAction";
import CompletedTestTableStudent from "../../molecues/TestTable/CompletedTestTableStudent";
import TestResultStudent from "../../molecues/ResultView/TestResultStudent";
import { ArrowBack, AssignmentTurnedIn, BarChart } from "@material-ui/icons";

const useStyles = (theme) => ({
  root: {
    padding: theme.spacing(3),
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh'
  },
  glassCard: {
    padding: theme.spacing(4),
    borderRadius: '24px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
    marginBottom: theme.spacing(4)
  },
  header: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  title: {
    fontWeight: 800,
    fontSize: '2.5rem',
    background: 'linear-gradient(90deg, #ff8a00 0%, #e52e71 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: theme.spacing(2)
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: theme.spacing(4),
    flexWrap: 'wrap'
  },
  statCard: {
    padding: theme.spacing(3),
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.7)',
    minWidth: 200,
    textAlign: 'center',
    margin: theme.spacing(1),
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
    }
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 700,
    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: theme.spacing(1, 0)
  }
});

class CompletedTestsDetailsStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCompletedTestsStudentAction();
  }

  calculatePerformanceMetrics() {
    const { list } = this.props.testDetails;
    
    if (!list || list.length === 0) {
      return {
        count: 0,
        average: 0,
        highest: 0
      };
    }

    const totalMarks = list.reduce((sum, test) => sum + (test.marksObtained || 0), 0);
    const average = Math.round((totalMarks / list.length) * 10) / 10; // Round to 1 decimal
    const highest = Math.max(...list.map(test => test.marksObtained || 0));

    return {
      count: list.length,
      average,
      highest
    };
  }

  render() {
    const { classes } = this.props;
    const { count, average, highest } = this.calculatePerformanceMetrics();

    if (this.props.testDetails.viewTestResult) {
      return (
        <div className={classes.root}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={10} lg={8}>
              <Paper className={classes.glassCard} elevation={0}>
                <div className={classes.header}>
                  <Typography variant="h1" className={classes.title}>
                    Your Test Results
                  </Typography>
                </div>
                
                <TestResultStudent />
                
                <Grid container justifyContent="center">
                  <Button
                    className={classes.backButton}
                    startIcon={<ArrowBack />}
                    onClick={() => window.history.back()}
                  >
                    Back to Tests
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    } else if (this.props.testDetails.completedTestRetrived) {
      return (
        <div className={classes.root}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={10} lg={8}>
              <Paper className={classes.glassCard} elevation={0}>
                <div className={classes.header}>
                  <Typography variant="h1" className={classes.title}>
                    Completed Tests
                  </Typography>
                </div>

                <div className={classes.statsContainer}>
                  <div className={classes.statCard}>
                    <Typography variant="subtitle1">Tests Completed</Typography>
                    <Typography variant="h3" className={classes.statValue}>
                      {count}
                    </Typography>
                  </div>
                  <div className={classes.statCard}>
                    <Typography variant="subtitle1">Average Score</Typography>
                    <Typography variant="h3" className={classes.statValue}>
                      {average}%
                    </Typography>
                  </div>
                  <div className={classes.statCard}>
                    <Typography variant="subtitle1">Highest Score</Typography>
                    <Typography variant="h3" className={classes.statValue}>
                      {highest}%
                    </Typography>
                  </div>
                </div>

                <CompletedTestTableStudent />
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <div className={classes.loadingContainer}>
          <CircularProgress size={80} thickness={5} style={{ color: '#fff' }} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  testDetails: state.testDetails
});

export default withStyles(useStyles)(connect(mapStateToProps, {
  getCompletedTestsStudentAction
})(CompletedTestsDetailsStudent));