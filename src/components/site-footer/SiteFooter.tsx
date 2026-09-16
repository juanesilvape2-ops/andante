export interface SiteFooterProps {
  email: string;
  whatsapp: { display: string; href: string };
  instagram: { handle: string; url: string };
}

export function SiteFooter({ email, whatsapp, instagram }: SiteFooterProps) {
  return (
    <footer className="av-shell" id="contacto">
      <div className="av-foot">
        <div>
          <h3>Disponible para colaboraciones en Bogota</h3>
          <p>
            Moda, retrato y trabajo documental. Escribeme y te paso disponibilidad, tarifas y el
            portafolio completo.
          </p>
          <a className="av-cta-bracket" href={`mailto:${email}`}>
            Abrir correo
          </a>
        </div>
        <ul className="av-contact">
          <li>
            <span className="k">CORREO</span>
            <a href={`mailto:${email}`}>{email}</a>
          </li>
          <li>
            <span className="k">WHATSAPP</span>
            <a href={whatsapp.href}>{whatsapp.display}</a>
          </li>
          <li>
            <span className="k">INSTAGRAM</span>
            <a href={instagram.url} rel="noopener" target="_blank">
              @{instagram.handle}
            </a>
          </li>
        </ul>
      </div>
      <p className="av-colophon">Esteban Silva, fotografia. Bogota, Colombia.</p>
    </footer>
  );
}
