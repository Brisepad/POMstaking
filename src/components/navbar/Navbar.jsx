import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../logo.svg";
import truncateWalletAddress from "../../utils/truncateWalletAddress";
import AccountModal from "../wallet/AccountModal";
import { connectorLocalStorageKey } from "../wallet/config";
import WalletModal from "../wallet/WalletModal";
import "./navbar.css";

const Navbar = () => {
  const { login, logout } = useAuth();
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [openWalletModal, setOpenWalletModal] = useState(false);

  const showToggleMenu = () => {
    setToggleMenu(true);
    setOpenWalletModal(false);
  };

  const closeToggleMenu = () => {
    setToggleMenu(false);
  };

  const showWalletModal = () => {
    setOpenWalletModal(true);
    setToggleMenu(false);
  };

  const closeWalletModal = () => {
    setOpenWalletModal(false);
  };

  const accountLogout = () => {
    logout();
    closeWalletModal();
  };

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      const connectorId = localStorage?.getItem(connectorLocalStorageKey);
      if (connectorId) {
        try {
          login(connectorId);
          window.initWeb3 = library;
          // localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  return (
    <>
      <div className="gpt3__navbar">
        <div className="gpt3__navbar-links">
          <div className="gpt3__navbar-links_logo">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "activeLink" : undefined
              }
            >
              <h3 id="text_logo">POM PROTOCOL</h3>
              {/* <img style={{ marginBottom: -5 }} src='/images/briselogo/brise-vertical.png' alt="BrisePad" /> */}
            </NavLink>
          </div>
          <div className="gpt3__navbar-links_container">
            <p>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "activeLink" : undefined
                }
              >
                Home
              </NavLink>
            </p>
            <p>
              <NavLink
                to="/activepools"
                className={({ isActive }) =>
                  isActive ? "activeLink" : undefined
                }
              >
                Pools
              </NavLink>
            </p>
            <p>
              <NavLink
                to="/inactivepools"
                className={({ isActive }) =>
                  isActive ? "activeLink" : undefined
                }
              >
                Finished
              </NavLink>
            </p>
          </div>
        </div>
        <div className="gpt3__navbar-sign">
          {/* <p>Get Loan</p> */}
          <button onClick={showWalletModal} type="button">
            {active ? truncateWalletAddress(account) : "Connect"}
          </button>
        </div>
        <div className="gpt3__navbar-menu">
          {toggleMenu ? (
            <RiCloseLine color="#fff" size={27} onClick={closeToggleMenu} />
          ) : (
            <RiMenu3Line color="#fff" size={27} onClick={showToggleMenu} />
          )}
          {toggleMenu && (
            <div className="gpt3__navbar-menu_container scale-up-center">
              <div className="gpt3__navbar-menu_container-links">
                <p>
                  <NavLink
                    onClick={closeToggleMenu}
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "activeLink" : undefined
                    }
                  >
                    Home
                  </NavLink>
                </p>
                <p>
                  <NavLink
                    onClick={closeToggleMenu}
                    to="/activepools"
                    className={({ isActive }) =>
                      isActive ? "activeLink" : undefined
                    }
                  >
                    Pools
                  </NavLink>
                </p>
                <p>
                  <NavLink
                    onClick={closeToggleMenu}
                    to="/inactivepools"
                    className={({ isActive }) =>
                      isActive ? "activeLink" : undefined
                    }
                  >
                    Finished
                  </NavLink>
                </p>
              </div>
              <div className="gpt3__navbar-menu_container-links-sign">
                {/* <p>Launch Loan App</p> */}
                <button onClick={showWalletModal} type="button">
                  {active ? truncateWalletAddress(account) : "Connect"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {openWalletModal &&
        (active ? (
          <AccountModal
            account={account}
            logout={accountLogout}
            onDismiss={closeWalletModal}
          />
        ) : (
          <WalletModal
            login={login}
            logout={logout}
            onDismiss={closeWalletModal}
          />
        ))}
    </>
  );
};

export default Navbar;
