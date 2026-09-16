export interface ContactDetailsProps {
  email: string;
  whatsapp: { display: string; href: string };
  instagram: { handle: string; url: string };
}

export function ContactDetails({ email, whatsapp, instagram }: ContactDetailsProps) {
  return (
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
  );
}
