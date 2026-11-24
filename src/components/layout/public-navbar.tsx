"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import logo from "@/app/images/logo.png";

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
];

const authLinks = [
  { label: "Sign In", href: "/login" },
  { label: "Get Started", href: "/register" },
];

function NavItem({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-[16px] leading-[1.8] tracking-[-0.2px] text-white transition-colors hover:text-white/75 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
    >
      {label}
    </Link>
  );
}

function AuthActions({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div
      className={
        mobile
          ? "grid gap-3"
          : "flex items-center gap-4"
      }
    >
      <Link
        href={authLinks[0].href}
        onClick={onNavigate}
        className={`inline-flex h-14.5 items-center justify-center bg-transparent px-6 text-[18px] leading-[1.45] font-semibold text-[#5c53fe] transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 [font-family:var(--font-manrope)] ${mobile ? "w-full rounded-xl" : "min-w-26.5 rounded-xl"
          }`}
      >
        {authLinks[0].label}
      </Link>

      <Link
        href={authLinks[1].href}
        onClick={onNavigate}
        className={`inline-flex h-13 items-center justify-center rounded-xl border border-[#090a15]/10 bg-[#5c53fe] px-5.5 text-[18px] leading-[1.45] font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] transition-colors hover:bg-[#6c64ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 [font-family:var(--font-instrument-sans)] ${mobile ? "w-full" : ""
          }`}
      >
        {authLinks[1].label}
      </Link>
    </div>
  );
}

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4 lg:px-15 lg:pt-6">
      <div className="relative mx-auto w-full max-w-330">
        <div className="flex h-16 w-full items-center justify-between rounded-2xl bg-[#222222] pr-2 pl-4 sm:h-17.5 sm:pl-5 lg:h-18.5 lg:pr-0 lg:pl-6">
          <Link
            href="/"
            aria-label="HireLoop home"
            className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          >
            <Image
              src={logo}
              alt="HireLoop"
              priority
              className="h-9 w-auto lg:h-11"
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden h-full items-center gap-6 pr-2 lg:flex"
          >
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <NavItem key={link.href} {...link} />
              ))}
            </div>

            <span
              aria-hidden="true"
              className="h-px w-6 shrink-0 bg-[#a8a8a8]/40"
            />

            <AuthActions />
          </nav>

          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
            className="flex size-11 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 lg:hidden"
          >
            {isOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>

        {isOpen && (
          <div
            id="mobile-navigation"
            className="mt-2 rounded-2xl border border-white/10 bg-[#222222] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.45)] lg:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-5"
            >
              {navLinks.map((link) => (
                <NavItem
                  key={link.href}
                  {...link}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </nav>

            <div
              aria-hidden="true"
              className="my-4 h-px w-full bg-[#a8a8a8]/40"
            />

            <AuthActions mobile onNavigate={() => setIsOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
}
