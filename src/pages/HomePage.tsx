import { PhotoGrid } from "@/components/photo-grid/PhotoGrid";
import { ScrollScrub } from "@/components/scroll-scrub/ScrollScrub";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { SiteNav } from "@/components/site-nav/SiteNav";
import { Statement } from "@/components/statement/Statement";
import { contact } from "@/content/contact";
import { calleRows, modaRows } from "@/content/photos";
import { scrollScrubScenes, scrollScrubTheme } from "@/content/scenes";

export function HomePage() {
  return (
    <div className="av-page">
      <SiteNav />

      <main id="top">
        <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} />

        <section className="av-section" id="moda">
          <div className="av-shell">
            <header className="av-sechead">
              <div>
                <span className="av-index">01 / Moda</span>
                <h2>Moda y retrato</h2>
              </div>
              <p>Luz disponible, direccion sencilla, encuadres que dejan respirar a la prenda.</p>
            </header>
            <PhotoGrid insets={["", "av-row--inset-right"]} rows={modaRows} />
          </div>
        </section>

        <Statement>La misma pausa con la que miro una calle es la que llevo a un set.</Statement>

        <section className="av-section" id="calle">
          <div className="av-shell">
            <header className="av-sechead">
              <div>
                <span className="av-index">02 / Calle</span>
                <h2>Trabajo documental</h2>
              </div>
              <p>Serie Margenes. Bogota y Europa, camara en mano, sin poner nada en escena.</p>
            </header>
            <PhotoGrid insets={["", "", "av-row--inset"]} rows={calleRows} />
          </div>
        </section>

        <SiteFooter
          email={contact.email}
          instagram={contact.instagram}
          whatsapp={contact.whatsapp}
        />
      </main>
    </div>
  );
}
