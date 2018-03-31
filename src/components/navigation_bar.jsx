import React from 'react';
import {Route,withRouter} from 'react-router-dom';
import {Navbar, Button} from 'react-bootstrap';
// import styles from './navigation_bar.css';
import LoginModal from './Login_Modal';
 class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
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
        </Navbar.Brand>
    )}/>
        <Navbar.Toggle/>
        </Navbar.Header>
          < Navbar.Collapse >

            <Navbar.Text pullRight>
              {!sessionStorage.getItem('token')?'':"Welcome, " + sessionStorage.getItem('name')}
               <span>&nbsp;&nbsp;&nbsp;</span>
              {!sessionStorage.getItem('token')? <Button onClick={this.handleShow}>
                Login </Button> :<Button bsStyle="danger"onClick={()=>{sessionStorage.clear();this.props.history.push('/');}}> Logout </Button>}
                </Navbar.Text>
                < LoginModal show = {this.state.show}
               hide = {this.handleHide}
               />
        </Navbar.Collapse>
        </Navbar>
    );
  }
}
export default withRouter(NavigationBar);
