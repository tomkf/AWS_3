import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../util/Validation";
import {Auth} from 'aws-amplify';

class ForgotPasswordSubmit extends Component {
    state = {
        verificationcode: "",
        email: "",
        password: "",
        confirmpassword: "",
        errors: {
          blankfield: false,
          matchedpassword: false,
          cognito: null
        }
  };

  clearErrors = () => {
    this.setState({
      errors: {
        blankfield: false,
        cognito: null
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    
    //Form validation
    this.clearErrors();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    //Integrate Cognito here on valid form submission

    try {
    //   const user = await Auth.signIn(this.state.username,this.state.password);
    //   console.log(user);
    //   this.props.authProps.authenticateUser(ture)
    //   this.props.authProps.setAuthUser(user)
    // //   this.props.history.push("/");
    // await Auth.forgotPassword(this.state.email);
    // this.props.history.push("/forgotpasswordsubmit");
    await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.verificationcode,
        this.state.password
    );
    this.props.history.push("/changepasswordconfirmation");

    } catch (error){
      let err = null;
      !error.message ? err= {"message": error } : err = error;

      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Log in</h1>
          <FormErrors formerrors={this.state.errors} />
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="text"
                  id="username"
                  placeholder="Enter username or email"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default ForgotPasswordSubmit;