import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const IsLoggedIn = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isLogged = !sessionStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={props =>
        isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default IsLoggedIn;