import React, { Component } from "react";
import TableUsers from "../tables/TableUsers";
import firebaseConfig from "../../firebase/config";
import firebase from "firebase";

class Users extends Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.state = {
      listuser: [],
      userprep: null,
      image: null,
      imageref: null,
    };
  }

  fetchUser = () => {
    let ref = firebase.database().ref("/users");
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState({ listuser: state });
    });
  };

  saveUser = () => {
    firebase.database().ref("/users").set(this.state.listuser);
  };
  saveImage = () => {
    if (this.state.imageref !== null) {
      firebase
        .storage()
        .ref(`/userimage/${this.state.userprep.img}`)
        .put(this.state.imageref);
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  handleSave = () => {
    let imgfilename = "";
    if (this.state.imageref != null) {
      imgfilename = this.state.userprep.img;
    }
    var newprep = {
      id: new Date().getTime().toString(),
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value,
      email: this.refs.email.value,
      phone: this.refs.phone.value,
      address: this.refs.address.value,
      city: this.refs.city.value,
      country: this.refs.country.value,
      postal: this.refs.postal.value,

      img: imgfilename,
    };

    this.setState({ userprep: newprep });
    const mergeList = () => {
      let newList = this.state.listuser !== null ? this.state.listuser : [];
      newList.push(this.state.userprep);
      this.setState({ listuser: newList });
      console.log(this.state.listuser);
      console.log("merge");
      this.saveUser();
      this.saveImage();
    };
    setTimeout(() => mergeList(), 100);
  };

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let filename = event.target.files[0].name;
      let lastModified = event.target.files[0].lastModified;
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          imageref: event.target.files[0],
          image: e.target.result,
          userprep: { img: lastModified + "_" + filename },
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  render() {
    return (
      <div>
        <div className="row ">
          <div className="col-xl-8 order-xl-1 ">
            <div className="card ">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h3 className="mb-0">USERS</h3>
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
                      src={this.state.image !== null && this.state.image}
                      alt="Card image cap"
                      style={{ maxHeight: 100, maxWidth: 100 }}
                    />
                    <div className="card-body">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="customFileLang"
                          lang="en"
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
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            id="input-first-name"
                            className="form-control"
                            placeholder="Veronicha"
                            ref="firstname"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            id="input-last-name"
                            className="form-control"
                            placeholder="Flasma"
                            ref="lastname"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="input-email"
                            className="form-control"
                            placeholder="vero@example.com"
                            ref="email"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            id="input-phone-number"
                            className="form-control"
                            placeholder="082338xxxx"
                            ref="phone"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <input
                            id="input-address"
                            className="form-control"
                            placeholder="Jalan Raya LA Sucipto Malang"
                            type="text"
                            ref="address"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            id="input-city"
                            className="form-control"
                            placeholder="Malang"
                            ref="city"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            id="input-country"
                            className="form-control"
                            placeholder="Indonesia"
                            ref="country"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <input
                            type="number"
                            id="input-postal-code"
                            className="form-control"
                            placeholder="65125"
                            ref="postal"
                          />
                        </div>
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
                          <button type="button" className="btn btn-danger">
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
        <TableUsers />
      </div>
    );
  }
}

export default Users;
