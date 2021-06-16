import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/loginUser";

class ProfileCard extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
};
  render() {
    const { isLoggingOut, logoutError } = this.props;

    return (
      <div className="col-lg-4 col-12">
        <div className="form-main ">
          <img
            src="images/logo.png"
            alt="Image placeholder"
            className="card-img-top"
          />
          <div className="row justify-content-center"></div>
          <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
            <div className="text-center">
              <h5 className="h5">
                Veronicha Flasma
                <span className="font-weight-light">, 27</span>
              </h5>
              <div className="h5 font-weight-300">
                <i className="ni location_pin mr-2" />
                Malang, Indonesia
              </div>

              <div>
                <i className="ni education_hat mr-2" />
                University of Computer Science
              </div>
            </div>
          </div>
          <div className="card-body pt-0"></div>
          <div class="form-group button">
            <button type="submit" class="btn " onClick={this.handleLogout}>
              Logout
            </button>
            {isLoggingOut && <p> Logging Out .... </p>}
                {logoutError && <p> Error logging out </p>} 
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      isLoggingOut: state.auth.isLoggingOut,
      logoutError: state.auth.logoutError
  };
} export default connect(mapStateToProps)(ProfileCard);
