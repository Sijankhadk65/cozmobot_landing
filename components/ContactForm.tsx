"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, CircleAlert, CircleCheck } from "lucide-react";
import { submitContact, type ContactState } from "@/lib/actions";

const initialState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: {},
};

const reasons = [
  { value: "demo", label: "Book a demo" },
  { value: "partnership", label: "Partner with us" },
  { value: "other", label: "Something else" },
];

const fieldClass =
  "w-full rounded-lg bg-carbon border border-steel px-4 py-3 text-sm text-offwhite placeholder:text-mute/60 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40";
const labelClass = "block text-xs font-medium text-mute mb-2";

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-red-400">
      {children}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [reason, setReason] = useState("demo");
  const reasonRef = useRef<HTMLSelectElement>(null);

  // React resets the form after every action. The reset writes the select back
  // to its first option, and because `value` hasn't changed across renders
  // React won't reconcile it — so a failed partnership inquiry would come back
  // as a demo request. Restore it once the reset has landed.
  useEffect(() => {
    if (reasonRef.current) reasonRef.current.value = reason;
  }, [state, reason]);

  if (state.status === "success") {
    return (
      <div className="mt-10 max-w-xl mx-auto p-8 bg-carbon rounded-xl border border-accent/30 text-center">
        <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
          <CircleCheck size={18} className="text-accent" />
        </div>
        <p className="text-offwhite font-semibold">Message sent</p>
        <p className="mt-2 text-sm text-mute leading-relaxed">{state.message}</p>
      </div>
    );
  }

  const { fieldErrors, values } = state;

  return (
    <form
      action={formAction}
      className="relative mt-10 max-w-xl mx-auto text-left p-6 sm:p-8 bg-carbon rounded-xl border border-steel"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={values.name}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            className={fieldClass}
            placeholder="Jane Okafor"
          />
          <FieldError id="name-error">{fieldErrors.name}</FieldError>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={values.email}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={fieldClass}
            placeholder="jane@company.com"
          />
          <FieldError id="email-error">{fieldErrors.email}</FieldError>
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            Company <span className="text-mute/60">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            defaultValue={values.company}
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={fieldErrors.company ? "company-error" : undefined}
            className={fieldClass}
            placeholder="Acme Fabrication"
          />
          <FieldError id="company-error">{fieldErrors.company}</FieldError>
        </div>

        <div>
          <label htmlFor="reason" className={labelClass}>
            Reason for contact
          </label>
          <div className="relative">
            <select
              ref={reasonRef}
              id="reason"
              name="reason"
              required
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              aria-invalid={Boolean(fieldErrors.reason)}
              aria-describedby={fieldErrors.reason ? "reason-error" : undefined}
              className={`${fieldClass} appearance-none pr-10`}
            >
              {reasons.map((reason) => (
                <option key={reason.value} value={reason.value}>
                  {reason.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-mute"
            />
          </div>
          <FieldError id="reason-error">{fieldErrors.reason}</FieldError>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>
          What would you like to tell us?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          minLength={10}
          maxLength={2000}
          defaultValue={values.message}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y`}
          placeholder="The robot we run today, the cell we'd like nex-ON to drive next, and roughly when."
        />
        <FieldError id="message-error">{fieldErrors.message}</FieldError>
      </div>

      <div aria-hidden className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p aria-live="polite" className="sr-only">
        {state.status === "error" ? state.message : ""}
      </p>

      {state.status === "error" && (
        <div className="mt-5 flex items-start gap-2.5 p-3.5 rounded-lg bg-red-500/5 border border-red-500/25">
          <CircleAlert size={15} className="text-red-400 mt-0.5 shrink-0" />
          <p className="text-xs text-red-300 leading-relaxed">{state.message}</p>
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-medium text-sm bg-accent text-ink shadow-sm transition-all duration-200 cursor-pointer hover:bg-[#bcdd4d] hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-accent"
        >
          {pending ? "Sending…" : "Send message"}
          {!pending && <ArrowRight className="w-4 h-4" />}
        </button>

        <p className="text-xs text-mute leading-relaxed">
          Or email us at{" "}
          <a
            href="mailto:info@cozmobot.com"
            className="text-accent hover:underline"
          >
            info@cozmobot.com
          </a>
        </p>
      </div>
    </form>
  );
}
