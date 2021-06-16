import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="header-inner">
        <div className="container">
          <div className="cat-nav-head">
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-9 col-12">
                <div className="menu-area">
                  {/* Main Menu */}
                  <nav className="navbar navbar-expand-lg">
                    <div className="navbar-collapse">
                      <div className="nav-inner">
                        <ul className="nav main-menu menu navbar-nav">
                          <li>
                            <a href="/">Home</a>
                          </li>
                          <li>
                            <a href="/product">Product</a>
                          </li>
                          <li><a href="#">Shop<i className="ti-angle-down"></i><span className="new">check</span></a>
														<ul className="dropdown">
															<li><a href="/cart">Cart</a></li>
															<li><a href="/checkout">Checkout</a></li>
														</ul>
													</li>
                          <li>
                            <a href="/about">About</a>
                          </li>
                          <li>
                            <a href="/contact">Contact Us</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                  {/*/ End Main Menu */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
