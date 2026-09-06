"use server";

import { headers } from "next/headers";
import { allowContactSend } from "./rate-limit";
import { EDITIONS, ROBOTS } from "./contact-options";

const CONTACT_EMAIL = "business@cozmobot.com";

type Field = "name" | "email" | "company" | "edition" | "robot" | "task";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<Field, string>>;
  values: Partial<Record<Field, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SUCCESS_MESSAGE =
  "Thanks — we'll be in touch about your task. We reply within two working days.";

function read(formData: FormData, field: Field) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

async function clientIp() {
  const headerList = await headers();
  // Prefer x-real-ip: the platform sets it. A client can prepend entries to
  // x-forwarded-for, so its left-most value is only trustworthy behind a proxy
  // that overwrites the header.
  const realIp = headerList.get("x-real-ip");
  if (realIp) return realIp.trim();
  const forwarded = headerList.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || null;
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    company: read(formData, "company"),
    edition: read(formData, "edition"),
    robot: read(formData, "robot"),
    task: read(formData, "task"),
  };

  // Bots fill every field they find; the "website" input is hidden from humans.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success", message: SUCCESS_MESSAGE, fieldErrors: {}, values: {} };
  }

  const fieldErrors: Partial<Record<Field, string>> = {};

  if (!values.name) fieldErrors.name = "Please tell us your name.";
  else if (values.name.length > 100) fieldErrors.name = "That name is too long.";

  if (!values.email) fieldErrors.email = "We need an email to reply to.";
  else if (!EMAIL_PATTERN.test(values.email) || values.email.length > 200)
    fieldErrors.email = "That doesn't look like a valid email address.";

  if (values.company.length > 100) fieldErrors.company = "That company name is too long.";

  if (!(values.edition in EDITIONS))
    fieldErrors.edition = "Please choose an edition.";
  if (!(values.robot in ROBOTS))
    fieldErrors.robot = "Please tell us what's on site.";

  if (values.task.length < 10)
    fieldErrors.task = "Tell us a little more — at least a sentence.";
  else if (values.task.length > 2000)
    fieldErrors.task = "Please keep this under 2000 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  // Counted here rather than at the top of the action so that a visitor who
  // fumbles the email field three times doesn't burn their quota.
  if (!(await allowContactSend(await clientIp()))) {
    return {
      status: "error",
      message: `You've sent several requests recently. Please email us directly at ${CONTACT_EMAIL}.`,
      fieldErrors: {},
      values,
    };
  }

  const edition = EDITIONS[values.edition as keyof typeof EDITIONS];
  const robot = ROBOTS[values.robot as keyof typeof ROBOTS];

  const subject = values.company
    ? `Pilot request — ${values.name} (${values.company}) · ${edition}`
    : `Pilot request — ${values.name} · ${edition}`;

  const body = [
    `Edition: ${edition}`,
    `Robot:   ${robot}`,
    `Name:    ${values.name}`,
    `Email:   ${values.email}`,
    values.company ? `Company: ${values.company}` : null,
    "",
    values.task,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    await sendEmail({ subject, body, replyTo: values.email });
  } catch (error) {
    console.error("[contact] failed to deliver submission", error);
    return {
      status: "error",
      message: `Something went wrong on our end. Please email us directly at ${CONTACT_EMAIL}.`,
      fieldErrors: {},
      values,
    };
  }

  return { status: "success", message: SUCCESS_MESSAGE, fieldErrors: {}, values: {} };
}

async function sendEmail({
  subject,
  body,
  replyTo,
}: {
  subject: string;
  body: string;
  replyTo: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error(
      "RESEND_API_KEY and CONTACT_FROM_EMAIL must be set for the contact form to deliver mail.",
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [CONTACT_EMAIL],
      reply_to: replyTo,
      subject,
      text: body,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}
