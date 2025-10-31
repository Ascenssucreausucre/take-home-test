"use client";

import axios from "axios";
import { FormEvent, useState } from "react";

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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="font-extrabold text-3xl text-center mb-6">
          URL Shortener
        </h1>

        <form
          onSubmit={generateUrl}
          className="flex flex-col gap-4 w-full max-w-md border border-zinc-200 p-4 rounded-xl"
        >
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your URL here..."
            className="py-2 px-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

        <div className="mt-6">
          {error && <p className="text-red-500">{error}</p>}
          {shortUrl && (
            <p className="text-white-600">
              Short URL:{" "}
              <a
                href={shortUrl}
                className="underline text-blue-500"
                target="_blank"
              >
                {shortUrl}
              </a>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
