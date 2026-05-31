"use client";

import { useState } from "react";
import Image from "next/image";
import { Machine } from "@/types/machine";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/machines`;

export default function MachineCard({ machine }: { machine: Machine }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [form, setForm] = useState({
    pricePerMonth: String(machine.pricePerMonth ?? ""),
    location: machine.location ?? "",
    ownerName: machine.ownerName ?? "",
    ownerContact: machine.ownerContact ?? "",
    description: machine.description ?? "",
    availability: machine.availability ?? "yes",
    availableFrom: machine.availableFrom
      ? new Date(machine.availableFrom).toISOString().split("T")[0]
      : "",
    modelYear: String(machine.modelYear ?? ""),
    hoursUsed: String(machine.hoursUsed ?? ""),
  });

  const isAvailable = machine.availability === "yes";
  const canEdit = (machine.editCount ?? 0) < 1;
  const displayName = `${machine.company} ${machine.model}`;
  const todayStr = new Date().toISOString().split("T")[0];

  const availableFromFormatted = machine.availableFrom
    ? new Date(machine.availableFrom).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      })
    : null;

  function updateForm(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setSaveError("");
    try {
      const id = machine._id ?? machine.id;
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          pricePerMonth: Number(form.pricePerMonth),
          modelYear: form.modelYear ? Number(form.modelYear) : undefined,
          hoursUsed: form.hoursUsed ? Number(form.hoursUsed) : undefined,
          availableFrom: form.availability === "no" && form.availableFrom ? form.availableFrom : null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save");
      }
      window.location.reload();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image src={machine.image} alt={displayName} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${isAvailable ? "bg-green-500 text-white" : "bg-neutral-800 text-white"}`}>
          {isAvailable ? "Available" : availableFromFormatted ? `Free from ${availableFromFormatted}` : "Busy"}
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">
          {machine.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-ink">{displayName}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-sm text-neutral-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {machine.location}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-ink">₹{(machine.pricePerMonth ?? 0).toLocaleString("en-IN")}</p>
            <p className="text-xs text-neutral-400">per month</p>
          </div>
        </div>

        {/* Expandable details */}
        <div className={`grid overflow-hidden transition-all duration-300 ${expanded ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="min-h-0">
            <div className="space-y-2.5 border-t border-neutral-100 pt-4 text-sm">
              <Detail label="Dealer" value={machine.ownerName} />

              {/* Contact with blue tick if verified */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Contact</span>
                <span className="flex items-center gap-1.5 font-medium text-ink">
                  {machine.ownerContact}
                  {machine.contactVerified && (
                    <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Verified contact">
                      <title>Verified contact</title>
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.491 4.491 0 0 1-3.497-1.307 4.491 4.491 0 0 1-1.307-3.497A4.49 4.49 0 0 1 2.25 12a4.49 4.49 0 0 1 1.549-3.397 4.491 4.491 0 0 1 1.307-3.497 4.491 4.491 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
              </div>

              <Detail label="Model year" value={String(machine.modelYear ?? "—")} />
              <Detail label="Hours used" value={machine.hoursUsed != null ? `${machine.hoursUsed.toLocaleString("en-IN")} hrs` : "—"} />
              {machine.description && <p className="pt-1 leading-relaxed text-neutral-500">{machine.description}</p>}

              {/* Call dealer */}
              <a href={`tel:${machine.ownerContact.replace(/\s/g, "")}`} className="mt-2 flex items-center justify-center gap-2 rounded-full bg-hivis px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-hivis-dark">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                Call dealer
              </a>

              {/* Edit button */}
              {canEdit ? (
                <button onClick={() => setEditing(true)} className="mt-1 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-neutral-50">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                  </svg>
                  Edit listing
                </button>
              ) : (
                <p className="mt-1 flex items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs text-neutral-400">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  Listing locked — edit limit reached
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Show more / less */}
        <button onClick={() => setExpanded(!expanded)} className="mt-4 flex w-full items-center justify-center gap-1 text-sm font-semibold text-neutral-600 transition-colors hover:text-ink">
          {expanded ? "Show less" : "Show more"}
          <svg className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl max-h-[90vh]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-ink">Edit listing</h2>
                <p className="text-xs text-amber-600 mt-0.5">⚠ You can only edit this listing once</p>
              </div>
              <button onClick={() => setEditing(false)} className="text-neutral-400 hover:text-ink">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <EditField label="Price per month (₹)">
                <input type="number" value={form.pricePerMonth} onChange={(e) => updateForm("pricePerMonth", e.target.value)} className={inputClass} />
              </EditField>
              <EditField label="Location">
                <input type="text" value={form.location} onChange={(e) => updateForm("location", e.target.value)} className={inputClass} />
              </EditField>
              <EditField label="Owner name">
                <input type="text" value={form.ownerName} onChange={(e) => updateForm("ownerName", e.target.value.replace(/[^a-zA-Z\s]/g, ""))} className={inputClass} placeholder="Letters and spaces only" />
              </EditField>
              <EditField label="Contact number">
                <input type="tel" value={form.ownerContact} onChange={(e) => updateForm("ownerContact", e.target.value.replace(/\D/g, "").slice(0, 10))} maxLength={10} className={inputClass} placeholder="10 digits" />
              </EditField>
              <EditField label="Model year">
                <input type="number" min={1990} max={2030} value={form.modelYear} onChange={(e) => updateForm("modelYear", e.target.value)} className={inputClass} />
              </EditField>
              <EditField label="Hours used">
                <input type="number" min={0} value={form.hoursUsed} onChange={(e) => updateForm("hoursUsed", e.target.value)} className={inputClass} />
              </EditField>
              <EditField label="Description">
                <textarea rows={3} value={form.description} onChange={(e) => updateForm("description", e.target.value)} className={`${inputClass} resize-none`} />
              </EditField>
              <EditField label="Currently available?">
                <div className="flex gap-3">
                  {(["yes", "no"] as const).map((val) => (
                    <button key={val} type="button" onClick={() => { updateForm("availability", val); if (val === "yes") updateForm("availableFrom", ""); }}
                      className={`rounded-full border px-5 py-2 text-sm font-semibold capitalize transition-colors ${form.availability === val ? "border-ink bg-ink text-white" : "border-neutral-300 bg-white text-ink hover:bg-neutral-50"}`}>
                      {val === "yes" ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
              </EditField>
              {form.availability === "no" && (
                <EditField label="Available from">
                  <input type="date" min={todayStr} value={form.availableFrom} onChange={(e) => updateForm("availableFrom", e.target.value)} className={inputClass} />
                </EditField>
              )}
              {saveError && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{saveError}</p>}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditing(false)} className="flex-1 rounded-full border border-neutral-300 py-2.5 text-sm font-semibold text-ink hover:bg-neutral-50">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="flex-1 rounded-full bg-ink py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60">
                  {saving ? "Saving…" : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-neutral-400">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}

function EditField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-semibold text-ink">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-ink outline-none transition-colors placeholder:text-neutral-400 focus:border-ink";