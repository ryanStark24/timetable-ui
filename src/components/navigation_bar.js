import React from 'react';
import {Navbar,Button} from 'react-bootstrap';
import styles from './navigation_bar.css';
import LoginModal from './Login_Modal';
export default class NavigationBar extends React.Component{
  constructor(){
    super();
    this.handleShow = this.handleShow.bind(this);
  this.handleHide = this.handleHide.bind(this);

  this.state = {
    show: false
  };
}
  handleShow() {
    this.setState({ show: true });
  }
  handleHide() {
   this.setState({ show: false });
 }

  render(){
    return(
      <Navbar  inverse={true} staticTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">Time Table Generator</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >

          <Navbar.Text pullRight >
          <Button onClick={this.handleShow}>Login</Button>
           </Navbar.Text>
           <LoginModal show={this.state.show} hide={this.handleHide}/>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
