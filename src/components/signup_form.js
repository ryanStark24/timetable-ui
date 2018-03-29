import React from "react";
import { form, FormGroup, FormControl, Button } from "react-bootstrap";
import RequestHandler from "../request_handler";
import FormValidator from "../Form_validation";
import validator from "validator";
const Form_validator = new FormValidator([
  {
    field: "username",
    method: validator.isEmpty,
    validWhen: false,
    message: "Please provide an username."
  },
  {
    field: "firstname",
    method: validator.isEmpty,
    validWhen: false,
    message: "Please provide an firstname."
  },
  {
    field: "lastname",
    method: validator.isEmpty,
    validWhen: false,
    message: "Please provide an lastname."
  },
  {
    field: "password",
    method: validator.isEmpty,
    validWhen: false,
    message: "Please provide a password."
  },
  {
    field: "college",
    method: validator.isEmpty,
    validWhen: false,
    message: "Please provide your college name."
  },
  {
    field: "country",
    method: validator.isEmpty,
    validWhen: false,
    message: "Please provide your country name."
  },

  {
    field: "email",
    method: validator.isEmpty,
    validWhen: false,
    message: "Please provide an email."
  },
  {
    field: "email",
    method: validator.isEmail,
    validWhen: true,
    message: "That is not a valid email."
  }
]);

export default class SignupForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      country: "",
      college: ""
    };
    this.validation = undefined; //Form_validator.validate(this.state);
  }

  onChange(value, name) {
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.validation = Form_validator.validate(this.state);
    this.forceUpdate();
    if (this.validation.isValid) {
      RequestHandler.signup(this.state);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <FormGroup
          controlId="username"
          className={
            this.validation !== undefined
              ? this.validation.username.isInvalid && "has-error"
              : ""
          }
        >
          <FormControl
            type="text"
            name="username"
            value={this.state.username}
            onChange={e => this.onChange(e.target.value, e.target.name)}
            placeholder="Enter a Username"
          />
          <span className="help-block">
            {this.validation !== undefined
              ? this.validation.username.message
              : ""}
          </span>
        </FormGroup>
        <FormGroup
          controlId="firstname"
          className={
            this.validation !== undefined
              ? this.validation.firstname.isInvalid && "has-error"
              : ""
          }
        >
          <FormControl
            type="text"
            placeholder="Enter your FirstName"
            name="firstname"
            value={this.state.firstname}
            onChange={e => this.onChange(e.target.value, e.target.name)}
          />
          <span className="help-block">
            {this.validation !== undefined
              ? this.validation.firstname.message
              : ""}
          </span>
        </FormGroup>{" "}
        <FormGroup
          controlId="lastname"
          className={
            this.validation !== undefined
              ? this.validation.lastname.isInvalid && "has-error"
              : ""
          }
        >
          <FormControl
            type="text"
            placeholder="Enter your LastName"
            name="lastname"
            value={this.state.lastname}
            onChange={e => this.onChange(e.target.value, e.target.name)}
          />
          <span className="help-block">
            {this.validation !== undefined
              ? this.validation.lastname.message
              : ""}
          </span>
        </FormGroup>
        <FormGroup
          controlId="email"
          className={
            this.validation !== undefined
              ? this.validation.email.isInvalid && "has-error"
              : ""
          }
        >
          <FormControl
            type="text"
            placeholder="Enter Email id"
            name="email"
            value={this.state.email}
            onChange={e => this.onChange(e.target.value, e.target.name)}
          />
          <span className="help-block">
            {this.validation !== undefined ? this.validation.email.message : ""}
          </span>
        </FormGroup>{" "}
        <FormGroup
          controlId="password"
          className={
            this.validation !== undefined
              ? this.validation.password.isInvalid && "has-error"
              : ""
          }
        >
          <FormControl
            type="password"
            placeholder="Enter Password"
            name="password"
            value={this.state.password}
            onChange={e => this.onChange(e.target.value, e.target.name)}
          />
          <span className="help-block">
            {this.validation !== undefined
              ? this.validation.password.message
              : ""}
          </span>
        </FormGroup>
        <FormGroup
          controlId="country"
          className={
            this.validation !== undefined
              ? this.validation.country.isInvalid && "has-error"
              : ""
          }
        >
          <FormControl
            type="text"
            placeholder="Enter your Country"
            name="country"
            value={this.state.country}
            onChange={e => this.onChange(e.target.value, e.target.name)}
          />
          <span className="help-block">
            {this.validation !== undefined
              ? this.validation.country.message
              : ""}
          </span>
        </FormGroup>{" "}
        <FormGroup
          controlId="college"
          className={
            this.validation !== undefined
              ? this.validation.college.isInvalid && "has-error"
              : ""
          }
        >
          <FormControl
            type="text"
            placeholder="Enter your College Name"
            name="college"
            value={this.state.college}
            onChange={e => this.onChange(e.target.value, e.target.name)}
          />
          <span className="help-block">
            {this.validation !== undefined
              ? this.validation.college.message
              : ""}
          </span>
        </FormGroup>{" "}
        <Button type="submit"> Submit </Button>
      </form>
    );
  }
}
