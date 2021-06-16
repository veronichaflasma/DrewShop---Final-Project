import React, { Component } from "react";
import Sidebar from "../../containers/Sidebar";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import Navbar from "../../containers/Navbar";

class Carts extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div className="main-content" id="panel">
          <Navbar />
          <Header />
          <div className="container-fluid mt--6">
            <div className="row ">
              <div className="col-xl-8 order-xl-1 ">
                <div className="card ">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h3 className="mb-0">Orders</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="card center" style={{ width: "25rem" }}>
                        <img
                          className="card-img-top"
                          src="../../assets/img/theme/img-1-1000x600.jpg"
                          alt="Card image cap"
                        />
                        <div className="card-body">
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFileLang"
                              lang="en"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFileLang"
                            >
                              Select file
                            </label>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                      <h6 className="heading-small text-muted mb-4">
                        Orders information
                      </h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Product Name
                              </label>
                              <input
                                type="text"
                                id="input-first-name"
                                className="form-control"
                                placeholder="Veronicha"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Category
                              </label>
                              <input
                                type="text"
                                id="input-last-name"
                                className="form-control"
                                placeholder="Flasma"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Price
                              </label>
                              <input
                                type="email"
                                id="input-email"
                                className="form-control"
                                placeholder="vero@example.com"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Stock
                              </label>
                              <input
                                type="text"
                                id="input-phone-number"
                                className="form-control"
                                placeholder="082338xxxx"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <button className="btn btn-primary" type="button">
                                Save
                              </button>
                              <button type="button" className="btn btn-danger">
                                Clear
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Carts;
