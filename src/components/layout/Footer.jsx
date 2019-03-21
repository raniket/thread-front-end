import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  state = {}
  render() {
    return (
      <footer id="footer" className="page-footer blue-gradient font-small blue animated fadeIn fast footer-custom">

        <div className="container">

          <div className="row">

            <div className="col-md-12 py-5">
              <div className="mb-5 flex-center">

                <a className="fb-ic" href="#footer">
                  <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                </a>
                <a className="tw-ic" href="#footer">
                  <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                </a>
                <a className="li-ic" href="#footer">
                  <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                </a>
                <a className="ins-ic" href="#footer">
                  <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                </a>
                <a className="pin-ic" href="#footer">
                  <i className="fab fa-pinterest fa-lg white-text fa-2x"> </i>
                </a>
              </div>
            </div>

          </div>

        </div>

        <div className="footer-copyright text-center">© 2019 Copyright:
          <a href="#footer"> Dcoder Tech</a>
        </div>

      </footer>
    );
  }
}

export default Footer;
