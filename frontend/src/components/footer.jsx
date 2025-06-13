import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-[#19191f] text-white font-inter ">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand and Contact Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white drop-shadow-lg "
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <span className="text-xl font-semibold">Luminate</span>
            </div>

            <p className="text-white mb-6 leading-relaxed ">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-white">
                <Phone className="w-4 h-4" />
                <span>+125-589-4569</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Mail className="w-4 h-4" />
                <span>help@tuition.com</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-white hover:text-white hover:bg-gray-700"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-white hover:text-white hover:bg-gray-700"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-white hover:text-white hover:bg-gray-700"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-white hover:text-white hover:bg-gray-700"
              >
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Browse Library
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Career
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Library
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  News & Blogs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Instructor
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Faq
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Library
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  News & Blogs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Instructor
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm mb-4 md:mb-0">
            Copyright © 2025 All Rights Reserved
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-5 bg-orange-500 rounded-sm flex items-center justify-center">
                <span className="text-xs font-bold text-white">D</span>
              </div>
              <span className="text-xs text-white">DISCOVER</span>
            </div>
            <div className="w-8 h-5 bg-purple-600 rounded-sm flex items-center justify-center">
              <span className="text-xs font-bold text-white">S</span>
            </div>
            <div className="w-8 h-5 bg-red-500 rounded-sm flex items-center justify-center">
              <span className="text-xs font-bold text-white">M</span>
            </div>
            <div className="w-8 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
              <span className="text-xs font-bold text-white">V</span>
            </div>
          </div>
        </div>
      </div>

      
    </footer>
  );
}
