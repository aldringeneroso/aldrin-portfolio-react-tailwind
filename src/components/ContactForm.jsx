import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { profile } from '../content';
import Icon from './Icon';

// Public browser identifiers; the recipient is fixed in the EmailJS template.
const emailSettings = {
  serviceId:
    import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() || 'service_rhr5g8e',
  templateId:
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ||
    'template_portfolio_contact',
  publicKey:
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() || '0Y9oXmWf5gXz_QP86',
};
const emailReady = Object.values(emailSettings).every(Boolean);

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const inFlight = useRef(false);

  async function submit(event) {
    event.preventDefault();
    if (inFlight.current || !emailReady) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !message) {
      setStatus('Please enter your name and a message.');
      return;
    }

    inFlight.current = true;
    setSending(true);
    setStatus('');

    try {
      await emailjs.send(
        emailSettings.serviceId,
        emailSettings.templateId,
        {
          name,
          email,
          message,
          title: 'Portfolio inquiry',
          time: `${new Date().toLocaleString('en-PH', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: 'Asia/Manila',
          })} PHT`,
        },
        {
          publicKey: emailSettings.publicKey,
          limitRate: { id: 'portfolio-contact', throttle: 10000 },
        },
      );
      form.reset();
      setStatus('Your message has been sent. Thank you for reaching out!');
    } catch (error) {
      setStatus(
        error?.status === 429
          ? 'Please wait a moment before sending another message.'
          : 'Your message could not be sent. Please try again or email me directly.',
      );
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }
  return (
    <form className="contact-form" onSubmit={submit} aria-busy={sending}>
      <h3>Send a message</h3>
      <label htmlFor="name">
        Name
        <input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          required
          maxLength={100}
          disabled={sending}
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          maxLength={200}
          disabled={sending}
        />
      </label>
      <label htmlFor="message">
        Message
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project or opportunity…"
          required
          maxLength={1800}
          disabled={sending}
        />
      </label>
      <button
        className="button primary"
        type="submit"
        disabled={sending || !emailReady}
      >
        <Icon name="envelope" /> {sending ? 'Sending…' : 'Send message'}
      </button>
      <p className="caption">
        {emailReady
          ? 'Sends directly to my inbox. You can also '
          : 'The form is temporarily unavailable. You can '}
        <a href={`mailto:${profile.email}`}>email me directly</a>.
      </p>
      <p className="form-status" role="status">
        {status}
      </p>
    </form>
  );
}
