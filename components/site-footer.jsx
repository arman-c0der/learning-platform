import Link from "next/link";
import { Logo } from "./logo";

import { GraduationCap, Mail } from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-purple-950 bg-[#0a0512] text-purple-300/70">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo & About */}
          <div className="md:col-span-2">
          <Logo/>

            <p className="text-sm text-purple-300/60 leading-relaxed max-w-sm">
              Quality online education for everyone. Learn new skills from
              anywhere, at any time, and take the next step in your career.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0f0720] border border-purple-900/40 text-white hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-300"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0f0720] border border-purple-900/40 text-white hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-300"
              >
                <FaTwitter className="w-4 h-4" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0f0720] border border-purple-900/40 text-white hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-300"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0f0720] text-white border border-purple-900/40  hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-purple-300/70 hover:text-purple-300 transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/courses"
                  className="text-purple-300/70 hover:text-purple-300 transition-colors"
                >
                  All Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-purple-300/70 hover:text-purple-300 transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-purple-300/70 hover:text-purple-300 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-purple-300/60">
                <Mail className="w-4 h-4 flex-shrink-0" />

                <span>support@learningplatform.com</span>
              </li>

              <li className="text-purple-300/60">
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-950 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-purple-300/50">
            © {currentYear} Learning Platform. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm text-purple-300/50">
            <Link
              href="/privacy"
              className="hover:text-purple-300 transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-purple-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};