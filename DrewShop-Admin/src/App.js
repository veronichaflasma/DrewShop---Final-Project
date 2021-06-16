import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/Products";
import Orders from "./components/pages/Orders";
import Login from "./components/pages/Login";
import ProtectedRoute from "./components/PrivateRoute";

function App(props) {
  const { isAuthenticated, isVerifying } = props;

  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Dashboard}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/products"
        component={Products}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/orders"
        component={Orders}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/login" component={Login} />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}
export default connect(mapStateToProps)(App);
