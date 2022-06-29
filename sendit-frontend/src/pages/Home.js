import React from "react";
import Victoria from "../images/victoria.jpg";
import Brett from "../images/brett.jpg";
import Lucian from "../images/lucian.jpg";
import "../styles/home.css";

 const Home = () => {
    return (
      <div className="main">
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Victoria} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block carousel-text">
                <h3> SENDIT </h3>
                <p>We bring the store to your door...</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={Lucian} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block carousel-text">
                <h3>At your click, we deliver freshness...</h3>
              </div>
            </div>
            <div className="carousel-item">
              <img src={Brett} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block carousel-text">
                <h3>Fall in love with our service</h3>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
}

export default Home;