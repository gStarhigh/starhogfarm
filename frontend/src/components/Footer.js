// React
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  FaPhoneVolume,
  FaEnvelope,
  FaPaperPlane,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

// Styles
import styles from "../styles/Footer.module.css";

function Footer() {
  const emailAddress = "starhog.gard@gmail.com";
  const address = " Öja 4683, Klippan, Sverige";
  const instagram =
    "https://www.instagram.com/mariafragrant?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
  const facebook = "https://www.facebook.com/profile.php?id=100057514326453";

  return (
    <>
      <div className={styles.Footer}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-12">
              <div className={styles.ft2}>
                <h5>Sociala Medier</h5>
                <div className={styles.footerIcons}>
                  <a href={facebook} target="_blank" rel="noopener noreferrer">
                    <FaFacebookF className={styles.SocialFbIcon} />
                  </a>
                  <a href={instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram className={styles.SocialInstaIcon} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4 col-12">
              <div className={styles.ft2}>
                <h5>Länkar</h5>
                <ul>
                  <li>
                    <Link to={"/events"} className={styles.Links}>
                      Evenemang
                    </Link>
                  </li>
                  <li className="">
                    <Link to={"/ridlektioner"} className={styles.Links}>
                      Ridlektioner
                    </Link>
                  </li>
                  <li className="">
                    <Link to={"/kontakt"} className={styles.Links}>
                      Kontakta oss
                    </Link>
                  </li>
                  <li className="">
                    <Link to={"/om-oss"} className={styles.Links}>
                      Om oss
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-12 col-lg-4 col-12">
              <div className={styles.ft3}>
                <h5>Information</h5>
                <p>
                  <FaPhoneVolume /> 0705 57 57 97
                </p>
                <p>
                  <a className={styles.Mail} href={`mailto:${emailAddress}`}>
                    <FaEnvelope /> starhog.gard@gmail.com
                  </a>
                </p>
                <p>
                  <a
                    className={styles.Mail}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaPaperPlane />
                    {address}
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.Rights}>
            &#169; Alla rättigheter reserverade{" "}
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
