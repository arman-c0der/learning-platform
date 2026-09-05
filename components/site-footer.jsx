
import Link from "next/link";

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
    <footer className="bg-[#eef3f8] text-slate-600">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo & About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600">
                <GraduationCap
                  className="w-5 h-5 text-white"
                  strokeWidth={2.5}
                />
              </div>

              <span className="text-lg font-bold tracking-tight text-slate-800">
                Learning
                <span className="text-blue-600">Platform</span>
              </span>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Quality online education for everyone. Learn new skills from
              anywhere, at any time, and take the next step in your career.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaTwitter className="w-4 h-4" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/courses"
                  className="hover:text-blue-600 transition-colors"
                >
                  All Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
              Contact
            </h3>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-slate-500">
                <Mail className="w-4 h-4 flex-shrink-0" />

                <span>support@learningplatform.com</span>
              </li>

              <li className="text-slate-500">
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-300/70 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            © {currentYear} Learning Platform. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm text-slate-500">
            <Link
              href="/privacy"
              className="hover:text-slate-800 transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-slate-800 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

