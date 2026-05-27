"use client";

import { useState } from "react";
import Image from "next/image";
import { Machine } from "@/types/machine";

export default function MachineCard({ machine }: { machine: Machine }) {
  const [expanded, setExpanded] = useState(false);
  const isAvailable = machine.availability === "yes";

  const displayName = `${machine.company} ${machine.model}`;

  const availableFromFormatted = machine.availableFrom
    ? new Date(machine.availableFrom).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={machine.image}
          alt={displayName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Status badge */}
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
            isAvailable
              ? "bg-green-500 text-white"
              : "bg-neutral-800 text-white"
          }`}
        >
          {isAvailable
            ? "Available"
            : availableFromFormatted
            ? `Free from ${availableFromFormatted}`
            : "Busy"}
        </span>
        {/* Category tag */}
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
            <p className="text-xl font-bold text-ink">
              ₹{machine.pricePerDay.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-neutral-400">per day</p>
          </div>
        </div>

        {/* Expandable details */}
        <div
          className={`grid overflow-hidden transition-all duration-300 ${
            expanded ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <div className="space-y-2.5 border-t border-neutral-100 pt-4 text-sm">
              <Detail label="Dealer" value={machine.ownerName} />
              <Detail label="Contact" value={machine.ownerContact} />
              <Detail label="Model year" value={String(machine.modelYear ?? "—")} />
              <Detail
                label="Hours used"
                value={machine.hoursUsed != null ? `${machine.hoursUsed.toLocaleString("en-IN")} hrs` : "—"}
              />
              {machine.description && (
                <p className="pt-1 leading-relaxed text-neutral-500">
                  {machine.description}
                </p>
              )}

              {isAvailable && (
                <a
                  href={`tel:${machine.ownerContact.replace(/\s/g, "")}`}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-hivis px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-hivis-dark"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  Call dealer
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Show more / less toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex w-full items-center justify-center gap-1 text-sm font-semibold text-neutral-600 transition-colors hover:text-ink"
        >
          {expanded ? "Show less" : "Show more"}
          <svg
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
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