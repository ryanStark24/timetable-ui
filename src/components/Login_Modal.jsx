import React from 'react';
import {Modal} from 'react-bootstrap';
import LoginForm from './Login_Form';
export default class LoginModal extends React.Component{

  render(){
    return(
      <Modal     show={this.props.show}
         onHide={this.props.hide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
            Login
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm/>
          </Modal.Body>

        </Modal>
    );
  }
}
