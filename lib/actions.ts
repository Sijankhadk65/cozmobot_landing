"use server";

const CONTACT_EMAIL = "info@cozmobot.com";

const REASONS = {
  demo: "Demo request",
  partnership: "Partnership inquiry",
  other: "General inquiry",
} as const;

type Reason = keyof typeof REASONS;

type Field = "name" | "email" | "company" | "reason" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<Field, string>>;
  values: Partial<Record<Field, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SUCCESS_MESSAGE =
  "Thanks — your message is on its way. We usually reply within one business day.";

function read(formData: FormData, field: Field) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    company: read(formData, "company"),
    reason: read(formData, "reason"),
    message: read(formData, "message"),
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

  if (!(values.reason in REASONS)) fieldErrors.reason = "Please choose a reason.";

  if (values.message.length < 10)
    fieldErrors.message = "Tell us a little more — at least a sentence.";
  else if (values.message.length > 2000)
    fieldErrors.message = "Please keep this under 2000 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  const reason = values.reason as Reason;
  const subject = values.company
    ? `${REASONS[reason]} — ${values.name} (${values.company})`
    : `${REASONS[reason]} — ${values.name}`;

  const body = [
    `Reason:  ${REASONS[reason]}`,
    `Name:    ${values.name}`,
    `Email:   ${values.email}`,
    values.company ? `Company: ${values.company}` : null,
    "",
    values.message,
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
