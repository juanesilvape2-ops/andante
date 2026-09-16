import { ContactDetails } from "@/components/contact-details/ContactDetails";
import { contact } from "@/content/contact";

export function ContactPage() {
  return (
    <div className="av-page">
      <main className="av-shell av-page-main" id="top">
        <div className="av-foot">
          <div>
            <h1>Disponible para colaboraciones en Bogota</h1>
            <p>{contact.intro}</p>
            <a className="av-cta-bracket" href={`mailto:${contact.email}`}>
              Abrir correo
            </a>
          </div>
          <ContactDetails
            email={contact.email}
            instagram={contact.instagram}
            whatsapp={contact.whatsapp}
          />
        </div>
        <p className="av-colophon">Esteban Silva, fotografia. Bogota, Colombia.</p>
      </main>
    </div>
  );
}
