import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { Layout } from './Layouts';
import { Users, UserDetail, UserAdd } from './Users';


export default class App extends Component {

  render() {
    return (
      <Switch>
        <Layout exact path="/" component={Users} />
        <Layout exact path="/user/:action" component={UserAdd} />
        <Layout exact path="/user/v:id" component={UserDetail} />
        <Layout exact path="/user/:action/:id/" component={UserDetail} />
        <Redirect to="/" />
      </Switch>
    )
  }
}
