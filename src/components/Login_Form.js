import React from 'react';
import {form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import RequestHandler from '../request_handler';
export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: null,
      password: null
    };
  }
  handleSubmit(event) {
    let email = event.target.username_email.value.trim();
    let password = event.target.formControlsPassword.value.trim();
    this.setState({
      email,
      password
    }, () => RequestHandler.login(email, password));

  }
  render() {
    return (<form onSubmit={this.handleSubmit}>
      <FormGroup controlId="username_email">
        <ControlLabel>username/email</ControlLabel>
        <FormControl type="text" placeholder="Enter Username or Email id"/>
      </FormGroup>

      <FormGroup controlId="formControlsPassword">
        <ControlLabel>Password</ControlLabel>
        <FormControl type="password" placeholder="Enter password"/>
      </FormGroup>

      <Button type="submit">Submit</Button>
    </form>);
  }
}
