import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="App-Nav">
      
          <NavLink to="/" className="App-Nav-Link">Accueil</NavLink>
        
          <NavLink className="App-Nav-Link" to="/About">A propos</NavLink>
        
      
    </nav>
  );
}
