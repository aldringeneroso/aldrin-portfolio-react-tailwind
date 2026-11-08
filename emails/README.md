# Portfolio contact email

The receiving email uses [Lee Munroe’s responsive HTML email template](https://github.com/leemunroe/responsive-html-email-template), adapted from `email-inlined.html` (source blob `0dfecc521e7c1d2999a8676fc0f8a74746a9c97d`). Its responsive tables, inline styling, call-to-action button, and email-client compatibility rules are retained. The content and colors are adapted for Aldrin’s portfolio. The original MIT license is included in `LICENSE.txt`.

## EmailJS dashboard

1. Connect a sending service under **Email Services** using your own email provider account. Review and approve its permissions yourself. Keep the free plan; no paid subscription or automatic reply is required.
2. Create a template under **Email Templates**. Open its HTML/code editor and paste the complete contents of `contact-notification.html`.
3. Apply these template fields:

| Field         | Value                                             |
| ------------- | ------------------------------------------------- |
| Template name | Aldrin Portfolio Contact                          |
| To Email      | `aldringeneroso1@gmail.com` (fixed text)          |
| From Name     | `{{name}} via Aldrin's Portfolio`                 |
| From Email    | Use Default Email Address (the connected service) |
| Reply To      | `{{email}}`                                       |
| Subject       | `Portfolio inquiry — {{name}}`                    |
| CC / BCC      | Empty                                             |
| Auto-Reply    | Off                                               |

Keep **To Email** fixed in the dashboard. The website does not supply a recipient variable. Visitors provide their name, email, and message; their email is used for **Reply To**, while the sender remains your connected service.

The form supplies `name`, `email`, `message`, `title`, and `time`. The timestamp is shown in Philippine time. All visitor content uses escaped `{{variable}}` placeholders; retain the double braces. The message block preserves line breaks without accepting raw HTML.

4. Save the template and note its **Template ID**. Find your **Service ID** under Email Services and **Public Key** under Account.
5. The portfolio's public browser identifiers are configured in `src/components/ContactForm.jsx` so production builds do not need private credentials. The saved service is `service_rhr5g8e` and receiving template is `template_portfolio_contact`.
6. To replace the EmailJS account, copy `.env.example` to `.env.local` and fill in all three public identifiers. Restart Vite after changing them. For deployment overrides, set the same three `VITE_EMAILJS_*` variables in your hosting project's environment settings and redeploy. Vite embeds these optional overrides during the build; a local `.env.local` file is not uploaded to Git.

EmailJS's **Public Key** is designed for use in browser code, alongside the Service ID and Template ID. The private key, email password, and OAuth tokens are never placed in the project. See [EmailJS's public-key guidance](https://www.emailjs.com/docs/faq/is-it-okay-to-expose-my-public-key/).

The form is enabled only when all three identifiers exist. Otherwise it offers a direct email link. During a send, controls are disabled to avoid duplicate requests. Failed requests keep the message, and successful requests clear it. The SDK throttles repeated sends for ten seconds in the browser; this does not replace EmailJS's service-side limits.

This setup uses one template and one request per submission. Check [EmailJS's current plan limits](https://www.emailjs.com/pricing/) before publishing, and verify delivery using your connected service.

## References

- [EmailJS send SDK](https://www.emailjs.com/docs/sdk/send/)
- [EmailJS template settings](https://www.emailjs.com/docs/user-guide/creating-email-templates/)
- [Escaped dynamic variables](https://www.emailjs.com/docs/user-guide/dynamic-variables-templates/)
- [EmailJS free-plan limits](https://www.emailjs.com/pricing/)
- [Vite environment variables](https://vite.dev/guide/env-and-mode)
