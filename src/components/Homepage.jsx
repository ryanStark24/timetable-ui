import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {Grid, Row, Col, Jumbotron} from 'react-bootstrap';
import NavigationBar from './navigation_bar';
import SignupForm from './signup_form';

class Homepage extends Component {
  componentWillMount(){
     if(sessionStorage.getItem('token')) this.props.history.push('/dashboard');
  }

  render() {
    return (<div>
      <NavigationBar/>
      <Grid>
        <Row>
          <Col md={5} mdOffset={3}>
            <Jumbotron >
              <h2>SignUp</h2>

              <SignupForm/>
            </Jumbotron>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Grid>

    </div>);
  }

}

export default withRouter(Homepage);
