"use client";

import { useState, useEffect } from "react";
import MachineCard from "@/components/machinery/machineCard";
import type { Machine } from "@/types/machine";

const API_URL = "http://localhost:5001/api/machines";

export default function MachineryPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadMachines() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to load machines");
        const data = await res.json();
        setMachines(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    loadMachines();
  }, []);

  const filtered = machines.filter((m: Machine) => {
    const q = query.toLowerCase();
    return (
      (m.company ?? "").toLowerCase().includes(q) ||
      (m.model ?? "").toLowerCase().includes(q) ||
      (m.category ?? "").toLowerCase().includes(q) ||
      (m.location ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Available machines
        </h1>
        <p className="mt-3 text-lg text-neutral-600">
          Find and contact machine owners near you · Indore region
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-10">
        <div className="relative max-w-xl">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
            fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by machine, type, or location…"
            className="w-full rounded-full border border-neutral-300 bg-white py-3.5 pl-12 pr-4 text-base text-ink outline-none transition-colors placeholder:text-neutral-400 focus:border-ink"
          />
        </div>
        {!loading && !error && (
          <p className="mt-3 text-sm text-neutral-500">
            {filtered.length} {filtered.length === 1 ? "machine" : "machines"} found
          </p>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <div className="aspect-[4/3] bg-neutral-200" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-2/3 rounded bg-neutral-200" />
                <div className="h-4 w-1/2 rounded bg-neutral-100" />
                <div className="h-4 w-1/3 rounded bg-neutral-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="rounded-2xl border border-red-200 bg-red-50 py-16 text-center">
          <p className="font-semibold text-red-600">{error}</p>
          <p className="mt-1 text-sm text-red-400">
            Make sure the backend server is running on port 5001.
          </p>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {filtered.map((machine: Machine) => (
              <MachineCard key={machine._id ?? machine.id} machine={machine} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-300 py-20 text-center text-neutral-400">
            {machines.length === 0
              ? "No machines listed yet. Be the first to list one!"
              : `No machines match "${query}". Try a different search.`}
          </div>
        )
      )}
    </div>
  );
}