import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>our menu</h3>
          <Link to="#">
            <i className="fas fa-arrow-right"></i> pizza
          </Link>
          <Link to="#">
            <i className="fas fa-arrow-right"></i> burger
          </Link>
          <Link to="#">
            <i className="fas fa-arrow-right"></i> chicken
          </Link>
          <Link to="#">
            <i className="fas fa-arrow-right"></i> pasta
          </Link>
          <Link to="#">
            <i className="fas fa-arrow-right"></i> and more...
          </Link>
        </div>

        <div className="box">
          <h3>quick links</h3>
          <Link to="#home">
            {" "}
            <i className="fas fa-arrow-right"></i> home
          </Link>
          <Link to="#about">
            {" "}
            <i className="fas fa-arrow-right"></i> about
          </Link>
          <Link to="#popular">
            {" "}
            <i className="fas fa-arrow-right"></i> popular
          </Link>
          <Link to="#menu">
            {" "}
            <i className="fas fa-arrow-right"></i> menu
          </Link>
          <Link to="#order">
            {" "}
            <i className="fas fa-arrow-right"></i> order
          </Link>
          <Link to="#blogs">
            {" "}
            <i className="fas fa-arrow-right"></i> blogs
          </Link>
        </div>

        <div className="box">
          <h3>extra links</h3>
          <Link to="#">
            {" "}
            <i className="fas fa-arrow-right"></i> my order
          </Link>
          <Link to="#">
            {" "}
            <i className="fas fa-arrow-right"></i> my account
          </Link>
          <Link to="#">
            {" "}
            <i className="fas fa-arrow-right"></i> my favorite
          </Link>
          <Link to="#">
            {" "}
            <i className="fas fa-arrow-right"></i> terms of use
          </Link>
          <Link to="#">
            {" "}
            <i className="fas fa-arrow-right"></i> privary policy
          </Link>
        </div>

        <div className="box">
          <h3>opening hours</h3>
          <p>monday : 7:00am to 10:00pm</p>
          <p>tuesday : 7:00am to 10:00pm</p>
          <p>wednesday : 7:00am to 10:00pm</p>
          <p>friday : 7:00am to 10:00pm</p>
          <p>saturday and sunday closed</p>
        </div>
      </div>

      <div className="bottom">
        <div className="share">
          <Link to="#" className="fab fa-facebook-f"></Link>
          <Link to="#" className="fab fa-twitter"></Link>
          <Link to="#" className="fab fa-instagram"></Link>
          <Link to="#" className="fab fa-linkedin"></Link>
          <Link to="#" className="fab fa-pinterest"></Link>
        </div>

        <div className="credit">
          {" "}
          created <span>Darshan</span> | all rights reserved!{" "}
        </div>
      </div>
    </section>
  );
}
