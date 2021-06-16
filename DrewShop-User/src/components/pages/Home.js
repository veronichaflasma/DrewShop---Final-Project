import React, { Component } from "react";

import StartSlider from "../section/StartSlider";
import ServicesArea from "../section/ServicesArea";
import ShopNewsLetter from "../section/ShopNewsLetter";
import MostPopular from "../section/MostPopular";

class Home extends Component {
  render() {
    return (
      <div>
        <StartSlider />
        {/* <MostPopular /> */}
        <ServicesArea />
        <ShopNewsLetter />
      </div>
    );
  }
}

export default Home;
