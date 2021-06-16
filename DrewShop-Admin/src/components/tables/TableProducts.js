import React, { Component } from "react";
import EditProducts from "../modal/EditProducts";
import firebase from "firebase";
import firebaseConfig from "../../firebase/config";

class TableProducts extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      listproduct: [],
      locallist: [],
      loadingdata: true,
      singleproduct: {},
    };
  }

  fetchProduct = () => {
    let ref = firebase.database().ref("/list_product");

    ref.on("value", (snapshot) => {
      const newstate = snapshot.val();
      const newstate2 = snapshot.val();
      this.setState({
        listproduct: newstate,
        locallist: newstate2,
        loadingdata: false,
      });
      if (!this.state.loadingdata) {
        setTimeout(() => this.getimage(), 300);
      }
    });
    ref.on("child_added", (child, childkey) => {
      var newState =
        this.state.listproduct !== null ? this.state.listproduct : [];
      newState.push(child);
      this.setState({
        listproduct: newState,
        locallist: newState,
        loadingdata: false,
      });
      if (!this.state.loadingdata) {
        setTimeout(() => this.getimage(), 300);
      }
    });
    ref.on("child_removed", (oldSnapshot) => {
      var newState = this.state.listproduct.filter((prod) => {
        return prod.id !== oldSnapshot.id;
      });
      this.setState({
        listproduct: newState,
        locallist: newState,
        loadingdata: false,
      });
      if (!this.state.loadingdata) {
        setTimeout(() => this.getimage(), 300);
      }
    });
  };
  saveProduct = () => {
    firebase.database().ref("/list_product").set(this.state.listproduct);
  };
  deleteProduct = (index) => {
    firebase.database().ref(`/list_product/${index}`).remove();
  };
  deleteImage = (id) => {
    let filename = "";
    const { locallist } = this.state;
    locallist.map((data) => {
      if (data.id === id) {
        filename = data.img;
      }
    });
    firebase
      .storage()
      .ref("productimage")
      .child(filename)
      .delete()
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.fetchProduct();
  }
  handleDelete = (id) => {
    const ref = firebase.database().ref("/list_product");
    const { listproduct } = this.state;
    const newlist = listproduct.filter((data) => {
      return data.id !== id;
    });
    this.setState({ listproduct: newlist });
    this.deleteProduct(listproduct.findIndex((prod) => prod.id === id));
    this.deleteImage(id);
  };
  getimage = () => {
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
            this.setState({ locallist: newState });
          });
      });
    }
  };
  showModal = (data) => {
    this.setState({ singleproduct: data });
  };

  render() {
    const { locallist, listproduct } = this.state;
    return (
      <div className="row">
        <div className="col">
          <div className="card card-small mb-4">
            <div className="card-header border-0">
              <h3 className="mb-0">List Products</h3>
            </div>
            <div className="card-body p-0 pb-3 text-center">
              <EditProducts
                data={this.state.singleproduct}
                listproduct={listproduct}
              />
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="sort">
                      #
                    </th>
                    <th scope="col" className="sort">
                      Photo
                    </th>
                    <th scope="col" className="sort">
                      Product Name
                    </th>
                    <th scope="col" className="sort">
                      Category
                    </th>
                    <th scope="col" className="sort">
                      Price
                    </th>
                    <th scope="col" className="sort">
                      Stock
                    </th>
                    <th scope="col" className="sort">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="list">
                  {locallist !== null &&
                    locallist.map((data) => {
                      return (
                        <tr key={data.id}>
                          <td>{data.id}</td>
                          <td>
                            <img src={data.img} width="100" height="100" />
                          </td>
                          <td>{data.name}</td>
                          <td>{data.category}</td>
                          <td>Rp. {data.price}</td>
                          <td>{data.stock}</td>
                          <td className="text-right">
                            <div className="dropdown">
                              <a
                                className="btn btn-sm btn-icon-only text-light"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="fas fa-ellipsis-v" />
                              </a>
                              <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <a
                                  className="dropdown-item"
                                  data-toggle="modal"
                                  data-target="#modal-default"
                                  onClick={() => this.showModal(data)}
                                >
                                  Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() => this.handleDelete(data.id)}
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <div className="card-footer py-4">
              <nav aria-label="...">
                <ul className="pagination justify-content-end mb-0">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex={-1}>
                      <i className="fas fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2 <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <i className="fas fa-angle-right" />
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TableProducts;
