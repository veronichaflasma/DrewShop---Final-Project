import React, { Component } from "react";
import firebase from "firebase";
import firebaseConfig from "../../firebase/config";

class Checkout extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      checkoutinfo: {},
      listCart: [],
      productCart: [],
      totalprice: 0,
      loading: true,
    };
  }
  cartItem = (product, cart) => {
    let newCart = {
      ...product,
      ...cart,
    };
    return newCart;
  };
  fetchCart = () => {
    const cartref = firebase.database().ref(`/carts/veronicha@gmail`);

    const productref = firebase.database().ref("/list_product");
    cartref.on("value", (snapshot) => {
      let carts = snapshot.val();
      if (carts !== null) {
        this.setState({ listCart: carts });
      }
      productref.on("value", (productSnapshot) => {
        console.log(productSnapshot);
        let products = productSnapshot.val();
        let newproductcart = [];
        if (products != null && carts != null) {
          let total = 0;
          products.map((item) => {
            carts.products.map((cart) => {
              if (item.id === cart.id) {
                newproductcart.push(this.cartItem(item, cart));
                this.setState({ productCart: newproductcart, loading: false });
                total += item.price * cart.qty;
              }
            });
          });
          this.countTotalPrice(total);
        } else {
          this.setState({ productCart: [], totalprice: 0 });
        }
      });
    });
  };
  componentDidMount() {
    this.fetchCart();
  }
  countTotalPrice = (price) => {
    this.setState({ totalprice: price });
  };
  onchangeinput = (e) => {
    let info = {
      ...this.state.checkoutinfo,
    };
    switch (e.target.name) {
      case "firstname":
        info.firstname = e.target.value;
        break;
      case "lastname":
        info.lastname = e.target.value;
        break;
      case "email":
        info.email = e.target.value;
        break;
      case "phone":
        info.phone = e.target.value;
        break;
      case "country_name":
        info.country = e.target.value;
        break;
      case "address":
        info.address = e.target.value;
        break;
      case "post":
        info.postal = e.target.value;
        break;
    }
    this.setState({ checkoutinfo: info });
  };
  validInput = () => {
    const info = this.state.checkoutinfo;
    return (
      info.firstname !== undefined &&
      info.lastname !== undefined &&
      info.email !== undefined &&
      info.phone !== undefined &&
      info.country !== undefined &&
      info.address !== undefined &&
      info.postal !== undefined
    );
  };
  proceedCheckout = () => {
    if (this.state.productCart.length > 0) {
      if (this.validInput()) {
        let current = new Date();
        let cDate =
          current.getFullYear() +
          "-" +
          (current.getMonth() + 1) +
          "-" +
          current.getDate();
        let cTime =
          current.getHours() +
          ":" +
          current.getMinutes() +
          ":" +
          current.getSeconds();
        let dateTime = cDate + " " + cTime;
        let order = {
          infos: this.state.checkoutinfo,
          user: "veronicha@gmail.com",
          ...this.state.listCart,
          ...this.state.totalprice,
          status: "On Process",
          orderid: "ORD" + new Date().getTime().toString(),
          orderdatetime: dateTime,
        };

        const checkoutref = firebase.database().ref("/orders");
        checkoutref.get().then((snapshot) => {
          let orders = snapshot.val();
          if (orders === null) {
            orders = [];
            orders.push(order);
          } else {
            orders.push(order);
          }
          checkoutref.set(orders).then((val) => {
            alert("Order Success");
            this.deletecart();
          });
        });
      } else {
        alert("Please Fill the Form!");
      }
    } else {
      alert("Nothing to Checkout");
    }
  };
  deletecart = () => {
    firebase
      .database()
      .ref(`/carts/veronicha@gmail`)
      .remove((onComplete) => {
        console.log("cart deleted");
      });
  };
  render() {
    return (
      <section className="shop checkout section">
        <div className="form">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-12">
                <div className="checkout-form">
                  <h2>Make Your Checkout Here</h2>
                  <p>Please fill form in order to checkout</p>
                  {/* Form */}
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          First Name<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          required="required"
                          onChange={this.onchangeinput}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Last Name<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          required="required"
                          onChange={this.onchangeinput}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Email Address<span>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required="required"
                          onChange={this.onchangeinput}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Phone Number<span>*</span>
                        </label>
                        <input
                          type="number"
                          name="phone"
                          required="required"
                          onChange={this.onchangeinput}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Country<span>*</span>
                        </label>
                        <br />
                        <select
                          name="country_name"
                          id="country"
                          onChange={this.onchangeinput}
                          defaultValue="ID"
                        >
                          <option></option>
                          <option value="AF">Afghanistan</option>
                          <option value="AX">Åland Islands</option>
                          <option value="AL">Albania</option>
                          <option value="DZ">Algeria</option>
                          <option value="AS">American Samoa</option>
                          <option value="AD">Andorra</option>
                          <option value="AO">Angola</option>
                          <option value="AI">Anguilla</option>
                          <option value="AQ">Antarctica</option>
                          <option value="AG">Antigua and Barbuda</option>
                          <option value="AR">Argentina</option>
                          <option value="AM">Armenia</option>
                          <option value="AW">Aruba</option>
                          <option value="AU">Australia</option>
                          <option value="AT">Austria</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="BS">Bahamas</option>
                          <option value="BH">Bahrain</option>
                          <option value="BD">Bangladesh</option>
                          <option value="BB">Barbados</option>
                          <option value="BY">Belarus</option>
                          <option value="BE">Belgium</option>
                          <option value="BZ">Belize</option>
                          <option value="BJ">Benin</option>
                          <option value="BM">Bermuda</option>
                          <option value="BT">Bhutan</option>
                          <option value="BO">Bolivia</option>
                          <option value="BA">Bosnia and Herzegovina</option>
                          <option value="BW">Botswana</option>
                          <option value="BV">Bouvet Island</option>
                          <option value="BR">Brazil</option>
                          <option value="IO">
                            British Indian Ocean Territory
                          </option>
                          <option value="VG">British Virgin Islands</option>
                          <option value="BN">Brunei</option>
                          <option value="BG">Bulgaria</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="BI">Burundi</option>
                          <option value="KH">Cambodia</option>
                          <option value="CM">Cameroon</option>
                          <option value="CA">Canada</option>
                          <option value="CV">Cape Verde</option>
                          <option value="KY">Cayman Islands</option>
                          <option value="CF">Central African Republic</option>
                          <option value="TD">Chad</option>
                          <option value="CL">Chile</option>
                          <option value="CN">China</option>
                          <option value="CX">Christmas Island</option>
                          <option value="CC">Cocos [Keeling] Islands</option>
                          <option value="CO">Colombia</option>
                          <option value="KM">Comoros</option>
                          <option value="CG">Congo - Brazzaville</option>
                          <option value="CD">Congo - Kinshasa</option>
                          <option value="CK">Cook Islands</option>
                          <option value="CR">Costa Rica</option>
                          <option value="CI">Côte d’Ivoire</option>
                          <option value="HR">Croatia</option>
                          <option value="CU">Cuba</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="DJ">Djibouti</option>
                          <option value="DM">Dominica</option>
                          <option value="DO">Dominican Republic</option>
                          <option value="EC">Ecuador</option>
                          <option value="EG">Egypt</option>
                          <option value="SV">El Salvador</option>
                          <option value="GQ">Equatorial Guinea</option>
                          <option value="ER">Eritrea</option>
                          <option value="EE">Estonia</option>
                          <option value="ET">Ethiopia</option>
                          <option value="FK">Falkland Islands</option>
                          <option value="FO">Faroe Islands</option>
                          <option value="FJ">Fiji</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="GF">French Guiana</option>
                          <option value="PF">French Polynesia</option>
                          <option value="TF">
                            French Southern Territories
                          </option>
                          <option value="GA">Gabon</option>
                          <option value="GM">Gambia</option>
                          <option value="GE">Georgia</option>
                          <option value="DE">Germany</option>
                          <option value="GH">Ghana</option>
                          <option value="GI">Gibraltar</option>
                          <option value="GR">Greece</option>
                          <option value="GL">Greenland</option>
                          <option value="GD">Grenada</option>
                          <option value="GP">Guadeloupe</option>
                          <option value="GU">Guam</option>
                          <option value="GT">Guatemala</option>
                          <option value="GG">Guernsey</option>
                          <option value="GN">Guinea</option>
                          <option value="GW">Guinea-Bissau</option>
                          <option value="GY">Guyana</option>
                          <option value="HT">Haiti</option>
                          <option value="HM">
                            Heard Island and McDonald Islands
                          </option>
                          <option value="HN">Honduras</option>
                          <option value="HK">Hong Kong SAR China</option>
                          <option value="HU">Hungary</option>
                          <option value="IS">Iceland</option>
                          <option value="IN">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="IR">Iran</option>
                          <option value="IQ">Iraq</option>
                          <option value="IE">Ireland</option>
                          <option value="IM">Isle of Man</option>
                          <option value="IL">Israel</option>
                          <option value="IT">Italy</option>
                          <option value="JM">Jamaica</option>
                          <option value="JP">Japan</option>
                          <option value="JE">Jersey</option>
                          <option value="JO">Jordan</option>
                          <option value="KZ">Kazakhstan</option>
                          <option value="KE">Kenya</option>
                          <option value="KI">Kiribati</option>
                          <option value="KW">Kuwait</option>
                          <option value="KG">Kyrgyzstan</option>
                          <option value="LA">Laos</option>
                          <option value="LV">Latvia</option>
                          <option value="LB">Lebanon</option>
                          <option value="LS">Lesotho</option>
                          <option value="LR">Liberia</option>
                          <option value="LY">Libya</option>
                          <option value="LI">Liechtenstein</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MO">Macau SAR China</option>
                          <option value="MK">Macedonia</option>
                          <option value="MG">Madagascar</option>
                          <option value="MW">Malawi</option>
                          <option value="MY">Malaysia</option>
                          <option value="MV">Maldives</option>
                          <option value="ML">Mali</option>
                          <option value="MT">Malta</option>
                          <option value="MH">Marshall Islands</option>
                          <option value="MQ">Martinique</option>
                          <option value="MR">Mauritania</option>
                          <option value="MU">Mauritius</option>
                          <option value="YT">Mayotte</option>
                          <option value="MX">Mexico</option>
                          <option value="FM">Micronesia</option>
                          <option value="MD">Moldova</option>
                          <option value="MC">Monaco</option>
                          <option value="MN">Mongolia</option>
                          <option value="ME">Montenegro</option>
                          <option value="MS">Montserrat</option>
                          <option value="MA">Morocco</option>
                          <option value="MZ">Mozambique</option>
                          <option value="MM">Myanmar [Burma]</option>
                          <option value="NA">Namibia</option>
                          <option value="NR">Nauru</option>
                          <option value="NP">Nepal</option>
                          <option value="NL">Netherlands</option>
                          <option value="AN">Netherlands Antilles</option>
                          <option value="NC">New Caledonia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="NI">Nicaragua</option>
                          <option value="NE">Niger</option>
                          <option value="NG">Nigeria</option>
                          <option value="NU">Niue</option>
                          <option value="NF">Norfolk Island</option>
                          <option value="MP">Northern Mariana Islands</option>
                          <option value="KP">North Korea</option>
                          <option value="NO">Norway</option>
                          <option value="OM">Oman</option>
                          <option value="PK">Pakistan</option>
                          <option value="PW">Palau</option>
                          <option value="PS">Palestinian Territories</option>
                          <option value="PA">Panama</option>
                          <option value="PG">Papua New Guinea</option>
                          <option value="PY">Paraguay</option>
                          <option value="PE">Peru</option>
                          <option value="PH">Philippines</option>
                          <option value="PN">Pitcairn Islands</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="PR">Puerto Rico</option>
                          <option value="QA">Qatar</option>
                          <option value="RE">Réunion</option>
                          <option value="RO">Romania</option>
                          <option value="RU">Russia</option>
                          <option value="RW">Rwanda</option>
                          <option value="BL">Saint Barthélemy</option>
                          <option value="SH">Saint Helena</option>
                          <option value="KN">Saint Kitts and Nevis</option>
                          <option value="LC">Saint Lucia</option>
                          <option value="MF">Saint Martin</option>
                          <option value="PM">Saint Pierre and Miquelon</option>
                          <option value="VC">
                            Saint Vincent and the Grenadines
                          </option>
                          <option value="WS">Samoa</option>
                          <option value="SM">San Marino</option>
                          <option value="ST">São Tomé and Príncipe</option>
                          <option value="SA">Saudi Arabia</option>
                          <option value="SN">Senegal</option>
                          <option value="RS">Serbia</option>
                          <option value="SC">Seychelles</option>
                          <option value="SL">Sierra Leone</option>
                          <option value="SG">Singapore</option>
                          <option value="SK">Slovakia</option>
                          <option value="SI">Slovenia</option>
                          <option value="SB">Solomon Islands</option>
                          <option value="SO">Somalia</option>
                          <option value="ZA">South Africa</option>
                          <option value="GS">South Georgia</option>
                          <option value="KR">South Korea</option>
                          <option value="ES">Spain</option>
                          <option value="LK">Sri Lanka</option>
                          <option value="SD">Sudan</option>
                          <option value="SR">Suriname</option>
                          <option value="SJ">Svalbard and Jan Mayen</option>
                          <option value="SZ">Swaziland</option>
                          <option value="SE">Sweden</option>
                          <option value="CH">Switzerland</option>
                          <option value="SY">Syria</option>
                          <option value="TW">Taiwan</option>
                          <option value="TJ">Tajikistan</option>
                          <option value="TZ">Tanzania</option>
                          <option value="TH">Thailand</option>
                          <option value="TL">Timor-Leste</option>
                          <option value="TG">Togo</option>
                          <option value="TK">Tokelau</option>
                          <option value="TO">Tonga</option>
                          <option value="TT">Trinidad and Tobago</option>
                          <option value="TN">Tunisia</option>
                          <option value="TR">Turkey</option>
                          <option value="TM">Turkmenistan</option>
                          <option value="TC">Turks and Caicos Islands</option>
                          <option value="TV">Tuvalu</option>
                          <option value="UG">Uganda</option>
                          <option value="UA">Ukraine</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="US" selected="selected">
                            United Kingdom
                          </option>
                          <option value="UY">Uruguay</option>
                          <option value="UM">
                            U.S. Minor Outlying Islands
                          </option>
                          <option value="VI">U.S. Virgin Islands</option>
                          <option value="UZ">Uzbekistan</option>
                          <option value="VU">Vanuatu</option>
                          <option value="VA">Vatican City</option>
                          <option value="VE">Venezuela</option>
                          <option value="VN">Vietnam</option>
                          <option value="WF">Wallis and Futuna</option>
                          <option value="EH">Western Sahara</option>
                          <option value="YE">Yemen</option>
                          <option value="ZM">Zambia</option>
                          <option value="ZW">Zimbabwe</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Address<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          required="required"
                          onChange={this.onchangeinput}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Postal Code<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="post"
                          required="required"
                          onChange={this.onchangeinput}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="order-details">
                  {/* Order Widget */}
                  <div className="single-widget">
                    <h2>CART TOTAL</h2>
                    <div className="content">
                      <ul>
                        <li>
                          Sub Total<span>Rp {this.state.totalprice}</span>
                        </li>
                        <li>
                          (+) Shipping<span>Rp 1000</span>
                        </li>
                        <li className="last">
                          Total<span>Rp {this.state.totalprice + 1000}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/*/ End Order Widget */}
                  {/* Order Widget */}
                  <div className="single-widget">
                    <h2>Payments</h2>
                    <div className="content">
                      <div className="checkbox">
                        <label className="checkbox-inline" htmlFor={1}>
                          <input name="updates" id={1} type="checkbox" /> Check
                          Payments
                        </label>
                        <label className="checkbox-inline" htmlFor={2}>
                          <input name="news" id={2} type="checkbox" /> Cash On
                          Delivery
                        </label>
                        <label className="checkbox-inline" htmlFor={3}>
                          <input name="news" id={3} type="checkbox" /> PayPal
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*/ End Order Widget */}
                  {/* Payment Method Widget */}
                  <div className="single-widget payement">
                    <div className="content">
                      <img src="images/payment-method.png" alt="#" />
                    </div>
                  </div>
                  {/*/ End Payment Method Widget */}
                  {/* Button Widget */}
                  <div className="single-widget get-button">
                    <div className="content">
                      <div className="button">
                        <button
                          disabled={this.state.loading}
                          className="btn"
                          onClick={this.proceedCheckout}
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                  {/*/ End Button Widget */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/ End Form */}
      </section>
    );
  }
}

export default Checkout;
