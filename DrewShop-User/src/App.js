import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import Footer from "./containers/Footer";
import Products from "./components/pages/Products/Products";
import Header from "./containers/Header";
import Account from "./components/pages/Account/Account";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Contact from "./components/pages/Contact";
import About from "./components/pages/About";
import ProtectedRoute from "./components/PrivateRoute";


function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <ProtectedRoute
            exact
            path="/checkout"
            component={Checkout}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/account"
            component={Account}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <Route exact path="/" component={Home} />
          <Route path="/product" component={Products} />
          <Route path="/cart" component={Cart} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
// }

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}
export default connect(mapStateToProps)(App);
