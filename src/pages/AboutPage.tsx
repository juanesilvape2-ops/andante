import { useState } from "react";
import { Link } from "react-router";

import { Reveal } from "@/components/reveal/Reveal";
import { bio } from "@/content/bio";
import { categories } from "@/content/categories";
import { assetUrl } from "@/lib/asset-url";

function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="av-about-portrait">
      {failed ? null : (
        <img
          alt="Esteban Silva"
          loading="eager"
          onError={() => setFailed(true)}
          src={assetUrl("assets/brand/profile.jpg")}
        />
      )}
    </div>
  );
}

export function AboutPage() {
  const [firstParagraph, ...restParagraphs] = bio.paragraphs;

  return (
    <div className="av-page">
      <main className="av-shell av-page-main av-about" id="top">
        <span className="av-index">Sobre mi</span>
        <p className="av-about-kicker">{bio.kicker}</p>

        <div className="av-about-columns">
          <Reveal as="div" className="av-about-portrait-col">
            <Portrait />
          </Reveal>
          <div className="av-about-copy">
            {firstParagraph ? <p>{firstParagraph}</p> : null}
            {restParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <Reveal as="div" className="av-about-work">
          <span className="av-index">Cuatro frentes</span>
          <ul className="av-about-work-list">
            {categories.map((category) => (
              <li key={category.id}>
                <Link className="av-about-work-link" to={`/galeria#${category.id}`}>
                  <span className="av-about-work-label">{category.label}</span>
                  <span className="av-about-work-tagline">{category.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </main>
    </div>
  );
}
