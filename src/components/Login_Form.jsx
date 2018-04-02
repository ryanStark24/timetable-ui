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
      password: '',
      validation:null,
      isDisabled:false
    };
  

    }
  onChange(name,value){
    this.setState({[name]:value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.state.validation=Form_validator.validate({username_email:this.state.username_email,password:this.state.password});
    if(this.state.validation.isValid){
      this.setState({isDisabled:true});
       RequestHandler.login(this.state.username_email,this.state.password,()=>this.changePage());
      }
  }
  changePage(){
    this.props.history.push('/dashboard');
  }
  render() {
    return (<form onSubmit={this.handleSubmit}>
      <FormGroup controlId="username_email" className={
        this.state.validation !== null
          ? this.state.validation.username_email.isInvalid && "has-error"
          : ""
      }>
        <ControlLabel>username/email</ControlLabel>
        <FormControl type="text" name="username_email"placeholder="Enter Username or Email id" onChange={e=> this.onChange(e.target.name, e.target.value)}/>
          <span className="help-block">
            {this.state.validation !== null
              ? this.state.validation.username_email.message
              : ""}
          </span>

      </FormGroup>

      <FormGroup controlId="formControlsPassword" className={
        this.state.validation !== null
          ? this.state.validation.password.isInvalid && "has-error"
          : ""
      }>
        <ControlLabel>Password</ControlLabel>
        <FormControl name="password" type="password" placeholder="Enter password"onChange={e=> this.onChange(e.target.name, e.target.value)}/>
          <span className="help-block">
            {this.state.validation !== null
              ? this.state.validation.password.message
              : ""}
          </span>
      </FormGroup>

      <Button disabled={this.state.isDisabled}type="submit">{this.state.isDisabled?'Please wait...':'Submit'}</Button>

    </form>);
  }
}
export default withRouter(LoginForm);
