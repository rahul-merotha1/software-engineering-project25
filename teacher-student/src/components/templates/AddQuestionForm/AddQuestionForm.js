import React from "react";
import {
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Typography,
  CircularProgress,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setAlert } from "../../../redux/actions/alertAction";
import { getSubjectDetails } from '../../../redux/actions/subjectAction';
import { addQuestionAction } from "../../../redux/actions/questionAction";

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3),
    background: 'radial-gradient(circle at 10% 20%, rgba(248, 219, 219, 0.3) 0%, rgba(229, 248, 250, 0.3) 90%)',
  },
  formContainer: {
    width: '100%',
    maxWidth: '900px',
  },
  formPaper: {
    padding: theme.spacing(4),
    borderRadius: '20px',
    boxShadow: '0 12px 24px rgba(106, 17, 203, 0.15)',
    background: 'linear-gradient(145deg, #ffffff 0%, #f9f5ff 100%)',
    border: '1px solid rgba(106, 17, 203, 0.1)',
    backdropFilter: 'blur(4px)',
  },
  formTitle: {
    marginBottom: theme.spacing(4),
    fontWeight: 800,
    background: '#6a11cb',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    fontSize: '2.2rem',
    letterSpacing: '-0.5px',
  },
  sectionTitle: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(1)}px`,
    color: '#6a11cb',
    fontWeight: 700,
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    // '&:before': {
    //   content: '""',
    //   display: 'inline-block',
    //   width: '8px',
    //   height: '20px',
    //   background: 'linear-gradient(to bottom, #FF4D4D, #6a11cb)',
    //   marginRight: '10px',
    //   borderRadius: '4px',
    // },
  },
  questionInput: {
    marginBottom: theme.spacing(3),
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px',
      '&.Mui-focused fieldset': {
        borderColor: '#6a11cb',
        boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.15)',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#6a11cb',
    },
  },
  optionRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  optionInput: {
    width: '48%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px',
      '&.Mui-focused fieldset': {
        borderColor: '#FF4D4D',
      },
    },
    '&:nth-child(odd) .MuiInputLabel-root.Mui-focused': {
      color: '#FF4D4D', // Red for odd options
    },
    '&:nth-child(even) .MuiInputLabel-root.Mui-focused': {
      color: '#2575fc', // Blue for even options
    },
  },
  selectField: {
    width: '48%',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px',
      '&.Mui-focused fieldset': {
        borderColor: '#F9CB28',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#F9CB28', // Yellow for selects
    },
  },
  textArea: {
    width: '100%',
    minHeight: '140px',
    padding: theme.spacing(2),
    borderRadius: '14px',
    border: '2px solid #e9d6ff',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    marginTop: theme.spacing(1),
    background: 'rgba(249, 240, 255, 0.3)',
    transition: 'all 0.3s ease',
    '&:focus': {
      outline: 'none',
      borderColor: '#6a11cb',
      boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.15)',
      background: 'rgba(255, 255, 255, 0.9)',
    },
    '&::placeholder': {
      color: '#c0a8e0',
    },
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    gap: theme.spacing(2),
    '& button': {
      transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  submitButton: {
    padding: '14px 36px',
    borderRadius: '14px',
    fontWeight: 700,
    border: '2px solid #6a11cb',
    color: '#6a11cb',
    background: 'white',
    boxShadow: '0 4px 10px rgba(106, 17, 203, 0.1)',
    '&:hover': {
      background: 'rgba(106, 17, 203, 0.05)',
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 15px rgba(106, 17, 203, 0.2)',
    },
  },
  resetButton: {
    padding: '14px 36px',
    borderRadius: '14px',
    fontWeight: 700,
    border: '2px solid #6a11cb',
    color: '#6a11cb',
    background: 'white',
    boxShadow: '0 4px 10px rgba(106, 17, 203, 0.1)',
    '&:hover': {
      background: 'rgba(106, 17, 203, 0.05)',
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 15px rgba(106, 17, 203, 0.2)',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
    '& svg': {
      background: 'conic-gradient(from 90deg at 50% 50%, rgba(106, 17, 203, 0) 0%, #6a11cb 50%, rgba(106, 17, 203, 0) 100%)',
      borderRadius: '50%',
      padding: '4px',
      animation: '$spin 1.5s linear infinite',
    },
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
});
class AddQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      options: ["", "", "", ""],
      subject: "",
      answer: "",
      marks: 1,
      explanation: ""
    };
  }

  handleInputChange = (field) => (event) => {
    this.setState({
      ...this.state,
      [field]: event.target.value
    });
  };

  handleOptionChange = (index) => (event) => {
    const newOptions = [...this.state.options];
    newOptions[index] = event.target.value;
    this.setState({
      ...this.state,
      options: newOptions
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    if (this.state.answer === "") {
      this.props.setAlert({
        isAlert: true,
        type: 'error',
        title: 'Invalid Input',
        message: 'Please select the correct answer'
      });
      return;
    }
    
    if (this.state.subject === "") {
      this.props.setAlert({
        isAlert: true,
        type: 'error',
        title: 'Invalid Input',
        message: 'Please select a subject'
      });
      return;
    }

    this.props.addQuestionAction(this.state);
    this.setState({
      body: "",
      options: ["", "", "", ""],
      subject: "",
      answer: "",
      marks: 1,
      explanation: ""
    });
  };

  handleReset = () => {
    this.setState({
      body: "",
      options: ["", "", "", ""],
      subject: "",
      answer: "",
      marks: 1,
      explanation: ""
    });
  };

  componentDidMount() {
    if (!this.props.subjectDetails.retrived) {
      this.props.getSubjectDetails();
    }
  }

  render() {
    const { classes } = this.props;
    const { body, options, subject, answer, marks, explanation } = this.state;

    if (!this.props.subjectDetails.retrived) {
      return (
        <div className={classes.loadingContainer}>
          <CircularProgress size={60} style={{ color: '#2575fc' }} />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <div className={classes.formContainer}>
          <Paper className={classes.formPaper} elevation={0}>
            <Typography variant="h4" className={classes.formTitle}>
              Add New Question
            </Typography>

            <form onSubmit={this.handleSubmit}>
              {/* Question Section */}
              <Typography variant="h6" className={classes.sectionTitle}>
                Question Details
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                className={classes.questionInput}
                label="Question Text"
                placeholder="Enter your question here"
                value={body}
                onChange={this.handleInputChange('body')}
                required
                multiline
                rows={3}
              />

              {/* Options Section */}
              <Typography variant="h6" className={classes.sectionTitle}>
                Answer Options
              </Typography>
              <div className={classes.optionRow}>
                {options.map((option, index) => (
                  <TextField
                    key={index}
                    variant="outlined"
                    className={classes.optionInput}
                    label={`Option ${String.fromCharCode(65 + index)}`}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    value={option}
                    onChange={this.handleOptionChange(index)}
                    required
                  />
                ))}
              </div>

              {/* Metadata Section */}
              <Typography variant="h6" className={classes.sectionTitle}>
                Question Metadata
              </Typography>
              <div className={classes.optionRow}>
                <TextField
                  variant="outlined"
                  className={classes.optionInput}
                  label="Marks"
                  type="number"
                  value={marks}
                  onChange={this.handleInputChange('marks')}
                  required
                  InputProps={{
                    inputProps: { 
                      max: 10, 
                      min: 1 
                    }
                  }}
                />

                <FormControl variant="outlined" className={classes.selectField}>
                  <InputLabel>Subject</InputLabel>
                  <Select
                    value={subject}
                    onChange={this.handleInputChange('subject')}
                    label="Subject"
                    required
                  >
                    <MenuItem value="">
                      <em>Select a subject</em>
                    </MenuItem>
                    {this.props.subjectDetails.list.map((sub) => (
                      <MenuItem key={sub.id} value={sub.id}>
                        {sub.subject}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.selectField}>
                  <InputLabel>Correct Answer</InputLabel>
                  <Select
                    value={answer}
                    onChange={this.handleInputChange('answer')}
                    label="Correct Answer"
                    required
                    disabled={options.some(opt => opt === "")}
                  >
                    <MenuItem value="">
                      <em>Select correct answer</em>
                    </MenuItem>
                    {options.map((option, index) => (
                      option && (
                        <MenuItem key={index} value={option}>
                          {`Option ${String.fromCharCode(65 + index)}: ${option}`}
                        </MenuItem>
                      )
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* Explanation Section */}
              <Typography variant="h6" className={classes.sectionTitle}>
                Explanation (Optional)
              </Typography>
              <textarea
                className={classes.textArea}
                placeholder="Add explanation for the correct answer..."
                value={explanation}
                onChange={this.handleInputChange('explanation')}
              />

              {/* Action Buttons */}
              <div className={classes.buttonGroup}>
                <Button
                  variant="outlined"
                  className={classes.resetButton}
                  onClick={this.handleReset}
                >
                  Reset Form
                </Button>
                <Button
                  variant="contained"
                  className={classes.submitButton}
                  type="submit"
                >
                  Submit Question
                </Button>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  subjectDetails: state.subjectDetails
});

export default withStyles(useStyles)(connect(mapStateToProps, {
  getSubjectDetails,
  setAlert,
  addQuestionAction
})(AddQuestionForm));