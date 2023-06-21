import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="px-2 bg-gray-300 sm:p-6 ">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <Link href="/" passHref >
            <span className="flex items-center cursor-pointer">
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-1 text-sm font-semibold text-gray-900 uppercase">
              Company
            </h2>
            <ul className="text-gray-600 ">
              <li className="mb-1">
                <Link href="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/support" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-1 text-sm font-semibold text-gray-900 uppercase">
              Follow us
            </h2>
            <ul className="text-gray-600 ">
              <li className="mb-1">
                <a href="https://facebook.com/percel.com" target="_blank" rel="noreferrer" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li className="mb-1">
                <a href="https://youtube.com/percel.com" target="_blank" rel="noreferrer" className="hover:underline">
                  YouTube
                </a>
              </li>
              <li className="mb-1">
                <a href="https://twitter.com/percel.com" target="_blank" rel="noreferrer" className="hover:underline">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-1 text-sm font-semibold text-gray-900 uppercase ">
              Legal
            </h2>
            <ul className="text-gray-600 ">
              <li className="mb-1">
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/terms-condition" className="hover:underline">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/refund-policy" className="hover:underline">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-2 border-gray-500 sm:mx-auto " />
      <div className="flex justify-center">
        <span className="text-sm text-gray-500 sm:text-center ">
          © {new Date().getFullYear()} All Rights Reserved By Nayem Khan.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
