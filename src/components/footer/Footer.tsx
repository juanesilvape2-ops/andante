import { Link } from "react-router";

import { contact } from "@/content/contact";

export function Footer() {
  return (
    <footer className="av-shell av-global-foot">
      <div className="av-global-foot-row">
        <Link className="av-global-foot-link" to="/contacto">
          Escribeme
        </Link>
        <a
          className="av-global-foot-link"
          href={contact.instagram.url}
          rel="noopener"
          target="_blank"
        >
          @{contact.instagram.handle}
        </a>
      </div>
      <p className="av-colophon">Esteban Silva, fotografia. Bogota, Colombia.</p>
    </footer>
  );
}
