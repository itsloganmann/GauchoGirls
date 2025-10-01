"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

interface ReviewFormProps {
  defaultName: string;
  onSubmitted?: (slug: string) => void;
}

/**
 * Client-side review submission form with Turnstile CAPTCHA.
 */
export default function ReviewForm({ defaultName, onSubmitted }: ReviewFormProps) {
  const [name, setName] = useState<string>(defaultName);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const siteKey = useMemo(() => process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "", []);
  const widgetContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Load Turnstile script and render widget
  useEffect(() => {
    if (!siteKey) {
      console.warn("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set");
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );

    function renderWidget() {
      // @ts-expect-error turnstile is a global injected by the script
      if (window.turnstile && widgetContainerRef.current && !widgetIdRef.current) {
        // @ts-expect-error turnstile type from global
        widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
          sitekey: siteKey,
          callback: (tkn: string) => {
            setToken(tkn);
          },
          "error-callback": () => {
            setToken("");
          },
          "expired-callback": () => {
            setToken("");
          },
          theme: "light",
        });
      }
    }

    if (existingScript) {
      // Script already present; render immediately or when ready
      if (typeof (window as any).turnstile !== "undefined") {
        renderWidget();
      } else {
        existingScript.addEventListener("load", renderWidget);
        return () => existingScript.removeEventListener("load", renderWidget);
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", renderWidget);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", renderWidget);
      // @ts-expect-error global
      if (widgetIdRef.current && window.turnstile) {
        try {
          // @ts-expect-error global
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
      }
    };
  }, [siteKey]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name || name.trim().length < 2) {
      setErrorMessage("Please provide a valid name.");
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      setErrorMessage("Please select a rating between 1 and 5.");
      return;
    }
    if (!token) {
      setErrorMessage("Please complete the CAPTCHA.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), rating, comment: comment.trim(), token }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 429 || data?.error === "rate_limited") {
          setErrorMessage(data?.message || "Rate limited: one review per person per day.");
        } else if (res.status === 400 && data?.error === "captcha_failed") {
          setErrorMessage("CAPTCHA verification failed. Please try again.");
        } else if (res.status === 400 && data?.error === "invalid_input") {
          setErrorMessage("Invalid input. Please check your entries.");
        } else {
          setErrorMessage("Submission failed. Please try again.");
        }
        // @ts-expect-error global
        if (widgetIdRef.current && window.turnstile) {
          try {
            // @ts-expect-error global
            window.turnstile.reset(widgetIdRef.current);
          } catch {}
        }
        setToken("");
        return;
      }

      const data = await res.json();
      setSuccessMessage("Review submitted successfully.");
      if (onSubmitted && data?.slug) {
        onSubmitted(data.slug);
      }
      setComment("");
      // @ts-expect-error global
      if (widgetIdRef.current && window.turnstile) {
        try {
          // @ts-expect-error global
          window.turnstile.reset(widgetIdRef.current);
        } catch {}
      }
      setToken("");
    } catch (err) {
      setErrorMessage("Unexpected error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-2 opacity-70" htmlFor="review-name">
          Name
        </label>
        <input
          id="review-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          placeholder="e.g., Jane Doe"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 opacity-70" htmlFor="review-rating">
          Rating
        </label>
        <select
          id="review-rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="input"
        >
          <option value={5}>⭐️⭐️⭐️⭐️⭐️ (5 - Amazing)</option>
          <option value={4}>⭐️⭐️⭐️⭐️ (4 - Great)</option>
          <option value={3}>⭐️⭐️⭐️ (3 - Good)</option>
          <option value={2}>⭐️⭐️ (2 - Okay)</option>
          <option value={1}>⭐️ (1 - Poor)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 opacity-70" htmlFor="review-comment">
          Comment (optional)
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="input resize-none"
          placeholder="Share your experience... (max 500 characters)"
          maxLength={500}
        />
        <p className="text-xs opacity-50 mt-1">{comment.length}/500</p>
      </div>

      <div>
        <div ref={widgetContainerRef} className="cf-turnstile" data-sitekey={siteKey} />
        {!siteKey && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
            Turnstile site key missing. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY.
          </p>
        )}
      </div>

      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 dark:text-red-400 flex-1">{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-600 dark:text-green-400 flex-1">{successMessage}</p>
        </div>
      )}

      <button
        type="submit"
        className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={submitting || !token}
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

