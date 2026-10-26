# CozmoBot · nex-ON site

The site for Orio, CozmoBot's companion robot for the home, and nex-ON, the
embodied OS it runs on. Live at [cozmobot.com](https://cozmobot.com).

Built with Next.js 16 (App Router), React 19 and Tailwind CSS v4.

> Next.js 16 differs from older versions in places. Check
> `node_modules/next/dist/docs/` before reaching for an API from memory.

## Getting started

Requires Node 20.19 or newer.

```bash
npm install
cp .env.example .env.local   # optional, see "Contact form" below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script          | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Development server               |
| `npm run build` | Production build                 |
| `npm run start` | Serve the production build       |
| `npm run lint`  | ESLint                           |

## Routes

| Path        | Page                                                    |
| ----------- | ------------------------------------------------------- |
| `/`         | Orio: what it does, keep watch and SOS, pre-order, FAQ  |
| `/platform` | Technical brief for the nex-ON platform                 |
| `/company`  | Company                                                 |
| `/contact`  | Orio pre-order; `?intent=pilot` for the business pilot  |

`/omnicron` (the old Weld OS page) permanently redirects to `/platform`.

## Layout

```
app/                  routes, root layout, fonts, globals.css (the design system)
components/sections/  one file per home-page section (Orio*, PoweredBy, Faq)
components/site/      header, footer, logo, shared pieces (PilotCTA, StatBar)
components/ContactForm.tsx
lib/actions.ts        contact form server action
lib/rate-limit.ts     Upstash rate limiter for the form
lib/contact-options.ts edition and robot choices shared by form and action
assets/               images imported by pages, logo source files
```

## Design system

Everything lives in `app/globals.css`: cream paper, olive ink, a single lime
accent, and 1px hairline rules doing all the dividing. Nothing is rounded and
nothing casts a shadow. Three typefaces, each with one job:

- **Satoshi** for everything readable
- **Orbitron** for uppercase micro-labels, nav and buttons only
- **JetBrains Mono** for the session transcript

## Contact form

The `/contact` form serves two asks: an Orio pre-order (the default) and a
business pilot request (`?intent=pilot`). It posts to a server action that
validates input, drops honeypot submissions, rate limits by IP and delivers through
[Resend](https://resend.com) to business@cozmobot.com. Configure it in
`.env.local`:

| Variable                   | Purpose                                              |
| -------------------------- | ---------------------------------------------------- |
| `RESEND_API_KEY`           | Resend API key                                       |
| `CONTACT_FROM_EMAIL`       | From address on a Resend-verified domain             |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis, for the 5-per-IP-per-hour limit       |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token                                  |

Without the Resend variables the form still renders and validates, but asks
visitors to email directly. Without the Upstash variables it sends unlimited
and logs a warning. The limiter fails open by design: a lost lead costs more
than a spam message.
