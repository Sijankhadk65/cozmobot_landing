"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { submitContact, type ContactState } from "@/lib/actions";
import {
  EDITION_OPTIONS,
  INTENT_OPTIONS,
  ROBOT_OPTIONS,
  type Intent,
} from "@/lib/contact-options";

const initialState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: {},
};

const field =
  "w-full border border-[rgba(61,74,21,0.2)] bg-paper px-3.5 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-sage/70 focus:border-moss";
const legend =
  "font-brand text-[10.5px] uppercase tracking-[0.08em] text-muted";

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="font-brand text-[11px] text-[#8C2F1B]">
      {children}
    </p>
  );
}

function Select({
  id,
  name,
  label,
  options,
  value,
  onChange,
  error,
  selectRef,
}: {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  selectRef: React.RefObject<HTMLSelectElement | null>;
}) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className={legend}>{label}</span>
      <div className="relative">
        <select
          ref={selectRef}
          id={id}
          name={name}
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${field} appearance-none pr-10`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          aria-hidden
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-body"
        />
      </div>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </label>
  );
}

export function ContactForm({
  defaultIntent = "pilot",
}: {
  defaultIntent?: Intent;
}) {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );
  const [intent, setIntent] = useState<string>(defaultIntent);
  const [edition, setEdition] = useState(EDITION_OPTIONS[0].value);
  const [robot, setRobot] = useState(ROBOT_OPTIONS[0].value);
  const intentRef = useRef<HTMLSelectElement>(null);
  const editionRef = useRef<HTMLSelectElement>(null);
  const robotRef = useRef<HTMLSelectElement>(null);

  // A pre-order is for one robot on one edition, so neither question is worth
  // asking — the server fills both in.
  const preorder = intent === "preorder";

  // React resets the form after every action. The reset writes each select back
  // to its first option, and because `value` hasn't changed across renders
  // React won't reconcile it — so a failed Med OS enquiry would come back as
  // Weld OS. Restore them once the reset has landed; the two pilot selects are
  // absent from the DOM on a pre-order, hence the ref guards.
  useEffect(() => {
    if (intentRef.current) intentRef.current.value = intent;
    if (editionRef.current) editionRef.current.value = edition;
    if (robotRef.current) robotRef.current.value = robot;
  }, [state, intent, edition, robot]);

  if (state.status === "success") {
    return (
      <div className="px-[clamp(20px,3vw,32px)] py-[clamp(40px,6vw,64px)] text-center">
        <div className="eyebrow">
          {preorder ? "Pre-order received" : "Request received"}
        </div>
        <div className="mx-auto mt-5 max-w-[24ch] text-2xl leading-[1.2]">
          {preorder
            ? "Thanks — you're on the list. We'll confirm your place and price."
            : "Thanks — we'll be in touch about your task."}
        </div>
        <p className="copy-sm mx-auto mt-4 max-w-[40ch]">
          If it&rsquo;s urgent, mail us directly at{" "}
          <a href="mailto:business@cozmobot.com" className="text-moss">
            business@cozmobot.com
          </a>
          .
        </p>
      </div>
    );
  }

  const { fieldErrors, values } = state;

  return (
    <form
      action={formAction}
      className="relative flex flex-col gap-5.5 p-[clamp(24px,3vw,32px)]"
    >
      <Select
        id="intent"
        name="intent"
        label="What you're here for"
        options={INTENT_OPTIONS}
        value={intent}
        onChange={setIntent}
        error={fieldErrors.intent}
        selectRef={intentRef}
      />

      <label className="flex flex-col gap-2.5">
        <span className={legend}>Name</span>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          defaultValue={values.name}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          className={field}
          placeholder="Your name"
        />
        <FieldError id="name-error">{fieldErrors.name}</FieldError>
      </label>

      <label className="flex flex-col gap-2.5">
        <span className={legend}>{preorder ? "Email" : "Work email"}</span>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          defaultValue={values.email}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          className={field}
          placeholder={preorder ? "you@example.com" : "you@company.com"}
        />
        <FieldError id="email-error">{fieldErrors.email}</FieldError>
      </label>

      <label className="flex flex-col gap-2.5">
        <span className={legend}>
          {preorder ? "Company (optional)" : "Company"}
        </span>
        <input
          id="company"
          name="company"
          type="text"
          maxLength={100}
          defaultValue={values.company}
          aria-invalid={Boolean(fieldErrors.company)}
          aria-describedby={fieldErrors.company ? "company-error" : undefined}
          className={field}
          placeholder={preorder ? "If this is for work" : "Where you work"}
        />
        <FieldError id="company-error">{fieldErrors.company}</FieldError>
      </label>

      {!preorder && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5.5">
          <Select
            id="edition"
            name="edition"
            label="Edition of interest"
            options={EDITION_OPTIONS}
            value={edition}
            onChange={setEdition}
            error={fieldErrors.edition}
            selectRef={editionRef}
          />
          <Select
            id="robot"
            name="robot"
            label="Robot on site"
            options={ROBOT_OPTIONS}
            value={robot}
            onChange={setRobot}
            error={fieldErrors.robot}
            selectRef={robotRef}
          />
        </div>
      )}

      {preorder && (
        <div className="border border-limeline bg-[rgba(173,208,55,0.1)] p-4.5">
          <div className="font-brand text-[10.5px] uppercase tracking-[0.08em] text-moss">
            First 100 orders · &euro;450 / month
          </div>
          <p className="mt-2.5 text-[14.5px] leading-[1.5] text-deep">
            Orio ships Q1 2028. A pre-order holds your place and the
            first-hundred price; nothing is charged today.
          </p>
        </div>
      )}

      <label className="flex flex-col gap-2.5">
        <span className={legend}>
          {preorder
            ? "What you\u2019d have it do"
            : "The task you\u2019d put it on"}
        </span>
        <textarea
          id="task"
          name="task"
          rows={4}
          required
          minLength={10}
          maxLength={2000}
          defaultValue={values.task}
          aria-invalid={Boolean(fieldErrors.task)}
          aria-describedby={fieldErrors.task ? "task-error" : undefined}
          className={`${field} resize-y leading-[1.5]`}
          placeholder={
            preorder
              ? "e.g. carry stock between the workshop and the front desk, and watch the yard overnight"
              : "e.g. fillet welds on small batches of steel brackets, currently programmed part by part"
          }
        />
        <FieldError id="task-error">{fieldErrors.task}</FieldError>
      </label>

      <div
        aria-hidden
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p aria-live="polite" className="sr-only">
        {state.status === "error" ? state.message : ""}
      </p>

      {state.status === "error" && (
        <p className="border border-[rgba(140,47,27,0.35)] bg-[rgba(140,47,27,0.05)] p-3.5 text-[13.5px] leading-[1.5] text-[#8C2F1B]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary px-6 py-4 disabled:opacity-60"
      >
        {pending
          ? "Sending…"
          : preorder
            ? "Reserve an Orio"
            : "Request pilot access"}
      </button>

      <p className="text-[13.5px] leading-[1.5] text-sage">
        We reply within two working days. Prefer email? Write to{" "}
        <a href="mailto:business@cozmobot.com" className="text-moss">
          business@cozmobot.com
        </a>
        .
      </p>
    </form>
  );
}
