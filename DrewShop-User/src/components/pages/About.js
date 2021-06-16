import React, { Component } from "react";
import ShopBlog from "../section/ShopBlog";

class About extends Component {
  render() {
    return (
    <section className="blog-single section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12">
            <div className="blog-single-main">
              <div className="row">
                <div className="col-12">
                  <div className="image">
                    <img src="images/about.png" alt="#" />
                  </div>
                  <div className="blog-detail">
                    <h2 className="blog-title">Story About Drew House</h2>
                    <div className="blog-meta">
                      <span className="author"><a href="#"><i className="fa fa-user" />By Veronicha Admin</a><a href="#"><i className="fa fa-calendar" />Apr 25, 2021</a><a href="#"><i className="fa fa-comments" />Comment (15)</a></span>
                    </div>
                    <div className="content">
                      <p>If you have to tell people something is cool, then it probably isn’t. But Justin Bieber took a very different approach with his Drew House clothing line. Instead of promoting it, he kept most details about the clothing line public and relied on word-of-mouth promoting. Then in December 2018, many items in his newly released capsule collection sold out.</p>
                      <blockquote> <i className="fa fa-quote-left" /> The most interesting of these was called “Cheap Hotel Slippers” which were exactly what you’re picturing. This $4.99 footwear was one of the things that sold out in advance of the holiday season.</blockquote>
                      <p>The most telltale features of the Drew House clothing line are the smiley face logo with the word “Drew” used in place of a mouth. Are these fashion items revolutionary, or is Justin Bieber simply fooling everyone? When it comes to fashion, beauty can certainly be subjective, and these fashion items are only worth what someone is willing to pay for them. Most of Justin Bieber’s wardrobe consists of Drew House apparel, which instantly adds some appeal to it for his fans. Want to look like Justin Bieber? It’s as easy as purchasing the same shirts and hats he’s wearing.</p>
                      <p>The website adds to the intrigue, promoting an overall hip aesthetic that will resonate with a younger audience. The tagline reads like a random text message: “drew house is a place where you can be yourself. blah blah blah blahsdbksjdfhl wear like you don’t care. come chill. k. bye.”  The whole thing is intentionally weird and vague.</p>
                    </div>
                  </div>
                  <div className="share-social">
                    <div className="row">
                      <div className="col-12">
                        <div className="content-tags">
                          <h4>Tags:</h4>
                          <ul className="tag-inner">
                            <li><a href="#">Glass</a></li>
                            <li><a href="#">Pant</a></li>
                            <li><a href="#">t-shirt</a></li>
                            <li><a href="#">swater</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               			
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <div className="main-sidebar">
              {/* Single Widget */}
              <div className="single-widget search">
                <div className="form">
                  <input type="email" placeholder="Search Here..." />
                  <a className="button" href="#"><i className="fa fa-search" /></a>
                </div>
              </div>
              {/*/ End Single Widget */}
              {/* Single Widget */}
              <div className="single-widget category">
                <h3 className="title">Categories</h3>
                <ul className="categor-list">
                  <li><a href="#">Men's Hoodie</a></li>
                  <li><a href="#">Women's T-shirt</a></li>
                  <li><a href="#">Bags Collection</a></li>
                  <li><a href="#">Slippers</a></li>
                  <li><a href="#">Case</a></li>
                </ul>
              </div>
              {/*/ End Single Widget */}
              {/* Single Widget */}
              <div className="single-widget recent-post">
                <h3 className="title">Recent post</h3>
                {/* Single Post */}
                <div className="single-post">
                  <div className="image">
                    <img src="https://via.placeholder.com/100x100" alt="#" />
                  </div>
                  <div className="content">
                    <h5><a href="#">Top 10 Beautyful Women Dress in the world</a></h5>
                    <ul className="comment">
                      <li><i className="fa fa-calendar" aria-hidden="true" />Jan 11, 2020</li>
                      <li><i className="fa fa-commenting-o" aria-hidden="true" />35</li>
                    </ul>
                  </div>
                </div>
                {/* End Single Post */}
                {/* Single Post */}
                <div className="single-post">
                  <div className="image">
                    <img src="https://via.placeholder.com/100x100" alt="#" />
                  </div>
                  <div className="content">
                    <h5><a href="#">Top 10 Beautyful Women Dress in the world</a></h5>
                    <ul className="comment">
                      <li><i className="fa fa-calendar" aria-hidden="true" />Mar 05, 2019</li>
                      <li><i className="fa fa-commenting-o" aria-hidden="true" />59</li>
                    </ul>
                  </div>
                </div>
                {/* End Single Post */}
                {/* Single Post */}
                <div className="single-post">
                  <div className="image">
                    <img src="https://via.placeholder.com/100x100" alt="#" />
                  </div>
                  <div className="content">
                    <h5><a href="#">Top 10 Beautyful Women Dress in the world</a></h5>
                    <ul className="comment">
                      <li><i className="fa fa-calendar" aria-hidden="true" />June 09, 2019</li>
                      <li><i className="fa fa-commenting-o" aria-hidden="true" />44</li>
                    </ul>
                  </div>
                </div>
                {/* End Single Post */}
              </div>
              <div className="single-widget side-tags">
                <h3 className="title">Tags</h3>
                <ul className="tag">
                  <li><a href="#">hoodie</a></li>
                  <li><a href="#">sunglasses</a></li>
                  <li><a href="#">slippers</a></li>
                  <li><a href="#">t-shirt</a></li>
                  <li><a href="#">case</a></li>
                  <li><a href="#">curdoy</a></li>
 
                </ul>
              </div>
              {/*/ End Single Widget */}
              
            </div>
          </div>
        </div>
      </div>
    </section>

    );
  }
}

export default About;
