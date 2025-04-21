import { Button, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Timer from "../../molecues/TestView/Timer";
import QuestionList from "../../molecues/TestView/QuestionList";
import TestQuestion from "../../molecues/TestView/TestQuestion";
import AlertBox from '../../atoms/Alertbox/AlertBox';
import { endTestAction } from "../../../redux/actions/takeTestAction";

const useStyles = (theme) => ({
  addHeight: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    fontWeight: 600,
    letterSpacing: '0.5px'
  },
  flexdiv: {
    display: "flex",
    backgroundColor: '#f5f7fa',
    minHeight: 'calc(100vh - 64px)'
  },
  quelistdiv: {
    width: "18%",
    margin: "50px 10px",
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    padding: '16px',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
    }
  },
  questiondiv: {
    width: "75%",
    marginLeft: "50px",
    marginTop: "50px",
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    padding: '32px',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
    }
  },
  endtestbtn: {
    marginLeft: "20px",
    fontWeight: 600,
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  btns: {
    margin: "10px",
    fontWeight: 600,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)'
    }
  },
  appbar: {
    background: 'linear-gradient(45deg, #3a0ca3 0%, #4361ee 100%)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  },
  timerText: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',
    fontWeight: 500
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '32px',
    gap: '16px'
  },
  questionCounter: {
    backgroundColor: '#3a0ca3',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontWeight: 600,
    marginBottom: '24px',
    display: 'inline-block'
  }
})

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curIndex: 0
    }
  }

  setCurIndex(x, obj) {
    console.log("set index");
    console.log(obj);
    obj.setState({
      ...obj.state,
      curIndex: x
    })
  }

  goToPrev() {
    if (this.state.curIndex > 0) {
      this.setState({
        ...this.state,
        curIndex: this.state.curIndex - 1
      })
    }
  }

  goToNext() {
    if (this.state.curIndex + 1 < this.props.taketest.answersheet.answers.length) {
      this.setState({
        ...this.state,
        curIndex: this.state.curIndex + 1
      })
    }
  }

  endtest() {
    this.props.endTestAction();
  }

  render() {
    if (this.props.taketest.isRetrived === false) {
      return (<Navigate to='/' />);
    }
    var timerTime = this.props.taketest.test.duration * 1000 - (Date.now() - Date.parse(this.props.taketest.answersheet.startTime));
    
    return (
      <div>
        <div>
          <AppBar
            elevation={0}
            className={this.props.classes.appbar}
          >
            <Toolbar>
              <Typography variant='h5' className={this.props.classes.title}>
                {this.props.taketest.test.title}
              </Typography>
              <Typography variant='h6' className={this.props.classes.timerText}>
                Time Remaining &nbsp;
                <Timer time={timerTime}></Timer>
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                className={this.props.classes.endtestbtn} 
                onClick={() => (this.endtest())}
              >
                End Test
              </Button>
            </Toolbar>
          </AppBar>
          <div className={this.props.classes.addHeight}></div>
        </div>
        <div className={this.props.classes.flexdiv}>
          <div className={this.props.classes.quelistdiv}>
            <QuestionList answers={this.props.taketest.answersheet.answers} callback={this.setCurIndex} obj={this} />
          </div>
          <div className={this.props.classes.questiondiv}>
            <AlertBox></AlertBox>
            <div className={this.props.classes.questionCounter}>
              Question {this.state.curIndex + 1} of {this.props.taketest.answersheet.answers.length}
            </div>
            <TestQuestion question={this.state.curIndex} answer={this.props.taketest.answersheet.answers[this.state.curIndex]} />
            <div className={this.props.classes.navigationButtons}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => (this.goToPrev())} 
                className={this.props.classes.btns}
                disabled={this.state.curIndex === 0}
              >
                Previous
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => (this.goToNext())} 
                className={this.props.classes.btns}
                disabled={this.state.curIndex + 1 === this.props.taketest.answersheet.answers.length}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  user: state.user,
  taketest: state.takeTestDetails
})

export default withStyles(useStyles)(connect(mapStatetoProps, {
  endTestAction
})(TestPage));