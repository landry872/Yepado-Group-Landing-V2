import { useState } from "react";
import { ArrowIcon } from "./Header";
import "./Contact.css";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: no real backend yet — wire this up to a form endpoint (Formspree,
    // a serverless function, or a mailto: fallback) to actually deliver messages.
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 700);
  };

  return (
    <section id="contact" data-screen-label="09 Contact" data-theme="dark" aria-labelledby="contact-title" className="yg-contact">
      <div className="yg-contact-inner">
        <div className="yg-contact-head">
          <h2 id="contact-title" className="yg-contact-title">
            Parlons de votre projet
          </h2>
          <p className="yg-contact-lead">
            Client, partenaire ou investisseur, notre équipe répond rapidement à toutes vos demandes.
          </p>
        </div>

        <div className="yg-contact-cols">
          <div className="yg-contact-form-col">
            {sent ? (
              <div role="status" aria-live="polite" className="yg-contact-success">
                <p className="yg-contact-success-title">Message envoyé</p>
                <p className="yg-contact-success-sub">Nous revenons vers vous sous 24 h ouvrées.</p>
                <button type="button" onClick={() => setSent(false)} className="yg-contact-reset">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="yg-contact-form">
                <label className="yg-field">
                  <span className="yg-field-label">Nom complet</span>
                  <input type="text" name="nom" autoComplete="name" className="yg-field-input" />
                </label>

                <div className="yg-field-grid">
                  <label className="yg-field">
                    <span className="yg-field-label">Entreprise</span>
                    <input type="text" name="entreprise" autoComplete="organization" className="yg-field-input" />
                  </label>
                  <label className="yg-field">
                    <span className="yg-field-label">E-mail</span>
                    <input type="email" name="email" inputMode="email" autoComplete="email" className="yg-field-input" />
                  </label>
                </div>

                <label className="yg-field">
                  <span className="yg-field-label">Message</span>
                  <textarea name="message" rows={5} className="yg-field-textarea" />
                </label>

                <label className="yg-field-checkbox">
                  <input type="checkbox" name="rgpd" />
                  <span>
                    J’accepte que mes données soient utilisées pour traiter ma demande. Elles ne sont ni revendues ni
                    transmises à des tiers.
                  </span>
                </label>

                <div>
                  <button type="submit" className="yg-btn yg-contact-submit" disabled={sending}>
                    {sending ? "Envoi…" : "Envoyer le message"}
                    <ArrowIcon />
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="yg-contact-info-col">
            <p className="yg-contact-info-label">Coordonnées</p>
            <div className="yg-contact-info-list">
              <a href="tel:+2250700240024" className="yg-contact-info-item">
                <span className="yg-contact-info-kicker">Téléphone</span>
                <span>+225 0700 240 024</span>
              </a>
              <a href="https://wa.me/2250700240024" target="_blank" rel="noopener" className="yg-contact-info-item">
                <span className="yg-contact-info-kicker">WhatsApp Business</span>
                <span className="yg-contact-info-external">
                  Réponse rapide garantie
                  <ExternalArrow />
                </span>
              </a>
              <a
                href="https://maps.google.com/?q=Cocody+Centre+Abidjan"
                target="_blank"
                rel="noopener"
                className="yg-contact-info-item"
              >
                <span className="yg-contact-info-kicker">Siège social</span>
                <span className="yg-contact-info-external">
                  Cocody Centre, face Église Saint-Jean, Abidjan
                  <ExternalArrow />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExternalArrow() {
  return (
    <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", transform: "rotate(-45deg)" }}>
      <svg viewBox="0 0 14 14" fill="none" style={{ width: 14, height: 14, display: "block" }}>
        <path d="M2.91699 7L11.0837 7" stroke="currentColor" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M7 2.91602L11.0833 6.99935L7 11.0827"
          stroke="currentColor"
          strokeWidth="1.45833"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
