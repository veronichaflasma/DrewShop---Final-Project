import React, { Component } from "react";
import firebase from "firebase";
import firebaseConfig from "../../firebase/config";

class Cart extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      listCart: [],
      productCart: [],
      totalprice: 0,
      loadingcart: true,
      loadinganim: "",
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
                this.setState({
                  productCart: newproductcart,
                  loadingcart: false,
                });
                total += item.price * cart.qty;
              }
            });
          });
          this.countTotalPrice(total);
        } else {
          this.setState({ productCart: [], totalprice: 0, loadingcart: false });
        }
        this.getImage();
      });
    });
  };
  componentDidMount() {
    this.fetchCart();
    this.loadanim();
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
  setQty = (id, qty) => {
    let ref = firebase
      .database()
      .ref(
        `/carts/veronicha@gmail/products`
      );
    ref.get().then((snapshot) => {
      let carts = snapshot.val();
      if (qty > 0) {
        let index = carts.findIndex((element) => {
          return element.id === id;
        });
        if (index > -1 && index < carts.length) {
          carts[index].qty = qty;
          ref.set(carts);
        }
      }
    });
  };
  loadanim = () => {
    let inter = {};
    if (this.state.loadingcart) {
      let load = "";
      inter = setInterval(() => {
        if (load.length < 3) {
          load += ".";
        } else {
          load = "";
        }
        this.setState({ loadinganim: load });
      }, 500);
    } else {
      if (inter) {
        clearInterval(inter);
      }
    }
  };

  render() {
    return (
      <div className="shopping-cart section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Shopping Summery */}
              <table className="table shopping-summery">
                {this.state.productCart.length !== 0 && (
                  <thead>
                    <tr className="main-hading">
                      <th>PRODUCT</th>
                      <th>NAME</th>
                      <th className="text-center">UNIT PRICE</th>
                      <th className="text-center">QUANTITY</th>
                      <th className="text-center">TOTAL</th>
                      <th className="text-center">
                        <i className="ti-trash remove-icon" />
                      </th>
                    </tr>
                  </thead>
                )}

                <tbody>
                  {this.state.loadingcart && (
                    <tr className="text-center">
                      <td colSpan="6">
                        <h6>Please Wait {this.state.loadinganim}</h6>
                      </td>
                    </tr>
                  )}
                  {!this.state.loadingcart && this.state.productCart.length == 0 && (
                    <tr className="text-center">
                      <td colSpan="6">
                        <h6>Your Cart is Empty</h6>
                      </td>
                    </tr>
                  )}
                  {this.state.productCart.map((item) => {
                    return (
                      <tr>
                        <td className="image" data-title="No">
                          <img src={item.img} alt="#" />
                        </td>
                        <td className="product-des" data-title="Description">
                          <p className="product-name">
                            <a href="#">{item.name}</a>
                          </p>
                          <p className="product-des">{item.description}</p>
                        </td>
                        <td className="price" data-title="Price">
                          <span>Rp {item.price}</span>
                        </td>
                        <td className="qty" data-title="Qty">
                          {/* Input Order */}
                          <div className="input-group">
                            <div className="button minus">
                              <button
                                type="button"
                                className="btn btn-primary btn-number"
                                data-type="minus"
                                data-field="quant[1]"
                                onClick={() => this.setQty(item.id, --item.qty)}
                              >
                                <i className="ti-minus" />
                              </button>
                            </div>
                            <input
                              type="text"
                              name="quant[1]"
                              className="input-number"
                              data-min={1}
                              data-max={100}
                              value={item.qty}
                            />
                            <div className="button plus">
                              <button
                                type="button"
                                className="btn btn-primary btn-number"
                                data-type="plus"
                                data-field="quant[1]"
                                onClick={() => this.setQty(item.id, ++item.qty)}
                              >
                                <i className="ti-plus" />
                              </button>
                            </div>
                          </div>
                          {/*/ End Input Order */}
                        </td>
                        <td className="total-amount" data-title="Total">
                          <span>Rp {item.price * item.qty}</span>
                        </td>
                        <td className="action" data-title="Remove">
                          <button className="bg-white border-0">
                            <i
                              className="ti-trash remove-icon"
                              onClick={() => this.deleteCart(item.id)}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/*/ End Shopping Summery */}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/* Total Amount */}
              <div className="total-amount">
                <div className="row">
                  <div className="col-lg-8 col-md-5 col-12">
                    <div className="left">
                      <div className="coupon">
                        <form action="#" target="_blank">
                          <input
                            name="Coupon"
                            placeholder="Enter Your Coupon"
                          />
                          <button className="btn">Apply</button>
                        </form>
                      </div>
                      
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-7 col-12">
                    <div className="right">
                      <ul>
                        <li>
                          Cart Subtotal<span>Rp {this.state.totalprice}</span>
                        </li>
                        <li>
                          Shipping<span>Free</span>
                        </li>
                        <li className="last">
                          You Pay<span>Rp {this.state.totalprice}</span>
                        </li>
                      </ul>
                      <div className="button5">
                        <a href="/checkout" className="btn">
                          Checkout
                        </a>
                        <a href="/product" className="btn">
                          Continue shopping
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*/ End Total Amount */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
