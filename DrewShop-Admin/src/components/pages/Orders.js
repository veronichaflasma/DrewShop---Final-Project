import React, { Component } from "react";
import Sidebar from "../../containers/Sidebar";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import Navbar from "../../containers/Navbar";
import TableOrders from "../tables/TableOrders";
import firebaseConfig from "../../firebase/config";
import firebase from "firebase";

class Orders extends Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.state = {
      listorder: [],
      orderprep: null,
    };
  }
  fetchProduct = () => {
    let ref = firebase.database().ref("/orders");
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState({ listorder: state });
    });
  };

  saveProduct = () => {
    firebase.database().ref("/orders").set(this.state.listorder);
  };

  componentDidMount() {
    this.fetchProduct();
  }

  render() {
    return (
      <div>
        <Sidebar />
        <div className="main-content" id="panel">
          <Navbar />
          <div className="header bg-yellow pb-6">
            <div className="container-fluid">
              <div className="header-body">
                <div className="row align-items-center py-4">
                  <div className="col-lg-6 col-7">
                    <h6 className="h2 text-black d-inline-block mb-0">
                      Default
                    </h6>
                    <nav
                      aria-label="breadcrumb"
                      className="d-none d-md-inline-block ml-md-4"
                    >
                      <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                        <li className="breadcrumb-item">
                          <a href="#">
                            <i className="fas fa-home" />
                          </a>
                        </li>
                        <li className="breadcrumb-item">
                          <a href="#">Orders</a>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Default
                        </li>
                      </ol>
                    </nav>
                  </div>
                  <div className="col-lg-6 col-5 text-right">
                    <a href="#" className="btn btn-sm btn-neutral">
                      New
                    </a>
                    <a href="#" className="btn btn-sm btn-neutral">
                      Filters
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid mt--6">
            <TableOrders />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
