import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// Authentication
import LoginService from "./services/LoginService";

// Template
import Template from "./template";

// Routes
import Login from "./containers/Login";
import Vehicles from "./containers/Vehicles";
import NotFound from "./containers/NotFound";

// Redux
import store from "./redux/store";

// Private routes
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      LoginService.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Template>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/veiculos" component={Vehicles} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Template>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
