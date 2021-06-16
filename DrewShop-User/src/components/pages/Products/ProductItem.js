import React, { Component } from "react";
import firebaseConfig from "../../../firebase/config";
import firebase from "firebase";


class ProductItem extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  onClickAddCart = (id) => {
    let cart = {
      id: id,
      qty: 1
    };
    let ref = firebase.database().ref(`/carts/veronicha@gmail/products`);
    ref.get().then(snapshot=>{
      let products= snapshot.val()
      if(products === null){
        let newCart = []
        newCart.push(cart)
        ref.set(newCart).then(val=>alert('Added to Cart'))
      }else if(products.length > 0){
        let index = products.findIndex(element=>{
          return element.id === id
        })
        if(index>-1 && index<products.length){
          products[index].qty +=1
          ref.set(products).then(val=>alert('Added to Cart'))
        }else{
          products.push(cart)
          ref.set(products).then(val=>alert('Added to Cart'))
        }
      }
    })
  };

  render() {
    const data = this.props.product;
    return (
      <div className="col-xl-3 col-lg-4 col-md-4 col-12" key={data.id}>
        <div className="single-product">
          <div className="product-img">
            <a href="product-details.html">
              <img
                className="default-img"
                src={data.img} alt="#"
              />
              <img
                className="hover-img"
                src={data.img} alt="#"
              />
            </a>
            <div className="button-head">
              <div className="product-action">
                <a
                  data-toggle="modal"
                  data-target="#exampleModal"
                  title="Quick View"
                  href="#"
                >
                  <i className=" ti-eye" />
                  <span>Quick Shop</span>
                </a>
                <a title="Wishlist" href="#">
                  <i className=" ti-heart " />
                  <span>Add to Wishlist</span>
                </a>
                <a title="Compare" href="#">
                  <i className="ti-bar-chart-alt" />
                  <span>Add to Compare</span>
                </a>
              </div>
              <div className="product-action-2">
                <button title="Add to cart" className="btn" onClick={() => this.onClickAddCart(data.id)}> 
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="product-content">
            <h3>
              <a href="product-details.html">{data.name}</a>
            </h3>
            <div className="product-price">
              <span>Rp. {data.price}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductItem;
