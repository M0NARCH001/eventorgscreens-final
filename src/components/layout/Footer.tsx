"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="dashboard-footer" className="relative z-60 bg-(--brand-navy) text-(--white)">
      <div className="px-6 md:px-10 lg:px-16 pt-8 pb-24 md:pb-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="max-w-sm">
            <Image
              src="/foot-logo.png"
              alt="Baatasari"
              width={200}
              height={60}
              className="mb-5 object-contain"
            />

            <div className="space-y-1.5">
              <p className="font-albert font-medium text-[18px] leading-[24px] text-(--white)">
                Contact Us:
              </p>

              <p className="font-albert font-normal text-[14px] leading-[20px] tracking-[0.0025em] text-(--white)">
                Venture Development Center,
                <br />
                Rushikonda,
                <br />
                Visakhapatnam, 530045
              </p>

              <p className="font-albert font-normal text-[14px] leading-[20px] tracking-[0.0025em] text-(--white)">
                contactus@baatasari.com
              </p>

              <p className="font-albert font-normal text-[14px] leading-[20px] tracking-[0.0025em] text-(--white)">
                +91 9578937675
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-inter font-semibold text-[16px] leading-[150%] text-(--white) mb-4">
              Follow Us
            </h3>

            <ul className="space-y-1">
              <li className="flex items-center gap-3">
                <FaInstagram className="text-(--white) text-[18px]" />
                <Link
                  href="https://www.instagram.com/baatasari._?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter font-normal text-[14px] leading-[150%] text-(--white) hover:underline"
                >
                  Instagram
                </Link>
              </li>

              <li className="flex items-center gap-3">
                <FaLinkedinIn className="text-(--white) text-[18px]" />
                <Link
                  href="https://www.linkedin.com/company/baatasari/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter font-normal text-[14px] leading-[150%] text-(--white) hover:underline"
                >
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-(--white)">
          <div className="space-y-1">
            <p className="font-inter font-semibold text-[14px] leading-[150%]">
              &copy; {currentYear} Baatasari. All rights reserved.
            </p>
            <p className="font-inter font-semibold text-[14px] leading-[150%]">
              Images and illustrations sourced from Freepik
            </p>
          </div>

          <div className="flex gap-8">
            <Link
              href="#"
              className="font-inter font-semibold text-[14px] leading-[150%] text-(--white) underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="font-inter font-semibold text-[14px] leading-[150%] text-(--white) underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
