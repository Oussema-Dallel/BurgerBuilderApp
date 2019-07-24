import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/spinner";
import classes from "./Auth.css";

import * as actionCreators from "../../store/actions/index";
import { checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  componentDidMount() {
    if (!this.props.building && this.props.path !== "/") {
      this.props.onAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    let updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          this.state.controls[controlName].validation,
          event.target.value
        ),
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
  };

  authHandler = event => {
    event.preventDefault();

    this.props.onAuth(
      this.state.controls.email,
      this.state.controls.password,
      this.state.isSignup
    );
  };

  authMethod = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    let formArray = [];
    for (let key in this.state.controls) {
      formArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formArray.map(formEl => {
      return (
        <Input
          key={formEl.id}
          elementType={formEl.config.elementType}
          elementConfig={formEl.config.elementConfig}
          value={formEl.config.value}
          invalid={!formEl.config.valid}
          touched={formEl.config.touched}
          shouldValidate={formEl.config.validation}
          changed={event => this.inputChangedHandler(event, formEl.id)}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.path} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.authHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" clicked={this.authMethod}>
          Switch to {this.state.isSignup ? "Sign-In" : "Sign-Up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    building: state.burgerBuilder.building,
    isAuthenticated: state.auth.idToken !== null,
    path: state.auth.path
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actionCreators.auth(email, password, isSignup)),
    onAuthRedirectPath: () => dispatch(actionCreators.authRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
