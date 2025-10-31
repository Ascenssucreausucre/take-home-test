import { useState } from "react";

interface FeedbackProps {
  shortUrl: string | null;
  error: string | null;
}

export default function Feedback({ shortUrl, error }: FeedbackProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    });
  };

  return (
    <div className="mt-6 feedback text-white/90 bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-md flex flex-col gap-2">
      {error && <p className="text-red-500">{error}</p>}

      {shortUrl && (
        <div className="flex items-center justify-between gap-2">
          <a
            href={shortUrl}
            className="underline text-indigo-200 hover:text-indigo-100 cursor-pointer break-all"
            target="_blank"
          >
            {shortUrl}
          </a>
          <button
            onClick={copyToClipboard}
            className="ml-2 bg-indigo-400 hover:bg-indigo-500 text-black font-semibold py-1 px-3 rounded-md transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
