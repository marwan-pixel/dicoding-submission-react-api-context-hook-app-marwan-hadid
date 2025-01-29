import { Link } from "react-router-dom";
import { FiHome, FiBookmark, FiPlus, FiLogOut } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import NoteContext from "../contexts/NoteContext";
import PropTypes from "prop-types";

function Navigation({ logout, name }) {
  return (
    <NoteContext.Consumer>
      {({ locale, toggleLocale, theme, toggleTheme }) => {
        return (
          <nav className="navigation">
            <ul>
              <li>
                <button onClick={toggleTheme}>
                  {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>
              </li>
              <li>
                <button onClick={toggleLocale}>
                  <p>{locale === "id" ? "en" : "id"}</p>
                </button>
              </li>
              <li>
                <Link to="/">
                  <FiHome />
                </Link>
              </li>
              <li>
                <Link to="/archived">
                  <FiBookmark />
                </Link>
              </li>
              <li>
                <Link to="/add">
                  <FiPlus />
                </Link>
              </li>
              <li>
                <button onClick={logout}>
                  <p>{name}</p>
                  <FiLogOut />
                </button>
              </li>
            </ul>
          </nav>
        );
      }}
    </NoteContext.Consumer>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
