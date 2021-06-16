import React, { Component } from "react";
import firebaseConfig from "../../firebase/config";
import firebase from "firebase";

class EditProducts extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      imageref: null,
      image: null,
      productprep: null
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
          productprep: { img: filename+".jpg"},
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  replaceImage = (oldimg, newimg)=> {
    const storage = firebase.storage().ref('/productimage/'+oldimg)
    const storageUpload = firebase.storage().ref('/productimage/'+newimg)
    storage.delete()
      .then(val =>{
        storageUpload.put(this.state.imageref)
      }).catch(err=>{
        storageUpload.put(this.state.imageref)
      })
  }
  updateProduct = (prep) =>{
    const {listproduct} = this.props
    const ref = firebase.database().ref('/list_product')
    let list = listproduct.map(data =>{
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
      imgfilename = this.state.productprep.img;
    }
    var newprep = {
      id:this.props.data.id,
      name: this.refs.name.value,
      category: this.refs.category.value,
      description: this.refs.description.value,
      price: parseInt(this.refs.price.value),
      stock: parseInt(this.refs.stock.value),
      img: imgfilename,
    };
    console.log(newprep)
    this.setState({productprep: newprep})
    this.updateProduct(newprep)
  };
  render() {
    const { id, description, category, name, img, price, stock } =
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
                    src={this.state.image == null ? img : this.state.image}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <div className="custom-file">
                      <label
                        className="custom-file-label"
                        htmlFor="customFileLang"
                      ></label>
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFileLang"
                        lang="en"
                        onChange={this.onImageChange}
                      />
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
                          htmlFor="input-first-name"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          id="input-first-name"
                          className="form-control"
                          placeholder="Product name ..."
                          defaultValue={name}
                          ref="name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Category
                        </label>
                        <input
                          type="text"
                          id="input-last-name"
                          className="form-control"
                          placeholder="Category ..."
                          defaultValue={category}
                          ref="category"
                        />
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
                          placeholder="99999"
                          defaultValue={price}
                          ref="price"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Stock
                        </label>
                        <input
                          type="text"
                          id="input-stock"
                          className="form-control"
                          placeholder="999"
                          defaultValue={stock}
                          ref="stock"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          className="form-control-label"
                          htmlFor="input-description"
                        >
                          Description
                        </label>
                        <textarea
                            rows={4}
                            className="form-control"
                            placeholder="A few words about you ..."
                            ref="description"
                            defaultValue={description}
                            ref="description"
                          />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-success" onClick={this.handleSave}>
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

export default EditProducts;
