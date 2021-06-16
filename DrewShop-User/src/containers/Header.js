import React, { Component } from "react";
import Login from "../components/pages/Login";
import HeaderInner from "./HeaderInner";
import firebase from "firebase";
import firebaseConfig from "../firebase/config";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Header extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      listCart: [],
      productCart: [],
      totalprice: 0
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
        let products = productSnapshot.val();
        let newproductcart = [];
        if (products != null && carts != null) {
          let total = 0;
          products.map((item) => {
            carts.products.map((cart) => {
              if (item.id === cart.id) {
                newproductcart.push(this.cartItem(item, cart));
                this.setState({ productCart: newproductcart });
                total += item.price * cart.qty;
              }
            });
          });
          this.countTotalPrice(total);
        } else {
          this.setState({ productCart: [], totalprice: 0 });
        }
        this.getImage();
      });
    });
  };
  componentDidMount() {
    console.log(this.props);
    this.fetchCart();
  }
  countTotalPrice = (price) => {
    this.setState({ totalprice: price });
  };
  deleteCart = (productid) => {
    let newCarts = this.state.listCart.products.filter((item) => {
      return item.id !== productid;
    });
    console.log(this.state.productCart);
    firebase.database().ref("/carts/veronicha@gmail/products").set(newCarts);
  };
  getImage = () => {
    const storage = firebase.storage();
    this.state.productCart.map((item) => {
      storage
        .ref(`/productimage/${item.img}`)
        .getDownloadURL()
        .then((link) => {
          let newCart = this.state.productCart.map((cart) => {
            if (item.id === cart.id) {
              cart.img = link;
            }
            return cart;
          });
          this.setState({ productCart: newCart });
        });
    });
  };
  render() {
    return (
      <header className="header shop">
        {/* Topbar */}
        <div className="topbar">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-12 col-12">
                {/* Top Left */}
                <div className="top-left">
                  <ul className="list-main">
                    <li>
                      <i className="ti-headphone-alt" /> 082338118330
                    </li>
                    <li>
                      <i className="ti-email" /> veronichaflasma@gmail.com
                    </li>
                  </ul>
                </div>
                {/*/ End Top Left */}
              </div>
              <div className="col-lg-7 col-md-12 col-12">
                {/* Top Right */}
                <div className="right-content">
                  <ul className="list-main">
                    <li>
                      <i className="ti-location-pin" /> Store location
                    </li>
                    <li>
                      <i className="ti-alarm-clock" />{" "}
                      <a href="#">Daily deal</a>
                    </li>
                    <li>
                      <i className="ti-user" />{" "}
                      <a href="/account">My account</a>
                    </li>
                    <li>
                      <i className="ti-power-off" />
                      <a href="/login">Login</a>
                    </li>
                  </ul>
                </div>
                {/* End Top Right */}
              </div>
            </div>
          </div>
        </div>
        {/* End Topbar */}
        <div className="middle-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-2 col-12">
                {/* Logo */}
                <div className="logo">
                  <a href="/">
                    <img src="images/logo.png" alt="logo" />
                  </a>
                </div>
                {/*/ End Logo */}
                {/* Search Form */}
                <div className="search-top">
                  <div className="top-search">
                    <a href="#0">
                      <i className="ti-search" />
                    </a>
                  </div>
                  {/* Search Form */}
                  <div className="search-top">
                    <form className="search-form">
                      <input
                        type="text"
                        placeholder="Search here..."
                        name="search"
                      />
                      <button value="search" type="submit">
                        <i className="ti-search" />
                      </button>
                    </form>
                  </div>
                  {/*/ End Search Form */}
                </div>
                {/*/ End Search Form */}
                <div className="mobile-nav" />
              </div>
              <div className="col-lg-8 col-md-7 col-12">
                <div className="search-bar-top">
                  <div className="search-bar">
                    <select>
                      <option defaultValue="">All Category</option>
                      <option>Hoodie</option>
                      <option>T-shirt</option>
                      <option>Slippers</option>
                    </select>
                    <form>
                      <input
                        name="search"
                        placeholder="Search Products Here....."
                        type="search"
                      />
                      <button className="btnn">
                        <i className="ti-search" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-12">
                <div className="right-bar">
                  {/* Search Form */}
                  <div className="sinlge-bar">
                    <a href="#" className="single-icon">
                      <i className="fa fa-heart-o" aria-hidden="true" />
                    </a>
                  </div>
                  <div className="sinlge-bar">
                    <a href="/account" className="single-icon">
                      <i
                        className="fa fa-user-circle-o"
                        aria-hidden="true"
                        aria-disabled
                      />
                    </a>
                  </div>
                  <div className="sinlge-bar shopping">
                    <a href="cart" className="single-icon">
                      <i className="ti-bag" />{" "}
                      {this.state.productCart.length > 0 && (
                        <span className="total-count">
                          {this.state.productCart.length}
                        </span>
                      )}
                    </a>
                    {/* Shopping Item */}
                    <div className="shopping-item">
                      <div className="dropdown-cart-header">
                        <span>{this.state.productCart.length} Items</span>
                        <a href="/cart">View Cart</a>
                      </div>
                      <ul className="shopping-list">
                        {this.state.productCart.length === 0 && (
                          <li className="text-center">
                            <h4>Empty</h4>
                          </li>
                        )}
                        {this.state.productCart.map((item) => {
                          return (
                            <li>
                              <button
                                className="remove"
                                title="Remove this item"
                                onClick={() => this.deleteCart(item.id)}
                              >
                                <i className="fa fa-remove" />
                              </button>
                              <a className="cart-img" href="#">
                                <img src={item.img} alt="#" />
                              </a>
                              <h4>
                                <a href="#">{item.name}</a>
                              </h4>
                              <p className="quantity">
                                {item.qty}x -{" "}
                                <span className="amount">
                                  Rp {item.qty * item.price}
                                </span>
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="bottom">
                        <div className="total">
                          <span>Total</span>
                          <span className="total-amount">
                            Rp {this.state.totalprice}
                          </span>
                        </div>
                        <a href="/checkout" className="btn animate">
                          Checkout
                        </a>
                      </div>
                    </div>
                    {/*/ End Shopping Item */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HeaderInner />
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
