import React from "react";
import { 
  withStyles, 
  Paper, 
  Button, 
  Typography,
  CircularProgress,
  Grid
} from "@material-ui/core";
import { connect } from "react-redux";
import QuestionSearchBox from "../../atoms/SearchBox/QuestionSearchBox";
import { searchQuestion } from "../../../redux/actions/questionAction";
import QuestionTable from "../../molecues/QuestionsTable/QuestionTable";
import ViewnUpdateQuestion from "../ViewnUpdateQuestion/ViewnUpdateQuestion";
import { goBacktoSearch } from "../../../redux/actions/questionAction";
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
    WebkitTextFillColor: 'transparent'
  },
  backButton: {
    background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
    color: 'white',
    padding: '10px 20px',
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
  searchContainer: {
    marginBottom: theme.spacing(4)
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px'
  }
});

class QuestionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    if (this.props.questionDetails.searched === true) {
      return (
        <div className={classes.root}>
          <div className={classes.container}>
            <Paper className={classes.paper} elevation={0}>
              <div className={classes.header}>
                <Typography variant="h4" className={classes.title}>
                  Question Search Results
                </Typography>
              </div>
              <div className={classes.searchContainer}>
                <QuestionSearchBox searchCallback={this.props.searchQuestion} />
              </div>
              <QuestionTable />
            </Paper>
          </div>
        </div>
      );
    } else if (this.props.questionDetails.question._id !== undefined) {
      return (
        <div className={classes.root}>
          <div className={classes.container}>
            <Paper className={classes.paper} elevation={0}>
              <div className={classes.header}>
                <Typography variant="h4" className={classes.title}>
                  Question Details
                </Typography>
                <Button 
                  className={classes.backButton}
                  startIcon={<ArrowBack />}
                  onClick={this.props.goBacktoSearch}
                >
                  Back to Search
                </Button>
              </div>
              <div className={classes.searchContainer}>
                <QuestionSearchBox searchCallback={this.props.searchQuestion} />
              </div>
              <ViewnUpdateQuestion />
            </Paper>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <div className={classes.container}>
            <Paper className={classes.paper} elevation={0}>
              <div className={classes.header}>
                <Typography variant="h4" className={classes.title}>
                  Question Bank
                </Typography>
              </div>
              <div className={classes.searchContainer}>
                <QuestionSearchBox searchCallback={this.props.searchQuestion} />
              </div>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="body1" style={{ marginTop: '20px', color: '#666' }}>
                    Search for questions to get started
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  questionDetails: state.questionDetails
});

export default withStyles(useStyles)(connect(mapStateToProps, {
  searchQuestion,
  goBacktoSearch
})(QuestionDetails));