'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-neutral-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-6">
          {/* X (Twitter) Link */}
          <a
            href="https://x.com/shashankpoola"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors text-base font-medium"
            aria-label="X (Twitter)"
          >
            X
          </a>

          {/* GitHub Link */}
          <a
            href="https://github.com/shashank-poola/tipfinity-v2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors text-base font-medium"
            aria-label="GitHub"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

