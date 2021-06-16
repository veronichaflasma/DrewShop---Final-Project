import React, { Component } from "react";
import firebaseConfig from "../../../firebase/config";
import firebase from "firebase";
import ProductItem from "./ProductItem";

class Products extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      listproduct: [],
      locallist: [],
      loadingdata: true,
      loadinganim: "",
    };
  }

  fetchProduct = () => {
    let ref = firebase.database().ref("/list_product");
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState({
        listproduct: state,
        locallist: state,
        loadingdata: false,
      });
      this.getimage();
    });
  };

  componentDidMount() {
    this.fetchProduct();
    this.loadanim();
  }

  getimage = () => {
    console.log("getimage");
    const storage = firebase.storage();
    if (this.state.listproduct !== null) {
      this.state.listproduct.map((data) => {
        storage
          .ref(`/productimage/${data.img}`)
          .getDownloadURL()
          .then((link) => {
            let newState = this.state.locallist.map((nestdata) => {
              if (nestdata.id === data.id) {
                nestdata.img = link;
              }
              return nestdata;
            });
            console.log(link);
            this.setState({ locallist: newState });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };
  loadanim = () => {
    let inter1 = {};
    if (this.state.loadingdata) {
      let load = "";
      inter1 = setInterval(() => {
        if (load.length < 3) {
          load += ".";
        } else {
          load = "";
        }
        this.setState({ loadinganim: load });
      }, 500);
    } else {
      if (inter1) {
        clearInterval(inter1);
      }
    }
  };

  render() {
    const { locallist, loadingdata } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <br></br>
              <div className="section-title">
                <h2>LIST PRODUCTS</h2>
              </div>
              <div className="product-info">
                <div className="row">
                  {loadingdata && (
                    <h5 className="center">
                      Please Wait {this.state.loadinganim}
                    </h5>
                  )}
                  {(locallist === null || locallist.length === 0) &&
                  !loadingdata ? (
                    <h4>Empty</h4>
                  ) : (
                    locallist.map((data) => {
                      return <ProductItem product={data} />;
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
