import React, { Component } from "react";

class StartSlider extends Component {
  render() {
    return (
<section className="hero-slider">
  {/* Single Slider */}
  <div className="single-slider">
    <div className="container">
      <div className="row no-gutters">
        <div className="col-lg-9 offset-lg-3 col-12">
          <div className="text-inner">
            <div className="row">
              <div className="col-lg-7 col-12">
                <div className="hero-text">
                  <h1>UP TO 50% OFF DREW HOODIE</h1>
                  <div className="button">
                    <a href="/product" className="btn">Shop Now!</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*/ End Single Slider */}
</section>


    );
  }
}

export default StartSlider;
