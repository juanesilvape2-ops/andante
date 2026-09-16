import { NavLink } from "react-router";

export function SiteNav() {
  return (
    <nav className="av-nav">
      <NavLink className="av-wordmark" to="/">
        Esteban Silva
      </NavLink>
      <div className="av-navlinks">
        <NavLink className="av-navlink" to="/galeria">
          Galeria
        </NavLink>
        <NavLink className="av-navlink" to="/sobre-mi">
          Sobre mi
        </NavLink>
        <NavLink className="av-cta-rule" to="/contacto">
          Escribeme
        </NavLink>
      </div>
    </nav>
  );
}
