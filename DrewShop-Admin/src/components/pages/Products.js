import React, { Component } from "react";
import Sidebar from "../../containers/Sidebar";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import Navbar from "../../containers/Navbar";
import TableProducts from "../tables/TableProducts";
import firebaseConfig from "../../firebase/config";
import firebase from "firebase";

class Products extends Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.state = {
      listproduct: [],
      productprep: null,
      image: null,
      imageref: null,
    };
  }
  fetchProduct = () => {
    let ref = firebase.database().ref("/list_product");
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState({ listproduct: state });
    });
  };

  saveProduct = () => {
    firebase.database().ref("/list_product").set(this.state.listproduct);
  };

  saveImage = () => {
    if (this.state.imageref !== null) {
      firebase
        .storage()
        .ref(`/productimage/${this.state.productprep.img}`)
        .put(this.state.imageref);
    }
  };

  componentDidMount() {
    this.fetchProduct();
  }

  handleSave = () => {
    let imgfilename = "";
    if (this.state.imageref != null) {
      imgfilename = this.state.productprep.img;
    }
    var newprep = {
      id: new Date().getTime().toString(),
      name: this.refs.name.value,
      category: this.refs.category.value,
      description: this.refs.description.value,
      price: parseInt(this.refs.price.value),
      stock: parseInt(this.refs.stock.value),
      img: imgfilename,
    };

    this.setState({ productprep: newprep });
    const mergeList = () => {
      let newList =
        this.state.listproduct !== null ? this.state.listproduct : [];
      newList.push(this.state.productprep);
      this.setState({ listproduct: newList });
      console.log(this.state.listproduct);
      console.log("merge");
      this.saveProduct();
      this.saveImage();
    };
    setTimeout(() => mergeList(), 100);
  };

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let filename = new Date().getTime().toString();
      let lastModified = event.target.files[0].lastModified;
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          imageref: event.target.files[0],
          image: e.target.result,
          productprep: { img: filename + ".jpg" },
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  clearField = () => {
    document.getElementById("input-productname").value = "";
    document.getElementById("input-price").value = "";
    document.getElementById("input-stock").value = "";
    document.getElementById("input-description").value = "";
    document.getElementById("productimg").src = "";
  };

  render() {
    return (
      <div>
        <Sidebar />
        <div className="main-content" id="panel">
          <Navbar />
          {/* <Header /> */}
          <div className="header bg-yellow pb-6">
            <div className="container-fluid">
              <div className="header-body">
                <div className="row align-items-center py-4">
                  <div className="col-lg-6 col-7">
                    <h6 className="h2 text-black d-inline-block mb-0">
                      Default
                    </h6>
                    <nav
                      aria-label="breadcrumb"
                      className="d-none d-md-inline-block ml-md-4"
                    >
                      <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                        <li className="breadcrumb-item">
                          <a href="#">
                            <i className="fas fa-home" />
                          </a>
                        </li>
                        <li className="breadcrumb-item">
                          <a href="#">Products</a>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Default
                        </li>
                      </ol>
                    </nav>
                  </div>
                  <div className="col-lg-6 col-5 text-right">
                    <a href="#" className="btn btn-sm btn-neutral">
                      New
                    </a>
                    <a href="#" className="btn btn-sm btn-neutral">
                      Filters
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid mt--6">
            <div className="row ">
              <div className="col-xl-8 order-xl-1 ">
                <div className="card ">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h3 className="mb-0">PRODUCTS</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form>
                      <div
                        className="card center"
                        style={{ width: "25rem", alignItems: "center" }}
                      >
                        <img
                          className="card-img-top"
                          id="productimg"
                          src={
                            this.state.image !== null
                              ? this.state.image
                              : "assets/img/brand/a.png"
                          }
                          alt="Card image cap"
                          style={{ maxHeight: 100, maxWidth: 100 }}
                        />

                        <div className="card-body">
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="feFirstName"
                              accept="image/*"
                              onChange={this.onImageChange}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFileLang"
                            >
                              Select file
                            </label>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                      <h6 className="heading-small text-muted mb-4">
                        Products information
                      </h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                htmlFor="input-product"
                              >
                                Product Name
                              </label>
                              <input
                                ref="name"
                                type="text"
                                className="form-control"
                                id="input-productname"
                                ref="name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                htmlFor="input-category"
                              >
                                Category
                              </label>
                              <select
                                ref="category"
                                id="feInputState"
                                className="form-control"
                              >
                                <option selected>Tee</option>
                                <option>Hoodie</option>
                                <option>Denim</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                htmlFor="input-price"
                              >
                                Price
                              </label>
                              <input
                                type="number"
                                id="input-price"
                                className="form-control"
                                placeholder="2000000"
                                ref="price"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                htmlFor="input-stock"
                              >
                                Stock
                              </label>
                              <input
                                type="text"
                                id="input-stock"
                                className="form-control"
                                placeholder="2"
                                ref="stock"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        {/* Description */}
                        <div className="pl-lg-4">
                          <div className="form-group">
                            <label className="form-control-label">
                              Description
                            </label>
                            <textarea
                              rows={4}
                              className="form-control"
                              id="input-description"
                              placeholder="A few words about you ..."
                              ref="description"
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={this.handleSave}
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.clearField}
                              >
                                Clear
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <TableProducts />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
