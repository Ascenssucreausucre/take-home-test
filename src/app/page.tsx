"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import Feedback from "./components/Feedback";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateUrl = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShortUrl(null);

    try {
      const res = await axios.post("/api/shorten", { originalUrl: url });
      setShortUrl(res.data.shortUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center font-sans ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 ">
        <h1 className="font-extrabold text-3xl text-center mb-6">
          URL Shortener
        </h1>

        <form
          onSubmit={generateUrl}
          className="flex flex-col gap-4 w-full max-w-md 
                 bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-md"
        >
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your URL here..."
            className="py-2 px-3 border border-white/30 rounded-md bg-white/20 dark:bg-black/20 text-white placeholder-white/70 
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm"
            required
            type="url"
          />
          <button
            className="bg-indigo-400 hover:bg-indigo-500 text-black font-semibold py-2 rounded-md transition cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Generating..." : "Shorten URL"}
          </button>
        </form>

        {(shortUrl || error) && <Feedback shortUrl={shortUrl} error={error} />}
      </main>
    </div>
  );
}
