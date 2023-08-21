import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF , faXTwitter , faTwitter ,faYoutube ,faInstagram} from "@fortawesome/free-brands-svg-icons";
import './SocialIcons.css'


function SocialIcons() {

    return (
        <ul className="list-unstyled mb-0 socialIcons">
              <li className="mb-1">
                <Link href="#!">
                  <button className="btn iconContainer">
                    <FontAwesomeIcon icon={faFacebookF} size="lg" />
                  </button>
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#!">
                  <button className="btn iconContainer">
                  <FontAwesomeIcon icon={faXTwitter} size="lg" />
                  </button>
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#!">
                  <button className="btn iconContainer">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                  </button>
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#!">
                  <button className="btn iconContainer">
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                  </button>
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#!">
                  <button className="btn iconContainer">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                  </button>
                </Link>
              </li>
            </ul>
    );
}

export default SocialIcons;