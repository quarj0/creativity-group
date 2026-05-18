import Link from "next/link";
import { GitBranch, X, Globe, SquarePlay, Mail } from "lucide-react";
import { FOOTER_LINKS } from "@/lib/data";
import NewsletterForm from "@/components/NewsletterForm";

function FooterLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http");
  const className = "text-zinc-500 hover:text-zinc-200 text-sm transition-colors duration-200";
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Top grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center font-bold text-white text-sm">
                CG
              </div>
              <span className="font-semibold text-white text-sm tracking-tight">
                Creativity Group
              </span>
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-6">
              Ghana&apos;s premier innovation and maker community. Building the next
              generation of African engineers, entrepreneurs, and change-makers.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { Icon: GitBranch, label: "GitHub" },
                { Icon: X, label: "Twitter / X" },
                { Icon: Globe, label: "LinkedIn" },
                { Icon: SquarePlay, label: "YouTube" },
                { Icon: Mail, label: "Email" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/5 bg-white/2 hover:bg-white/6 hover:border-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-all duration-200"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">
              Community
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.community.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter strip */}
        <div
          id="newsletter"
          className="mb-16 p-6 rounded-2xl border border-white/5 bg-white/2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div>
            <p className="text-white font-medium text-sm">
              Get the CG newsletter
            </p>
            <p className="text-zinc-500 text-xs mt-0.5">
              Events, projects, and opportunities — straight to your inbox.
            </p>
          </div>
          <NewsletterForm />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-zinc-600 text-xs">
            © 2025 Creativity Group. Built in Ghana, for Africa.
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <Link href="#" className="hover:text-zinc-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
