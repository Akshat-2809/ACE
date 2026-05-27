"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  { src: "/excavator.webp", alt: "Excavator", label: "Excavator", rate: "₹18,500/day" },
  { src: "/concrete.webp", alt: "Concrete pump", label: "Concrete Pump", rate: "₹14,000/day" },
  { src: "/fiori600.webp", alt: "Fiori self-loading mixer", label: "Fiori 600", rate: "₹12,000/day" },
  { src: "/jcb.webp", alt: "JCB backhoe loader", label: "JCB Backhoe", rate: "₹9,500/day" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const active = slides[current];

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-hivis/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-mist px-4 py-1.5 text-sm font-medium text-neutral-700">
              <span className="flex h-2 w-2 rounded-full bg-hivis" />
              Machinery marketplace · Indore
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Find the right machine.{" "}
              <span className="relative inline-block">
                Right when
                <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-hivis/60" />
              </span>{" "}
              you need it.
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-neutral-600 lg:mx-0">
              ACE connects contractors with machine owners nearby. Browse
              available equipment, see live rates, and contact owners
              directly — no middlemen, no markup.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/machinery"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-semibold text-white transition-all hover:bg-neutral-800 hover:-translate-y-0.5 active:translate-y-0"
              >
                Find a machine
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/machinery/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-hivis px-8 py-4 text-base font-bold text-ink transition-all hover:bg-hivis-dark hover:-translate-y-0.5 active:translate-y-0"
              >
                List your machine
              </Link>
            </div>

            <div className="mt-12 flex justify-center gap-8 border-t border-neutral-200 pt-8 sm:gap-10 lg:justify-start">
              <div>
                <p className="text-2xl font-bold text-ink sm:text-3xl">500+</p>
                <p className="mt-1 text-sm text-neutral-500">Machines listed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-ink sm:text-3xl">4 types</p>
                <p className="mt-1 text-sm text-neutral-500">Of equipment</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-ink sm:text-3xl">Direct</p>
                <p className="mt-1 text-sm text-neutral-500">Owner contact</p>
              </div>
            </div>
          </div>

          {/* Right: auto slideshow */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="rounded-3xl border border-neutral-200 bg-mist p-2 shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200">
                {slides.map((slide, i) => (
                  <Image
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover transition-opacity duration-1000 ease-in-out ${
                      i === current ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                {/* Gradient for dot legibility */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Indicator dots */}
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === current ? "w-6 bg-hivis" : "w-2 bg-white/70 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating card — syncs with the active slide */}
            <div className="absolute -bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg sm:-left-5 sm:translate-x-0">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{active.label}</p>
                  <p className="text-xs text-neutral-500">Available · {active.rate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}