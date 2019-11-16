import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import TrackList from "../../containers/TrackList/TrackList";
import TrackDetail from "../../containers/TrackDetail/TrackDetail";

class Routes extends Component {
  render() {
    return (
      <div className="Routes">
        <Router>
          <Switch>
            {this.props.children}
            <Route path="/tracks" component={TrackList} exact />
            <Route path="/tracks/:id" component={TrackDetail} exact />
            <Route exact path="/" render={() => <Redirect to="/tracks" />} />
            <Route path="*" render={() => <Redirect to="/tracks" />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Routes;
