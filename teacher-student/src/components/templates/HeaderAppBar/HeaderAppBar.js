import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography } from "@material-ui/core";


const useStyles = (theme) => ({
  title: {
    flexGrow: 1,
    fontWeight: 600,
    color: "#ffffff",
    letterSpacing: "0.5px",
  },
  addHeight: {
    height: theme.mixins.toolbar.minHeight + 8, // Adds spacing below AppBar
  },
  appBar: {
    backgroundColor: "#3f51b5",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  welcomeText: {
    fontSize: "1rem",
    fontWeight: 400,
    color: "#e0e0e0",
    marginLeft: theme.spacing(2),
  },
});


class HeaderAppBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return(
      <div>
        <AppBar
          elevation={0}
        >
          <Toolbar>
            <Typography variant='h5' className={this.props.classes.title}>
              {this.props.title}
            </Typography>
            <Typography variant='h6'>
              welcome, {this.props.user.userDetails.username} !!
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={this.props.classes.addHeight}></div>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  user : state.user
})

export default withStyles(useStyles)(connect(mapStatetoProps,{})(HeaderAppBar));