
import { Link } from "react-router-dom";

function Dash() {
  return (
    <div>
      <h1>Login was Successfull!</h1>
      <p>This is the main landing page after login app.</p>
       
          <Link to="/">LogOut</Link>

    </div>
    
  );
}

export default Dash;
