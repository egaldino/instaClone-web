import {Route, Switch} from 'react-router-dom';

import React from 'react';

import Feed from './pages/Feed';
import New from './pages/New';

export default function Routes() {
  return (
    <Switch>
        <Route path="/" exact component={Feed}/>
        <Route path="/new" component={New}/>
    </Switch>
  );
}