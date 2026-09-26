'use client';

import { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = '916268397386';
const PRE_FILLED_MESSAGE = encodeURIComponent(
  "Hi! I'm interested in Adivyon Digital's services. Can we discuss?"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${PRE_FILLED_MESSAGE}`;

export default function WhatsAppButton() {
  const [showBadge, setShowBadge] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 300);
    const badgeTimer = setTimeout(() => setShowBadge(false), 5000);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(badgeTimer);
    };
  }, []);

  const badgeVisible = showBadge || isHovered;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-500 ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Chat with us badge */}
      <span
        className={`
          whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800
          shadow-lg transition-all duration-300 select-none pointer-events-none
          ${badgeVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-4 opacity-0 scale-95'}
        `}
      >
        💬 Chat with us
      </span>

      {/* WhatsApp button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
        className="
          group relative flex h-[60px] w-[60px] items-center justify-center
          rounded-full bg-[#25D366] text-white
          shadow-[0_4px_20px_rgba(37,211,102,0.45)]
          transition-all duration-200 ease-in-out
          hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)]
          animate-whatsapp-pulse
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="h-7 w-7"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.502 1.14 6.746 3.072 9.378L1.062 31.16l5.964-1.966A15.907 15.907 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0Zm9.318 22.614c-.39 1.1-1.932 2.014-3.168 2.282-.846.18-1.95.324-5.67-1.218-4.762-1.974-7.826-6.81-8.064-7.126-.23-.316-1.932-2.574-1.932-4.908 0-2.334 1.224-3.48 1.658-3.956.39-.428 1.03-.636 1.644-.636.198 0 .376.01.536.018.472.02.71.048 1.022.79.39.928 1.34 3.262 1.458 3.5.118.238.236.554.078.87-.15.324-.282.468-.52.74-.238.272-.464.48-.702.774-.218.256-.464.53-.198.962.266.424 1.182 1.952 2.538 3.162 1.742 1.556 3.21 2.038 3.666 2.266.39.194.626.166.858-.098.238-.272 1.02-1.182 1.292-1.59.266-.408.538-.342.898-.206.364.13 2.302 1.088 2.696 1.286.394.198.658.296.756.46.096.164.096.952-.294 2.052Z" />
        </svg>
      </a>
    </div>
  );
}
