'use client';

// No backend on this static site — build a mailto: link from the filled-in
// fields and hand off to the visitor's own mail client rather than faking a
// server round-trip.
export default function ContactForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = `Portfolio contact from ${name}`;
    const body = `${message}\n\n— ${name} (${email})`;

    window.location.href = `mailto:mohamedsameer.s.2007@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
      </div>

      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" placeholder="you@email.com" autoComplete="email" required />
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows="4" placeholder="What are you building?" required />
      </div>

      <button type="submit" className="btn btn-primary form-submit">
        Send message
        <i data-lucide="arrow-up-right" width="16" height="16" aria-hidden="true"></i>
      </button>
    </form>
  );
}
