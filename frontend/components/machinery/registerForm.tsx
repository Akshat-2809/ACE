"use client";

import { useState } from "react";
import Image from "next/image";
import {
  categories,
  companies,
  modelsByCompany,
  locations,
} from "@/lib/machineOptions";

const DEFAULT_IMAGE = "/excavator.webp";
const API_URL = "http://localhost:5001/api/machines";

export default function RegisterForm() {
  const [form, setForm] = useState({
    category: "",
    company: "",
    model: "",
    location: "",
    pricePerDay: "",
    modelYear: "",
    hoursUsed: "",
    ownerName: "",
    ownerContact: "",
    description: "",
    availability: "yes",         // "yes" | "no"
    availableFrom: "",            // date string, only used when availability === "no"
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const availableModels = form.company ? modelsByCompany[form.company] ?? [] : [];

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          pricePerDay: Number(form.pricePerDay),
          modelYear: Number(form.modelYear),
          hoursUsed: Number(form.hoursUsed),
          image: DEFAULT_IMAGE,
          availableFrom:
            form.availability === "no" ? form.availableFrom : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500">
          <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-5 text-xl font-semibold text-ink">
          Machine listed successfully!
        </h3>
        <p className="mt-2 text-neutral-600">
          Your machine is now saved and visible to contractors.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              category: "", company: "", model: "", location: "",
              pricePerDay: "", modelYear: "", hoursUsed: "", ownerName: "",
              ownerContact: "", description: "", availability: "yes", availableFrom: "",
            });
            setPreview(null);
          }}
          className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
        >
          List another machine
        </button>
      </div>
    );
  }

  // Today's date in YYYY-MM-DD for min date on the picker
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Photo upload */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-ink">Machine photo</label>
        <div className="flex items-center gap-5">
          <div className="relative h-28 w-36 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
            <Image src={preview ?? DEFAULT_IMAGE} alt="Machine preview" fill className="object-cover" />
            {!preview && (
              <span className="absolute inset-x-0 bottom-0 bg-black/50 py-1 text-center text-[10px] font-medium text-white">
                Default image
              </span>
            )}
          </div>
          <div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-mist">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              Upload photo
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
            <p className="mt-2 text-xs text-neutral-400">A default image is used if you skip this.</p>
          </div>
        </div>
      </div>

      {/* Category + Company */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Machine type">
          <select required value={form.category} onChange={(e) => update("category", e.target.value)} className={selectClass}>
            <option value="" disabled>Select type</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Company / brand">
          <select
            required
            value={form.company}
            onChange={(e) => {
              update("company", e.target.value);
              update("model", "");
            }}
            className={selectClass}
          >
            <option value="" disabled>Select company</option>
            {companies.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      {/* Model + Model year */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Model">
          <select
            required
            value={form.model}
            onChange={(e) => update("model", e.target.value)}
            disabled={!form.company}
            className={`${selectClass} disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400`}
          >
            <option value="" disabled>{form.company ? "Select model" : "Select a company first"}</option>
            {availableModels.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </Field>

        <Field label="Model year">
          <input type="number" required min={1990} max={2026} placeholder="e.g. 2022"
            value={form.modelYear} onChange={(e) => update("modelYear", e.target.value)} className={inputClass} />
        </Field>
      </div>

      {/* Location + Price */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Location">
          <select required value={form.location} onChange={(e) => update("location", e.target.value)} className={selectClass}>
            <option value="" disabled>Select location</option>
            {/* ↓ Gwalior added here in addition to whatever is in machineOptions */}
            {[...locations, ...(!locations.includes("Gwalior") ? ["Gwalior"] : [])]
              .sort()
              .map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </Field>

        <Field label="Rate per day (₹)">
          <input type="number" required min={0} placeholder="e.g. 15000"
            value={form.pricePerDay} onChange={(e) => update("pricePerDay", e.target.value)} className={inputClass} />
        </Field>
      </div>

      {/* Hours used + Availability toggles — always side by side */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Hours used">
          <input type="number" required min={0} placeholder="e.g. 3400"
            value={form.hoursUsed} onChange={(e) => update("hoursUsed", e.target.value)} className={inputClass} />
        </Field>

        <div>
          <label className="mb-3 block text-sm font-semibold text-ink">
            Currently available?
          </label>
          <div className="flex gap-3">
            {(["yes", "no"] as const).map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => {
                  update("availability", val);
                  if (val === "yes") update("availableFrom", "");
                }}
                className={`rounded-full border px-6 py-2.5 text-sm font-semibold capitalize transition-colors ${
                  form.availability === val
                    ? "border-ink bg-ink text-white"
                    : "border-neutral-300 bg-white text-ink hover:bg-mist"
                }`}
              >
                {val === "yes" ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Date picker — full-width centered row, shown only when "No" */}
      {form.availability === "no" && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-5">
          <label className="text-sm font-semibold text-ink">
            From which date will the machine be available?
          </label>
          <input
            type="date"
            required
            min={todayStr}
            value={form.availableFrom}
            onChange={(e) => update("availableFrom", e.target.value)}
            className={`${inputClass} max-w-xs text-center`}
          />
          {form.availableFrom && (
            <p className="text-sm text-neutral-500">
              Available from{" "}
              <span className="font-semibold text-ink">
                {new Date(form.availableFrom).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </p>
          )}
        </div>
      )}

      {/* Owner details */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Owner / dealer name">
          <input type="text" required placeholder="e.g. XYZ Construction"
            value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Contact number">
          <input type="tel" required placeholder="+91 98765 43210"
            value={form.ownerContact} onChange={(e) => update("ownerContact", e.target.value)} className={inputClass} />
        </Field>
      </div>

      {/* Description */}
      <Field label="Description">
        <textarea rows={4} placeholder="Add details — capacity, condition, operator availability, etc."
          value={form.description} onChange={(e) => update("description", e.target.value)} className={`${inputClass} resize-none`} />
      </Field>

      {/* Error message */}
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-hivis px-6 py-4 text-base font-bold text-ink transition-all hover:bg-hivis-dark hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 sm:w-auto sm:px-12"
      >
        {submitting ? "Listing…" : "List my machine"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-neutral-400 focus:border-ink";
const selectClass = `${inputClass} appearance-none`;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-ink">{label}</label>
      {children}
    </div>
  );
}