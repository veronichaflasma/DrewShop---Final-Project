import React, { Component } from "react";
import EditUsers from "../modal/EditUsers";
import firebase from "firebase";
import firebaseConfig from "../../firebase/config";

class TableUsers extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      listuser: [],
      locallist: [],
      loadingdata: true,
      singleuser: {},
    };
  }

  fetchUser = () => {
    let ref = firebase.database().ref("/users");

    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      console.log(snapshot.val());
      this.setState({ listuser: state, locallist: state, loadingdata: false });
      if (!this.state.loadingdata) {
        setTimeout(() => this.getimage(), 300);
      }
    });
    ref.on("child_added", (child, childkey) => {
      var newState = this.state.listuser !== null ? this.state.listuser : [];
      newState.push(child);
      this.setState({
        listuser: newState,
        locallist: newState,
        loadingdata: false,
      });
      if (!this.state.loadingdata) {
        setTimeout(() => this.getimage(), 300);
      }
    });
    ref.on("child_removed", (oldSnapshot) => {
      var newState = this.state.listuser.filter((prod) => {
        return prod.id !== oldSnapshot.id;
      });
      this.setState({
        listuser: newState,
        locallist: newState,
        loadingdata: false,
      });
      if (!this.state.loadingdata) {
        setTimeout(() => this.getimage(), 300);
      }
    });
  };
  saveUser = () => {
    firebase.database().ref("/users").set(this.state.listuser);
  };
  deleteUser = (index) => {
    firebase.database().ref(`/users/${index}`).remove();
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
      .ref("userimage")
      .child(filename)
      .delete()
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.fetchUser();
  }
  handleDelete = (id) => {
    const ref = firebase.database().ref("/users");
    const { listuser } = this.state;
    const newlist = listuser.filter((data) => {
      return data.id !== id;
    });
    this.setState({ listuser: newlist });
    this.deleteUser(listuser.findIndex((prod) => prod.id === id));
    this.deleteImage(id);
  };

  getimage = () => {
    console.log("getimage");
    const storage = firebase.storage();
    if (this.state.listuser !== null) {
      this.state.listuser.map((data) => {
        storage
          .ref(`/userimage/${data.img}`)
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
  showModal = (data) => {
    this.setState({ singleusers: data });
  };
  render() {
    const { locallist, listuser } = this.state;
    return (
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header border-0">
              <h3 className="mb-0">List Users</h3>
            </div>
            <div classname="table-responsive">
              <EditUsers ata={this.state.singleuser} listuser={listuser} />
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="sort" data-sort="name">
                      ID
                    </th>
                    <th scope="col" className="sort" data-sort="name">
                      Photo
                    </th>
                    <th scope="col" className="sort" data-sort="budget">
                      Email
                    </th>
                    <th scope="col" className="sort" data-sort="status">
                      Phone
                    </th>
                    <th scope="col" className="sort" data-sort="completion">
                      Address
                    </th>
                    <th scope="col" />
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
                          <td>{data.email}</td>
                          <td>{data.phone}</td>
                          <td>{data.address}</td>
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

export default TableUsers;
