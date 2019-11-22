import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { TrackDetail, TrackList } from "containers/index";

const Routes: React.FC<any> = (props) => <div className="Routes">
<Router>
  <Switch>
    {props.children}
    <Route path="/tracks" component={TrackList} exact />
    <Route path="/tracks/:id" component={TrackDetail} exact />
    <Route exact path="/" render={() => <Redirect to="/tracks" />} />
    <Route path="*" render={() => <Redirect to="/tracks" />} />
  </Switch>
</Router>
</div>;


export default Routes;
