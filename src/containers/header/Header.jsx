import React from "react";
import { Link } from "react-router-dom";
// import people from '../../assets/people.png';
import ai from "../../assets/ai.png";
import "./header.css";

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <div className="flex__header__content">
        <h1 className="gradient__text">
          Earn passive income with POM Protocol
        </h1>
        <p>
          POM Protocol is designed to help fuel the future of mass-market
          blockchain applications building on Pomchain We aim to be the largest
          decentralized launchpad on Pomchain attracting solid projects and help
          them raise enough liquidity for their project development.
        </p>
      </div>

      <div className="header_button">
        <div className="gpt3__header-content__input">
          <Link className="goto_link" to="/activepools">
            Goto Pools
          </Link>
        </div>
      </div>
    </div>

    <div className="gpt3__header-image"></div>
  </div>
);

export default Header;
