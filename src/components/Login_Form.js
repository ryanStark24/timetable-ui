import React from 'react';
import { withRouter } from 'react-router-dom';
import {form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import RequestHandler from '../request_handler';
import FormValidator from "../Form_validation";

import validator from "validator";
const Form_validator = new FormValidator([
  {
    field: "username_email",
    method: validator.isEmpty,
    validWhen: false,
    message: "Please enter your username/email."
  },
  {
    field: "password",
    method: validator.isEmpty,
    validWhen: false,
    message: "Please enter your password."
  }]);
  class LoginForm extends React.Component {
  constructor() {
    super();
    this.onChange=this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username_email: '',
      password: ''
    };
    this.validation=null;
    this.isDisabled=false;

    }
  onChange(name,value){
    this.setState({[name]:value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.isDisabled=true;
    this.validation=Form_validator.validate(this.state);
    this.forceUpdate();
    if(this.validation.isValid){
       RequestHandler.login(this.state.username_email,this.state.password,()=>  this.props.history.push('/dashboard'));
        }
  }
  render() {
    return (<form onSubmit={this.handleSubmit}>
      <FormGroup controlId="username_email" className={
        this.validation !== null
          ? this.validation.username_email.isInvalid && "has-error"
          : ""
      }>
        <ControlLabel>username/email</ControlLabel>
        <FormControl type="text" name="username_email"placeholder="Enter Username or Email id" onChange={e=> this.onChange(e.target.name, e.target.value)}/>
          <span className="help-block">
            {this.validation !== null
              ? this.validation.username_email.message
              : ""}
          </span>

      </FormGroup>

      <FormGroup controlId="formControlsPassword" className={
        this.validation !== null
          ? this.validation.password.isInvalid && "has-error"
          : ""
      }>
        <ControlLabel>Password</ControlLabel>
        <FormControl name="password" type="password" placeholder="Enter password"onChange={e=> this.onChange(e.target.name, e.target.value)}/>
          <span className="help-block">
            {this.validation !== null
              ? this.validation.password.message
              : ""}
          </span>
      </FormGroup>

      <Button disabled={this.isDisabled}type="submit">{this.isDisabled?'Please wait...':'Submit'}</Button>

    </form>);
  }
}
export default withRouter(LoginForm);
