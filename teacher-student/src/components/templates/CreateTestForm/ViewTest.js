import { withStyles } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import { getSubjectDetails } from '../../../redux/actions/subjectAction';
import { setAlert } from "../../../redux/actions/alertAction";

const useStyles = () => ({
  questionInput: {
    marginTop: '24px',
    display: 'block',
    width: '100%',
    fontSize: '1rem',
  },
  optionInput: {
    display: 'inline-block',
    margin: '16px 16px 0px',
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0',
    fontSize: '1rem',
  },
  inputfield: {
    display: 'block',
    margin: '12px 20px',
    width: '90%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  btn: {
    margin: '24px 40px',
    display: 'inline-block',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#3f51b5',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
  formClass: {
    margin: '32px auto',
    display: 'block',
    maxWidth: '800px',
    textAlign: 'left',
    border: '1px solid #ddd',
    borderRadius: '16px',
    padding: '32px',
    backgroundColor: '#fafafa',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  formTitle: {
    fontSize: '2rem',
    fontWeight: 600,
    marginBottom: '24px',
    color: '#3f51b5',
    textAlign: 'center',
  },
  textarea: {
    fontSize: '1rem',
    padding: '12px',
    margin: '16px 20px 0px 0px',
    minWidth: '60%',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  field: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '12px 0',
    flexWrap: 'wrap',
  },
  fieldkey: {
    display: 'inline-block',
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#333',
    minWidth: '35%',
  },
  fieldvalue: {
    display: 'inline-block',
    fontSize: '1.1rem',
    color: '#555',
    minWidth: '55%',
    textAlign: 'right',
  },
});


const getSecondToStr = (sec) => {
  var h = parseInt(sec/3600);
  var m = parseInt((sec%3600)/60);
  var str = "";
  if(h<10) {
    str += "0"+h+":";
  } else {
    str += h+":";
  }
  if(m<10) {
    str+= "0"+m;
  } else {
    str += m;
  }
  return str;
}

class ViewTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title :this.props.testDetails.test.title,
      subjects : this.props.testDetails.test.subjects,
      maxmarks : this.props.testDetails.test.maxmarks,
      queTypes : this.props.testDetails.test.queTypes,
      startTime: this.props.testDetails.test.startTime.slice(0,-8),
      endTime : this.props.testDetails.test.endTime.slice(0,-8),
      duration : getSecondToStr(this.props.testDetails.test.duration),
      regStartTime : this.props.testDetails.test.regStartTime.slice(0,-8),
      regEndTime : this.props.testDetails.test.regEndTime.slice(0,-8),
      resultTime :  this.props.testDetails.test.resultTime.slice(0,-8)
    }
  }


  findInArray(arr, val) {
    for(let i=0;i<arr.length;i++){
      if(arr[i]===val) {
        return  true;
      }
    }
    return false;
  }
  
  findInArraySubname(arr, sub) {
    for(let i=0;i<arr.length;i++){
      if(arr[i]===sub.id) {
        return  sub.subject + ", ";
      }
    }
    return "";
  }

  getQuesTypesString(arr) {
    var str = "";
    for(let i=0;i<arr.length;i++){
      str = str + arr[i] + " Marks, ";
    }
    return str;
  }

  render() {
    if(this.props.subjectDetails.retrived === false) {
      this.props.getSubjectDetails();
      return (<div></div>);
    }
    return(
      <div className={this.props.classes.formClass}>
        <div className={this.props.classes.formTitle} color="primary">View Test</div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Title</div>
          <div className={this.props.classes.fieldvalue}>{this.state.title}</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Subjects</div>
          <div className={this.props.classes.fieldvalue}>
          {this.props.subjectDetails.list.map((sub)=>(
            this.findInArraySubname(this.state.subjects,sub)
          ))}
          </div>  
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Question Types</div>
          <div className={this.props.classes.fieldvalue}>
            {this.getQuesTypesString(this.state.queTypes)}
          </div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Max Marks</div>
          <div className={this.props.classes.fieldvalue}>{this.state.maxmarks}</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Registration Start Time</div>
          <div className={this.props.classes.fieldvalue}>{this.state.regStartTime}</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Registration End Time</div>
          <div className={this.props.classes.fieldvalue}>{this.state.regEndTime}</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Test Start Time</div>
          <div className={this.props.classes.fieldvalue}>{this.state.startTime}</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Test End Time</div>
          <div className={this.props.classes.fieldvalue}>{this.state.endTime}</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Test Duration</div>
          <div className={this.props.classes.fieldvalue}>{this.state.duration} hours</div>
        </div>
        <div className={this.props.classes.field}>
          <div className={this.props.classes.fieldkey}>Result Time</div>
          <div className={this.props.classes.fieldvalue}>{this.state.resultTime}</div>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  subjectDetails : state.subjectDetails,
  testDetails : state.testDetails
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  getSubjectDetails,
  setAlert
})(ViewTest));