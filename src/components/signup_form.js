import React from 'react';
import {form,FormGroup,FormControl,HelpBlock,ControlLabel,Button} from 'react-bootstrap';
import RequestHandler from '../request_handler';
export default class SignupForm extends React.Component{
constructor(){
  super();
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state={
    username:"",
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    country:"",
    college:"",
    shouldLoad:false
  };
}

handleSubmit(event){
  let target=event.target;
  let username=target.username.value.trim();
  let firstname=target.firstname.value.trim();
  let lastname=target.lastname.value.trim();
  let email=target.email.value.trim();
  let password=target.password.value.trim();
  let country=target.country.value.trim();
  let college=target.college.value.trim();
    this.setState({username,firstname,lastname,email,password,country,college},()=>{
      let Data={username,firstname,lastname,email,password,country,college};
      this.setState({shouldLoad:RequestHandler.signup(Data)});
    });

}


  render(){
    return(
      <div className="container">
      <form onSubmit={this.handleSubmit}>
         <FormGroup controlId="username" >
                 <ControlLabel>Username</ControlLabel>
                 <FormControl type="text"    placeholder="Enter a Username" />

         </FormGroup>
         <FormGroup controlId="firstname" >
                   <ControlLabel>FirstName</ControlLabel>
                   <FormControl type="text"    placeholder="Enter your FirstName" />

         </FormGroup>
         <FormGroup controlId="lastname" >
                  <ControlLabel>LastName</ControlLabel>
                  <FormControl type="text"    placeholder="Enter your LastName" />

         </FormGroup>
         <FormGroup controlId="email" >
                <ControlLabel>Email</ControlLabel>
                <FormControl type="text"    placeholder="Enter Email id" />
         </FormGroup>
          <FormGroup controlId="password">
                <ControlLabel>Password</ControlLabel>
                <FormControl  type="password" placeholder="Enter Password" />
          </FormGroup>

        <FormGroup controlId="country" >
              <ControlLabel>Country</ControlLabel>
              <FormControl type="text"    placeholder="Enter your Country" />
        </FormGroup>
            <FormGroup controlId="college" >
                <ControlLabel>College</ControlLabel>
                <FormControl type="text"    placeholder="Enter your College Name" />
        </FormGroup>

         <Button type="submit" >Submit</Button>
       </form>
</div>
    );
  }
}
