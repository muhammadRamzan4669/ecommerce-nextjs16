import Link from "next/link";
import { integralCF } from "@/lib/fonts";

const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Features", href: "/features" },
    { name: "Works", href: "/works" },
    { name: "Career", href: "/career" },
  ],
  help: [
    { name: "Customer Support", href: "/support" },
    { name: "Delivery Details", href: "/delivery" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  faq: [
    { name: "Account", href: "/faq/account" },
    { name: "Manage Deliveries", href: "/faq/deliveries" },
    { name: "Orders", href: "/faq/orders" },
    { name: "Payments", href: "/faq/payments" },
  ],
  resources: [
    { name: "Free eBooks", href: "/resources/ebooks" },
    { name: "Development Tutorial", href: "/resources/tutorials" },
    { name: "How to - Blog", href: "/blog" },
    { name: "Youtube Playlist", href: "/resources/youtube" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: TwitterIcon, href: "https://twitter.com" },
  { name: "Facebook", icon: FacebookIcon, href: "https://facebook.com" },
  { name: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
  { name: "Github", icon: GithubIcon, href: "https://github.com" },
];

const paymentMethods = [
  { name: "Visa", icon: VisaIcon },
  { name: "Mastercard", icon: MastercardIcon },
  { name: "PayPal", icon: PayPalIcon },
  { name: "Apple Pay", icon: ApplePayIcon },
  { name: "Google Pay", icon: GooglePayIcon },
];

export default function Footer() {
  return (
    <footer
      className="bg-[#F0F0F0] dark:bg-[#1a1a1a] pt-[140px] lg:pt-[188px]"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-[110px] pb-12 lg:pb-[50px]">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className={`${integralCF.className} font-bold text-[29px] lg:text-[33.45px] mb-6 block focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 rounded`}
              aria-label="SHOP.CO - Return to homepage"
            >
              SHOP.CO
            </Link>
            <p className="text-sm text-black/60 dark:text-white/60 mb-9 max-w-[248px]">
              We have clothes that suits your style and which you&apos;re proud
              to wear. From women to men.
            </p>

            {/* Social Links */}
            <nav aria-label="Social media links">
              <ul className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-white dark:bg-black border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
                      aria-label={`Follow us on ${social.name} (opens in new tab)`}
                    >
                      <social.icon className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Company */}
          <nav aria-labelledby="footer-company-heading">
            <h3
              id="footer-company-heading"
              className="font-medium text-base tracking-[3px] uppercase mb-6"
            >
              Company
            </h3>
            <ul className="space-y-4" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus-visible:underline focus-visible:text-black dark:focus-visible:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Help */}
          <nav aria-labelledby="footer-help-heading">
            <h3
              id="footer-help-heading"
              className="font-medium text-base tracking-[3px] uppercase mb-6"
            >
              Help
            </h3>
            <ul className="space-y-4" role="list">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus-visible:underline focus-visible:text-black dark:focus-visible:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* FAQ */}
          <nav aria-labelledby="footer-faq-heading">
            <h3
              id="footer-faq-heading"
              className="font-medium text-base tracking-[3px] uppercase mb-6"
            >
              FAQ
            </h3>
            <ul className="space-y-4" role="list">
              {footerLinks.faq.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus-visible:underline focus-visible:text-black dark:focus-visible:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-labelledby="footer-resources-heading">
            <h3
              id="footer-resources-heading"
              className="font-medium text-base tracking-[3px] uppercase mb-6"
            >
              Resources
            </h3>
            <ul className="space-y-4" role="list">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus-visible:underline focus-visible:text-black dark:focus-visible:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/10 dark:border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-black/60 dark:text-white/60">
            Shop.co &copy; 2000-2024, All Rights Reserved
          </p>

          {/* Payment Methods */}
          <div
            className="flex items-center gap-3"
            role="img"
            aria-label="Accepted payment methods: Visa, Mastercard, PayPal, Apple Pay, Google Pay"
          >
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="h-[30px] w-[47px] bg-white dark:bg-black rounded-[5px] flex items-center justify-center text-[10px] font-medium border border-black/5 dark:border-white/10"
                aria-hidden="true"
              >
                <method.icon />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Social Icons
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 12"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14 1.42a5.91 5.91 0 01-1.66.45A2.87 2.87 0 0013.6.22a5.86 5.86 0 01-1.83.7A2.9 2.9 0 009.64 0a2.88 2.88 0 00-2.88 2.88c0 .23.03.45.07.66a8.18 8.18 0 01-5.94-3.01 2.88 2.88 0 00.9 3.85 2.88 2.88 0 01-1.31-.36v.04c0 1.4.99 2.56 2.31 2.83a2.88 2.88 0 01-1.3.05 2.89 2.89 0 002.69 2 5.79 5.79 0 01-3.58 1.23c-.23 0-.46-.01-.69-.04A8.17 8.17 0 004.43 12 8.14 8.14 0 0012.6 3.83v-.37A5.78 5.78 0 0014 1.42z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 8 14"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7.2 2.32H5.36c-.22 0-.46.28-.46.66v1.32h2.3l-.35 1.9H4.9V14H2.66V6.2H.8V4.3h1.86V3.2C2.66 1.44 3.76 0 5.36 0H7.2v2.32z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 1.26c1.87 0 2.09 0 2.83.04.68.03 1.05.14 1.3.24.33.13.56.28.8.52.25.25.4.48.52.81.1.25.21.62.24 1.3.04.74.04.96.04 2.83s0 2.09-.04 2.83c-.03.68-.14 1.05-.24 1.3-.13.33-.28.56-.52.8-.25.25-.48.4-.81.52-.25.1-.62.21-1.3.24-.74.04-.96.04-2.83.04s-2.09 0-2.83-.04c-.68-.03-1.05-.14-1.3-.24-.33-.13-.56-.28-.8-.52a2.16 2.16 0 01-.52-.81c-.1-.25-.21-.62-.24-1.3C1.27 9.08 1.27 8.86 1.27 7s0-2.09.04-2.83c.03-.68.14-1.05.24-1.3.13-.33.28-.56.52-.8.25-.25.48-.4.81-.52.25-.1.62-.21 1.3-.24.74-.04.96-.04 2.83-.04M7 0C5.1 0 4.86 0 4.12.04c-.75.03-1.26.15-1.7.32A3.44 3.44 0 001.18 1.2a3.44 3.44 0 00-.82 1.24c-.17.44-.29.95-.32 1.7C0 4.86 0 5.1 0 7s0 2.14.04 2.88c.03.75.15 1.26.32 1.7.18.46.42.85.82 1.24.4.4.78.64 1.24.82.44.17.95.29 1.7.32.74.04.98.04 2.88.04s2.14 0 2.88-.04c.75-.03 1.26-.15 1.7-.32a3.44 3.44 0 001.24-.82c.4-.4.64-.78.82-1.24.17-.44.29-.95.32-1.7.04-.74.04-.98.04-2.88s0-2.14-.04-2.88c-.03-.75-.15-1.26-.32-1.7a3.44 3.44 0 00-.82-1.24A3.44 3.44 0 0011.58.36c-.44-.17-.95-.29-1.7-.32C9.14 0 8.9 0 7 0zm0 3.41a3.59 3.59 0 100 7.18 3.59 3.59 0 000-7.18zm0 5.92a2.33 2.33 0 110-4.66 2.33 2.33 0 010 4.66zm4.57-6.06a.84.84 0 11-1.68 0 .84.84 0 011.68 0z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 0a7 7 0 00-2.21 13.64c.35.07.48-.15.48-.33v-1.17c-1.96.43-2.37-.94-2.37-.94-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.08.72 1.08.72.63 1.07 1.65.76 2.05.58.06-.45.24-.76.44-.94-1.56-.18-3.2-.78-3.2-3.47 0-.77.27-1.4.72-1.89-.07-.18-.31-.9.07-1.87 0 0 .59-.19 1.93.72a6.68 6.68 0 013.5 0c1.34-.9 1.93-.72 1.93-.72.38.97.14 1.69.07 1.87.45.5.72 1.12.72 1.89 0 2.7-1.64 3.29-3.2 3.46.25.22.48.65.48 1.3v1.94c0 .18.13.4.48.33A7 7 0 007 0z" />
    </svg>
  );
}

// Payment Icons
function VisaIcon() {
  return <span className="text-[10px] font-bold text-[#1A1F71]">VISA</span>;
}

function MastercardIcon() {
  return (
    <div className="flex" aria-hidden="true">
      <div className="w-3 h-3 rounded-full bg-[#EB001B]" />
      <div className="w-3 h-3 rounded-full bg-[#F79E1B] -ml-1.5" />
    </div>
  );
}

function PayPalIcon() {
  return <span className="text-[8px] font-bold text-[#003087]">PayPal</span>;
}

function ApplePayIcon() {
  return <span className="text-[8px] font-bold"> Pay</span>;
}

function GooglePayIcon() {
  return <span className="text-[8px] font-bold">G Pay</span>;
}
