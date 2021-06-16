import React, { Component } from "react";
import firebase from "firebase";
import firebaseConfig from "../../firebase/config";

class TableOrders extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      listorder: [],
      locallist: [],
      orderProducts: [],
      loadingdata: true,
      singleorder: {},
    };
  }

  fetchOrder = () => {
    let ref = firebase.database().ref("/orders");
    let products = firebase.database().ref("/list_product").get();
    ref.on("value", (snapshot) => {
      const newstate = snapshot.val();
      const newstate2 = snapshot.val();
      console.log(newstate2);
      products.then((prodSnapshot) => {
        let products = prodSnapshot.val();
        console.log(products);
        products.forEach((product) => [
          newstate2.forEach((order) => {
            let orderProducts = [];
            order.products.forEach((orderItem) => {
              if (product.id === orderItem.id) {
                orderProducts.push(product);
              }
            });
            if (orderProducts.length > 0) {
              let realOrder = this.state.orderProducts;
              realOrder.push(orderProducts);
              this.setState({
                orderProducts: realOrder,
              });
            }
          }),
        ]);
        this.setState({
          listorder: newstate,
          locallist: newstate2,
          loadingdata: false,
        });
      });
    });
    ref.on("child_added", (child, childkey) => {
      var newState = this.state.listorder !== null ? this.state.listorder : [];
      newState.push(child);
      this.setState({
        listorder: newState,
        locallist: newState,
        loadingdata: false,
      });
    });
    ref.on("child_removed", (oldSnapshot) => {
      var newState = this.state.listorder.filter((prod) => {
        return prod.orderid !== oldSnapshot.orderid;
      });
      this.setState({
        listorder: newState,
        locallist: newState,
        loadingdata: false,
      });
    });
  };
  saveOrder = () => {
    firebase.database().ref("/orders").set(this.state.listorder);
  };
  deleteOrder = (index) => {
    firebase.database().ref(`/orders/${index}`).remove();
  };

  componentDidMount() {
    this.fetchOrder();
  }
  handleDelete = (orderid) => {
    const ref = firebase.database().ref("/orders");
    const { listorder } = this.state;
    const newlist = listorder.filter((data) => {
      return data.orderid !== orderid;
    });
    this.setState({ listorder: newlist });
    this.deleteOrder(listorder.findIndex((prod) => prod.orderid === orderid));
    this.deleteImage(orderid);
  };

  showModal = (data) => {
    this.setState({ singleorder: data });
  };
  getProductName = (productArr) => {
    console.log(productArr);
    let a = "";
    if (productArr !== undefined) {
      productArr.forEach((item) => {
        this.state.orderProducts.forEach((orderItem) => {
          orderItem.forEach((orderProduct) => {
            if (orderProduct.id === item.id) {
              a += orderProduct.name + ", ";
            }
          });
        });
      });
    }
    return a;
  };

  render() {
    const { locallist, listorder, orderProducts } = this.state;
    console.log(orderProducts);
    return (
      <div className="row">
        <div className="col">
          <div className="card card-small mb-4">
            <div className="card-header border-0">
              <h3 className="mb-0">List Orders</h3>
            </div>
            <div className="card-body p-0 pb-3 text-left">
              <table className="table align-items-left table-flush">
                <thead className="thead-light">
                  <tr>
                    <th>ID</th>
                    <th scope="col" className="sort">
                      User
                    </th>
                    <th scope="col" className="sort">
                      Products
                    </th>
                    <th scope="col" className="sort">
                      Date Time
                    </th>
                    <th scope="col" className="sort">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="list">
                  {locallist !== (null || undefined) &&
                    locallist.map((data) => {
                      return (
                        <tr key={data.orderid}>
                          <td>{data.orderid}</td>
                          <td>{data.user}</td>
                          <td>{this.getProductName(data.products)}</td>
                          <td>{data.orderdatetime}</td>
                          <td>
                            {data.status}
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
                                  onClick={() =>
                                    this.handleDelete(data.orderid)
                                  }
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

export default TableOrders;
