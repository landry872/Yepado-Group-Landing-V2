import { partners } from "../data/filiales";
import "./Partners.css";

const loop = [...partners, ...partners, ...partners, ...partners, ...partners, ...partners];

export default function Partners() {
  return (
    <section id="partenaires" data-screen-label="Partenaires" aria-labelledby="partenaires-title" className="yg-partners">
      <div className="yg-partners-inner">
        <h2 id="partenaires-title" className="yg-partners-title">
          NOS PARTENAIRES
        </h2>
        <div className="yg-marq">
          <div className="yg-marq-track yg-partners-track">
            {loop.map((p, i) => (
              <img key={i} src={p.logo} alt={p.name} className="yg-partner-logo" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
