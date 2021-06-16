import React, { Component } from "react";
import ShopNewsLetter from "../section/ShopNewsLetter";

class Contact extends Component {
  render() {
    return (
      <div>
        {/* Start Contact */}
        <section id="contact-us" className="contact-us section">
          <div className="container">
            <div className="contact-head">
              <div className="row">
                <div className="col-lg-8 col-12">
                  <div className="form-main">
                    <div className="title">
                      <h4>Get in touch</h4>
                      <h3>Write us a message</h3>
                    </div>
                    <form className="form" method="post" action="mail/mail.php">
                      <div className="row">
                        <div className="col-lg-6 col-12">
                          <div className="form-group">
                            <label>
                              Your Name<span>*</span>
                            </label>
                            <input name="name" type="text" placeholder />
                          </div>
                        </div>
                        <div className="col-lg-6 col-12">
                          <div className="form-group">
                            <label>
                              Your Subjects<span>*</span>
                            </label>
                            <input name="subject" type="text" placeholder />
                          </div>
                        </div>
                        <div className="col-lg-6 col-12">
                          <div className="form-group">
                            <label>
                              Your Email<span>*</span>
                            </label>
                            <input name="email" type="email" placeholder />
                          </div>
                        </div>
                        <div className="col-lg-6 col-12">
                          <div className="form-group">
                            <label>
                              Your Phone<span>*</span>
                            </label>
                            <input
                              name="company_name"
                              type="text"
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group message">
                            <label>
                              your message<span>*</span>
                            </label>
                            <textarea
                              name="message"
                              placeholder
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group button">
                            <button type="submit" className="btn ">
                              Send Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4 col-12">
                  <div className="single-head">
                    <div className="single-info">
                      <i className="fa fa-phone" />
                      <h4 className="title">Call us Now:</h4>
                      <ul>
                        <li>082338118330</li>
                        <li>082338118330</li>
                      </ul>
                    </div>
                    <div className="single-info">
                      <i className="fa fa-envelope-open" />
                      <h4 className="title">Email:</h4>
                      <ul>
                        <li>
                          <a href="mailto:veronichaflasma@gmail.com">
                            veronichaflasma@gmail.com
                          </a>
                        </li>
                        <li>
                          <a href="mailto:veronichaflasma@gmail.com">
                          veronichaflasma@gmail.com
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="single-info">
                      <i className="fa fa-location-arrow" />
                      <h4 className="title">Our Address:</h4>
                      <ul>
                        <li>
                          Jl Raya LA Sucipto Malang, <br/>
                          Jawa Timur<br/>
                          Indoneia
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*/ End Contact */}

        <ShopNewsLetter />
      </div>
    );
  }
}

export default Contact;
