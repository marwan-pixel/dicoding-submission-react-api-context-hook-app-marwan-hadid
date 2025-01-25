import { Link } from "react-router-dom";
import { FiHome, FiBookmark, FiPlus } from "react-icons/fi";
function Navigation() {
  return (
    <nav className="navigation">
      <ul>
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
      </ul>
    </nav>
  );
}

export default Navigation;
