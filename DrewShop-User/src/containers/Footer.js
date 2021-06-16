import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        {/* Footer Top */}
        <div className="footer-top section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer about">
                  <div className="logo">
                    <a href="/">
                      <img src="images/logo.png" alt="#" />
                    </a>
                  </div>
                
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-2 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer links">
                  <h4>Information</h4>
                  <ul>
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Faq</a>
                    </li>
                    <li>
                      <a href="#">Terms &amp; Conditions</a>
                    </li>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                    <li>
                      <a href="#">Help</a>
                    </li>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-2 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer links">
                  <h4>Customer Service</h4>
                  <ul>
                    <li>
                      <a href="#">Payment Methods</a>
                    </li>
                    <li>
                      <a href="#">Money-back</a>
                    </li>
                    <li>
                      <a href="#">Returns</a>
                    </li>
                    <li>
                      <a href="#">Shipping</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer social">
                  <h4>Get In Tuch</h4>
                  {/* Single Widget */}
                  <div className="contact">
                    <ul>
                      <li>La Sucipto Malang</li>
                      <li>Indonesia.</li>
                      <li>veronichaflasma@gmail.com</li>
                      <li>082338118330</li>
                    </ul>
                  </div>
                  {/* End Single Widget */}
                  <ul>
                    <li>
                      <a href="#">
                        <i className="ti-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti-flickr" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
            </div>
          </div>
        </div>
        {/* End Footer Top */}
        <div className="copyright">
          <div className="container">
            <div className="inner">
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="left">
                    <p>
                      Copyright © 2021{" "}
                      <a href="http://www.wpthemesgrid.com" target="_blank">
                        Veronicha Flasma
                      </a>{" "}
                      - All Rights Reserved.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="right">
                    <img src="images/payments.png" alt="#" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
