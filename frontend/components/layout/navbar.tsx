"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Browse machines", href: "/machinery" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "List your machine", href: "/machinery/register" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shrink + deepen the bar once the user scrolls past the top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white/85 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-neutral-200 shadow-sm"
          : "border-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 lg:px-8 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-base font-bold text-hivis transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
            A
          </span>
          <span className="text-xl font-semibold tracking-tight text-ink">
            ACE
          </span>
        </Link>

        {/* Desktop links — animated underline on hover */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-neutral-600 transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-hivis transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden shrink-0 items-center gap-6 md:flex">
          <Link
            href="/machinery"
            className="rounded-full bg-hivis px-6 py-2.5 text-sm font-bold text-ink shadow-sm transition-all duration-200 hover:bg-hivis-dark hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            Find machines
          </Link>
        </div>

        {/* Mobile hamburger — animated icon morph */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-neutral-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                isOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-all duration-200 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                isOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu — slide + fade open */}
      <div
        className={`overflow-hidden border-neutral-200/80 bg-white transition-all duration-300 ease-out md:hidden ${
          isOpen ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-6 py-4">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: isOpen ? `${i * 60 + 80}ms` : "0ms" }}
              className={`block rounded-lg px-3 py-3 text-base font-medium text-neutral-700 transition-all duration-300 hover:bg-mist hover:text-ink ${
                isOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/machinery"
            onClick={() => setIsOpen(false)}
            style={{ transitionDelay: isOpen ? `${navLinks.length * 60 + 80}ms` : "0ms" }}
            className={`mt-3 block rounded-full bg-hivis px-3 py-3 text-center text-base font-bold text-ink transition-all duration-300 hover:bg-hivis-dark ${
              isOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
            }`}
          >
            Find machines
          </Link>
        </div>
      </div>
    </header>
  );
}