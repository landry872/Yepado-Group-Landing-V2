import { filiales, logoPath } from "../data/filiales";
import "./FilialesMarquee.css";

function LogoItem({ f, hidden }: { f: (typeof filiales)[number]; hidden?: boolean }) {
  return (
    <div className="yg-band-logo" aria-hidden={hidden || undefined}>
      {f.logo ? (
        <span className="yg-band-wrap" style={{ height: f.bandH }}>
          <img
            src={logoPath(f.logo, "navy")}
            alt={hidden ? "" : f.name}
            className="yg-band-navy"
            style={{ height: f.bandH }}
          />
          <img src={logoPath(f.logo, "color")} alt="" aria-hidden="true" className="yg-band-color" style={{ height: f.bandH }} />
        </span>
      ) : (
        <span className="yg-band-text">{f.name}</span>
      )}
    </div>
  );
}

export default function FilialesMarquee() {
  return (
    <div className="yg-band-wrapper">
      <div className="yg-marq yg-band-marq">
        <div className="yg-marq-track yg-band-track">
          {filiales.map((f) => (
            <LogoItem key={f.key} f={f} />
          ))}
          {filiales.map((f) => (
            <LogoItem key={`${f.key}-dup`} f={f} hidden />
          ))}
        </div>
      </div>
    </div>
  );
}
