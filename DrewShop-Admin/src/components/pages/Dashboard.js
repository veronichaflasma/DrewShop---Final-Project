import React, { Component } from "react";
import Sidebar from "../../containers/Sidebar";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import Navbar from "../../containers/Navbar";

class Dashboard extends Component {
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
                          <a href="#">Dashboards</a>
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
                {/* Card stats */}
                <div className="row">
                  <div className="col-xl-3 col-md-6">
                    <div className="card card-stats">
                      {/* Card body */}
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <h5 className="card-title text-uppercase text-muted mb-0">
                              Total traffic
                            </h5>
                            <span className="h2 font-weight-bold mb-0">
                              350,897
                            </span>
                          </div>
                          <div className="col-auto">
                            <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                              <i className="ni ni-active-40" />
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 mb-0 text-sm">
                          <span className="text-success mr-2">
                            <i className="fa fa-arrow-up" /> 3.48%
                          </span>
                          <span className="text-nowrap">Since last month</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card card-stats">
                      {/* Card body */}
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <h5 className="card-title text-uppercase text-muted mb-0">
                              New users
                            </h5>
                            <span className="h2 font-weight-bold mb-0">
                              2,356
                            </span>
                          </div>
                          <div className="col-auto">
                            <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                              <i className="ni ni-chart-pie-35" />
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 mb-0 text-sm">
                          <span className="text-success mr-2">
                            <i className="fa fa-arrow-up" /> 3.48%
                          </span>
                          <span className="text-nowrap">Since last month</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card card-stats">
                      {/* Card body */}
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <h5 className="card-title text-uppercase text-muted mb-0">
                              Sales
                            </h5>
                            <span className="h2 font-weight-bold mb-0">
                              924
                            </span>
                          </div>
                          <div className="col-auto">
                            <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                              <i className="ni ni-money-coins" />
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 mb-0 text-sm">
                          <span className="text-success mr-2">
                            <i className="fa fa-arrow-up" /> 3.48%
                          </span>
                          <span className="text-nowrap">Since last month</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card card-stats">
                      {/* Card body */}
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <h5 className="card-title text-uppercase text-muted mb-0">
                              Performance
                            </h5>
                            <span className="h2 font-weight-bold mb-0">
                              49,65%
                            </span>
                          </div>
                          <div className="col-auto">
                            <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                              <i className="ni ni-chart-bar-32" />
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 mb-0 text-sm">
                          <span className="text-success mr-2">
                            <i className="fa fa-arrow-up" /> 3.48%
                          </span>
                          <span className="text-nowrap">Since last month</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid mt--6">
            <div className="row">
              <div className="col-xl-8">
                <div className="card">
                  <div className="card-header border-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Page visits</h3>
                      </div>
                      <div className="col text-right">
                        <a href="#!" className="btn btn-sm btn-primary">
                          See all
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    {/* Projects table */}
                    <table className="table align-items-center table-flush">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Page name</th>
                          <th scope="col">Visitors</th>
                          <th scope="col">Unique users</th>
                          <th scope="col">Bounce rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">/argon/</th>
                          <td>4,569</td>
                          <td>340</td>
                          <td>
                            <i className="fas fa-arrow-up text-success mr-3" />{" "}
                            46,53%
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">/argon/index.html</th>
                          <td>3,985</td>
                          <td>319</td>
                          <td>
                            <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                            46,53%
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">/argon/charts.html</th>
                          <td>3,513</td>
                          <td>294</td>
                          <td>
                            <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                            36,49%
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">/argon/tables.html</th>
                          <td>2,050</td>
                          <td>147</td>
                          <td>
                            <i className="fas fa-arrow-up text-success mr-3" />{" "}
                            50,87%
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">/argon/profile.html</th>
                          <td>1,795</td>
                          <td>190</td>
                          <td>
                            <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                            46,53%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="card">
                  <div className="card-header border-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Social traffic</h3>
                      </div>
                      <div className="col text-right">
                        <a href="#!" className="btn btn-sm btn-primary">
                          See all
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    {/* Projects table */}
                    <table className="table align-items-center table-flush">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Referral</th>
                          <th scope="col">Visitors</th>
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Facebook</th>
                          <td>1,480</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">60%</span>
                              <div>
                                <div className="progress">
                                  <div
                                    className="progress-bar bg-gradient-danger"
                                    role="progressbar"
                                    aria-valuenow={60}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "60%" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Facebook</th>
                          <td>5,480</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">70%</span>
                              <div>
                                <div className="progress">
                                  <div
                                    className="progress-bar bg-gradient-success"
                                    role="progressbar"
                                    aria-valuenow={70}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "70%" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Google</th>
                          <td>4,807</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">80%</span>
                              <div>
                                <div className="progress">
                                  <div
                                    className="progress-bar bg-gradient-primary"
                                    role="progressbar"
                                    aria-valuenow={80}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "80%" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Instagram</th>
                          <td>3,678</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">75%</span>
                              <div>
                                <div className="progress">
                                  <div
                                    className="progress-bar bg-gradient-info"
                                    role="progressbar"
                                    aria-valuenow={75}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "75%" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">twitter</th>
                          <td>2,645</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">30%</span>
                              <div>
                                <div className="progress">
                                  <div
                                    className="progress-bar bg-gradient-warning"
                                    role="progressbar"
                                    aria-valuenow={30}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "30%" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
