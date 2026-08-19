import { metrics } from "../data/about";
import { useCountUp } from "../hooks/useCountUp";
import "./Chiffres.css";

function pad(n: number): string {
  return n < 10 ? "0" + n : String(n);
}

export default function Chiffres() {
  const [ref, progress] = useCountUp();

  return (
    <section id="chiffres" data-screen-label="02 Chiffres" data-theme="dark" aria-labelledby="chiffres-title" className="yg-chiffres">
      <div aria-hidden="true" className="yg-chiffres-pattern" />
      <div ref={ref} className="yg-chiffres-inner">
        <div data-reveal="1" className="yg-chiffres-head">
          <h2 id="chiffres-title" className="yg-chiffres-title">
            Plusieurs entreprises,
            <br />
            une seule ambition
          </h2>
        </div>

        <div className="yg-chiffres-grid">
          {metrics.map((m) => {
            const value = Math.round(m.target * progress);
            const display = (m.pad ? pad(value) : String(value)) + (m.suffix ?? "");
            return (
              <div key={m.label} className="yg-chiffre-tile">
                <p className="yg-chiffre-value">{display}</p>
                <p className="yg-chiffre-label">{m.label}</p>
                <p className="yg-chiffre-ctx">{m.ctx}</p>
                <div className="yg-chiffre-chips">
                  {m.chips.map((c, i) => (
                    <span
                      key={i}
                      className="yg-chiffre-chip"
                      style={{ background: c.bg, marginLeft: i === 0 ? 0 : -10, zIndex: i + 1 }}
                    >
                      {c.img ? (
                        <img src={c.img} alt={c.imgAlt ?? c.label} className="yg-chiffre-chip-flag" />
                      ) : c.label.startsWith("+") || c.label.length <= 2 ? (
                        c.label
                      ) : (
                        c.label[0]
                      )}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
