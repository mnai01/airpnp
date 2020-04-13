import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SearchPage from "../SearchPage/SearchPage";

const TileOverview = () => {
  return (
    <Router>
      <p>
        <Link to="/Test">Test</Link>
      </p>
      <Switch>
        <Route path="/Test">
          <SearchPage></SearchPage>
        </Route>
      </Switch>
    </Router>
  );
};

export default TileOverview;
