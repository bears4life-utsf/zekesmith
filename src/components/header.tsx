"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/theme-toggle";

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function getScrolled() {
  return window.scrollY > 12;
}

function getScrolledServer() {
  return false;
}

export function Header() {
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrolled,
    getScrolledServer,
  );
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const ids = site.nav.map((item) => item.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-border bg-nav-bg backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="font-serif text-xl tracking-tight text-foreground transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {site.name}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-active={activeHref === item.href}
              className="nav-link text-sm text-muted transition-colors duration-300 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <nav aria-label="Mobile" className="flex items-center gap-4 md:hidden">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-active={activeHref === item.href}
                className="text-xs text-muted transition-colors hover:text-accent data-[active=true]:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
