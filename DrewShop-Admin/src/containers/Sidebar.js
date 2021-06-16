import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <nav
        className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-yellow"
        id="sidenav-main"
      >
        <div className="scrollbar-inner">
          {/* Brand */}
          <div className="sidenav-header  align-items-center">
            <a className="navbar-brand" href="javascript:void(0)">
              {/* <h1 class="display-4">DREW ADMIN</h1> */}
              <img src="../assets/img/brand/logo.png" className="navbar-brand-img" alt="..." />
            </a>
          </div>
          <div className="navbar-inner">
            {/* Collapse */}
            <div
              className="collapse navbar-collapse"
              id="sidenav-collapse-main"
            >
              {/* Nav items */}
              <ul className="navbar-nav ">
              <li className="nav-item">
                  <a className="nav-link" href="/">
                    {/* <i className="ni ni-tv-2 text-primary" /> */}
                    <span className="nav-link-text"></span>
                  </a>
                </li>
                <li className="nav-item bg-white">
                  <a className="nav-link" href="/">
                    <i className="ni ni-tv-2 text-primary" />
                    <span className="nav-link-text">Dashboard</span>
                  </a>
                </li>
      
                <li className="nav-item bg-white">
                  <a className="nav-link" href="/products">
                    <i className="ni ni-planet text-orange" />
                    <span className="nav-link-text">Products</span>
                  </a>
                </li>
                <li className="nav-item bg-white">
                  <a className="nav-link" href="/orders">
                    <i className="ni ni-shop text-red" />
                    <span className="nav-link-text">Orders</span>
                  </a>
                </li>
              </ul>
              {/* Divider */}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Sidebar;
