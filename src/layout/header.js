import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="container-fluid text-center mt-3">
        <Link to="/" style={{ marginRight: "20px", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          Login
        </Link>
      </div>
    </>
  );
}

export default Header;
