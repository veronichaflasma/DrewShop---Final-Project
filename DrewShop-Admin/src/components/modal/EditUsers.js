import React, { Component } from "react";
import firebaseConfig from "../../firebase/config";
import firebase from "firebase";

class EditUsers extends Component {

  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      imageref: null,
      image: null,
      userprep: null
    };
  }
  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let filename = new Date().getTime().toString()
      let lastModified = event.target.files[0].lastModified;
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          imageref: event.target.files[0],
          image: e.target.result,
          userprep: { img: filename+".jpg"},
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  replaceImage = (oldimg, newimg)=> {
    const storage = firebase.storage().ref('/userimage/'+oldimg)
    const storageUpload = firebase.storage().ref('/userimage/'+newimg)
    storage.delete()
      .then(val =>{
        storageUpload.put(this.state.imageref)
      }).catch(err=>{
        storageUpload.put(this.state.imageref)
      })
  }
  updateUser = (prep) =>{
    const {listuser} = this.props
    const ref = firebase.database().ref('/users')
    let list = listuser.map(data =>{
      if(data.id === prep.id){
        if(prep.img === ""){
          prep.img = data.img
          return prep
        }else{
          this.replaceImage(data.img, prep.img)
          return prep
        }
      }
      return data
    })
    console.log(list)
    ref.set(list)
  }
  handleSave = () => {
    let imgfilename = "";
    if (this.state.imageref != null) {
      imgfilename = this.state.userprep.img;
    }
    var newprep = {
      id:this.props.data.id,
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value,
      email: this.refs.email.value,
      phone: parseInt(this.refs.phone.value),
      address: parseInt(this.refs.address.value),
      city: parseInt(this.refs.city.value),
      country: parseInt(this.refs.country.value),
      postal: parseInt(this.refs.postal.value),
      img: imgfilename,
    };
    console.log(newprep)
    this.setState({userprep: newprep})
    this.updateUser(newprep)
  };

  render() {
    const { id, firstname, lastname, email, phone, address,city,country,postal } =
      this.props.data;
    return (
      <div
        className="modal fade"
        id="modal-default"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modal-default"
        aria-hidden="true"
        key={id}
      >
        <div
          className="modal-dialog modal- modal-dialog-centered modal-"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-default">
                Edit User
              </h6>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="card center" style={{ width: "25rem" }}>
                  <img
                    className="card-img-top"
                    src="../../assets/img/theme/img-1-1000x600.jpg"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFileLang"
                        lang="en"
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
                          defaultValue={firstname}
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
                          defaultValue={lastname}
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
                          defaultValue={email}
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
                          defaultValue={phone}
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
                          defaultValue={address}
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
                          defaultValue={city}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Indonesia
                        </label>
                        <input
                          type="text"
                          id="input-country"
                          className="form-control"
                          placeholder="Country"
                          defaultValue={country}
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
                          defaultValue={postal}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button type="button" 
                  onClick={this.handleSave} className="btn btn-success">
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUsers;
