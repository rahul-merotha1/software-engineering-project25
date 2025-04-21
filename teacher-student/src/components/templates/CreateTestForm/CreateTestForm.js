import { withStyles } from "@material-ui/core/styles";
import React from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  Paper,
  Typography,
  CircularProgress,
  Box
} from "@material-ui/core";
import { connect } from "react-redux";
import { getSubjectDetails } from '../../../redux/actions/subjectAction';
import { setAlert } from "../../../redux/actions/alertAction";
import { createTestAction } from "../../../redux/actions/teacherTestAction";

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
  },
  formContainer: {
    width: '100%',
    maxWidth: '900px',
  },
  formPaper: {
    padding: theme.spacing(5),
    borderRadius: '20px',
    boxShadow: '0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)',
    background: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  formTitle: {
    marginBottom: theme.spacing(4),
    fontWeight: 800,
    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    fontSize: '2.2rem',
  },
  section: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    borderRadius: '15px',
    background: 'rgba(245, 247, 250, 0.5)',
    border: '1px solid rgba(106, 17, 203, 0.1)',
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    color: '#6a11cb',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    '&:before': {
      content: '""',
      display: 'inline-block',
      width: '6px',
      height: '20px',
      background: 'linear-gradient(to bottom, #6a11cb, #2575fc)',
      marginRight: '10px',
      borderRadius: '3px',
    },
  },
  inputField: {
    marginBottom: theme.spacing(3),
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      '&.Mui-focused fieldset': {
        borderColor: '#6a11cb',
        boxShadow: '0 0 0 2px rgba(106, 17, 203, 0.2)',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#6a11cb',
    },
  },
  checkboxGroup: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  checkboxItem: {
    width: '45%',
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& .MuiCheckbox-root': {
      color: '#6a11cb',
    },
    '& .Mui-checked': {
      color: '#2575fc',
    },
  },
  timeFieldsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeField: {
    width: '48%',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
  submitButton: {
    padding: '14px 36px',
    borderRadius: '12px',
    fontWeight: 700,
    background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
    color: 'white',
    fontSize: '1rem',
    textTransform: 'none',
    boxShadow: '0 4px 6px rgba(106, 17, 203, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 7px 14px rgba(106, 17, 203, 0.3)',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
  },
});

class CreateTestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      subjects: [],
      maxmarks: 30,
      queTypes: [],
      startTime: "",
      endTime: "",
      duration: "00:30",
      regStartTime: "",
      regEndTime: "",
      resultTime: ""
    };
  }

  handleInputChange = (field) => (event) => {
    this.setState({
      ...this.state,
      [field]: event.target.value
    });
  };

  handleCheckboxChange = (field) => (event) => {
    const list = [...this.state[field]];
    const value = field === 'subjects' ? event.target.name : parseInt(event.target.name);
    
    if (event.target.checked) {
      list.push(value);
    } else {
      const index = list.indexOf(value);
      if (index > -1) {
        list.splice(index, 1);
      }
    }
    
    this.setState({
      ...this.state,
      [field]: list
    });
  };

  sendAlert = (type, title, message) => {
    this.props.setAlert({
      isAlert: true,
      type: type,
      title: title,
      message: message
    });
  };

  timeStringtoMs = (str) => {
    const hours = parseInt(str.substring(0, 2));
    const mins = parseInt(str.substring(3));
    return ((hours * 60 + mins) * 60 * 1000);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const dur = this.timeStringtoMs(this.state.duration);
    
    if (this.state.subjects.length < 1) {
      this.sendAlert('error', 'Invalid input', 'Please select at least one subject');
    } else if (this.state.queTypes.length < 1) {
      this.sendAlert('error', 'Invalid input', 'Please select at least one question type');
    } else if (Date.parse(this.state.regStartTime) >= Date.parse(this.state.regEndTime)) {
      this.sendAlert('error', 'Invalid input', 'Registration start time must be before end time');
    } else if (Date.parse(this.state.startTime) >= Date.parse(this.state.endTime)) {
      this.sendAlert('error', 'Invalid input', 'Test start time must be before end time');
    } else if (Date.parse(this.state.regEndTime) >= Date.parse(this.state.startTime)) {
      this.sendAlert('error', 'Invalid input', 'Registration must end before test starts');
    } else if (Date.parse(this.state.endTime) >= Date.parse(this.state.resultTime)) {
      this.sendAlert('error', 'Invalid input', 'Test must end before results are published');
    } else if ((Date.parse(this.state.endTime) - Date.parse(this.state.startTime)) <= dur) {
      this.sendAlert('error', 'Invalid input', 'Test duration exceeds available time window');
    } else {
      this.props.createTestAction({ ...this.state, duration: dur / 1000 });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      title,
      subjects,
      maxmarks,
      queTypes,
      startTime,
      endTime,
      duration,
      regStartTime,
      regEndTime,
      resultTime
    } = this.state;

    if (this.props.subjectDetails.retrived === false) {
      this.props.getSubjectDetails();
      return (
        <div className={classes.loadingContainer}>
          <CircularProgress size={60} style={{ color: '#6a11cb' }} />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <div className={classes.formContainer}>
          <Paper className={classes.formPaper} elevation={0}>
            <Typography variant="h2" className={classes.formTitle}>
              Create New Test
            </Typography>

            <form onSubmit={this.handleSubmit}>
              {/* Basic Information Section */}
              <Box className={classes.section}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Basic Information
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  className={classes.inputField}
                  label="Test Title"
                  placeholder="Enter test title"
                  value={title}
                  onChange={this.handleInputChange('title')}
                  required
                />
                <TextField
                  variant="outlined"
                  className={classes.inputField}
                  label="Maximum Marks"
                  type="number"
                  value={maxmarks}
                  onChange={this.handleInputChange('maxmarks')}
                  required
                  InputProps={{
                    inputProps: { max: 100, min: 5 }
                  }}
                />
              </Box>

              {/* Subjects Section */}
              <Box className={classes.section}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Subjects
                </Typography>
                <FormGroup className={classes.checkboxGroup}>
                  {this.props.subjectDetails.list.map((sub) => (
                    <FormControlLabel
                      key={sub.id}
                      className={classes.checkboxItem}
                      control={
                        <Checkbox
                          name={sub.id}
                          checked={subjects.includes(sub.id)}
                          onChange={this.handleCheckboxChange('subjects')}
                        />
                      }
                      label={sub.subject}
                    />
                  ))}
                </FormGroup>
              </Box>

              {/* Question Types Section */}
              <Box className={classes.section}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Question Types
                </Typography>
                <FormGroup className={classes.checkboxGroup}>
                  {[1, 2, 3, 4].map((mark) => (
                    <FormControlLabel
                      key={mark}
                      className={classes.checkboxItem}
                      control={
                        <Checkbox
                          name={String(mark)}
                          checked={queTypes.includes(mark)}
                          onChange={this.handleCheckboxChange('queTypes')}
                        />
                      }
                      label={`${mark} Marks`}
                    />
                  ))}
                </FormGroup>
              </Box>

              {/* Registration Times Section */}
              <Box className={classes.section}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Registration Period
                </Typography>
                <div className={classes.timeFieldsContainer}>
                  <TextField
                    variant="outlined"
                    className={classes.timeField}
                    label="Registration Start Time"
                    type="datetime-local"
                    value={regStartTime}
                    onChange={this.handleInputChange('regStartTime')}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    variant="outlined"
                    className={classes.timeField}
                    label="Registration End Time"
                    type="datetime-local"
                    value={regEndTime}
                    onChange={this.handleInputChange('regEndTime')}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Box>

              {/* Test Times Section */}
              <Box className={classes.section}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Test Schedule
                </Typography>
                <div className={classes.timeFieldsContainer}>
                  <TextField
                    variant="outlined"
                    className={classes.timeField}
                    label="Test Start Time"
                    type="datetime-local"
                    value={startTime}
                    onChange={this.handleInputChange('startTime')}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    variant="outlined"
                    className={classes.timeField}
                    label="Test End Time"
                    type="datetime-local"
                    value={endTime}
                    onChange={this.handleInputChange('endTime')}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
                <TextField
                  variant="outlined"
                  className={classes.inputField}
                  label="Test Duration"
                  type="time"
                  value={duration}
                  onChange={this.handleInputChange('duration')}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Box>

              {/* Result Time Section */}
              <Box className={classes.section}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Results
                </Typography>
                <TextField
                  variant="outlined"
                  className={classes.inputField}
                  label="Result Publication Time"
                  type="datetime-local"
                  value={resultTime}
                  onChange={this.handleInputChange('resultTime')}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Box>

              {/* Submit Button */}
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  className={classes.submitButton}
                  type="submit"
                  size="large"
                >
                  Create Test
                </Button>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  subjectDetails: state.subjectDetails
});

export default withStyles(useStyles)(connect(mapStateToProps, {
  getSubjectDetails,
  setAlert,
  createTestAction
})(CreateTestForm));