import React from 'react'
import {Header} from './'
import { Route } from 'react-router-dom'

const Layout = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <div>
        <Header {...props}/>
        <Component {...props} />
      </div>
    )} />
  )
}

export default Layout

