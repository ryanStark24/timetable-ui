import React from 'react';
import {Route,withRouter} from 'react-router-dom';
import {Navbar, Button} from 'react-bootstrap';
// import styles from './navigation_bar.css';
import LoginModal from './Login_Modal';
 class NavigationBar extends React.Component {
  constructor() {
    super();
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false
    };
  }
  handleShow() {
    this.setState({show: true});
  }
  handleHide() {
    this.setState({show: false});
  }

  render() {
    return (<Navbar inverse={true} staticTop={true}>
      <Navbar.Header>
        <Route render={({history}) => (<Navbar.Brand onClick={() => {
              history.push('/')
            }}>
            Timetable Generator
        < /Navbar.Brand>
    )}/>
        < Navbar.Toggle/>
        < /Navbar.Header>
          < Navbar.Collapse >

            <Navbar.Text pullRight>
              <Button onClick={this.handleShow}>
                Login < /Button> < /Navbar.Text> < LoginModal show = {this.state.show}
                hide = {this.handleHide}
                />
        < /Navbar.Collapse>
        < /Navbar>
    );
  }
}
export default withRouter(NavigationBar);
