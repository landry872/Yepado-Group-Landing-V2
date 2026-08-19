import { filiales } from "../data/filiales";
import "./Footer.css";

export default function Footer() {
  return (
    <footer data-screen-label="10 Footer" data-theme="dark" className="yg-footer">
      <div className="yg-footer-cols">
        <div className="yg-footer-brand">
          <img src="/logos/yepado-white.svg" alt="Yepado Group" className="yg-footer-logo" />
          <p className="yg-footer-tagline">Holding technologique africaine · Abidjan, depuis 2022</p>
        </div>
        <div className="yg-footer-col">
          <p className="yg-footer-heading">Groupe</p>
          <div className="yg-footer-links">
            <a href="#chiffres">Chiffres clés</a>
            <a href="#groupe">Le Groupe</a>
            <a href="#partenaires">Partenaires</a>
            <a href="#filiales">Filiales</a>
            <a href="#solutions">Solutions</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="yg-footer-col">
          <p className="yg-footer-heading">Filiales</p>
          <div className="yg-footer-links">
            {filiales.map((f) => (
              <a key={f.key} href="#filiales">
                {f.name}
              </a>
            ))}
          </div>
        </div>
        <div className="yg-footer-col">
          <p className="yg-footer-heading">Contact</p>
          <div className="yg-footer-links">
            <a href="tel:+2250700240024">+225 0700 240 024</a>
            <a href="https://wa.me/2250700240024" target="_blank" rel="noopener">
              WhatsApp Business ↗
            </a>
            <span className="yg-footer-address">Cocody Centre, face Église Saint-Jean, Abidjan</span>
          </div>
        </div>
      </div>
      <div className="yg-footer-legal-wrap">
        <div className="yg-footer-legal">
          <div className="yg-footer-legal-links">
            <a href="https://yepadogroup.com" target="_blank" rel="noopener">
              yepadogroup.com
            </a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">Conditions générales</a>
          </div>
          <div className="yg-footer-social">
            <a href="#">Facebook</a>
            <a href="#">LinkedIn</a>
          </div>
          <p className="yg-footer-copyright">© 2026 Yepado Group. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
