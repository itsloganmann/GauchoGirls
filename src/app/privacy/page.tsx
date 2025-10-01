import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose space-y-4">
          <p>We take your privacy seriously.</p>
          <h2 className="text-xl font-semibold mt-6">Information We Collect</h2>
          <p>When you submit a review, we collect:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>The name you enter for the profile</li>
            <li>Your rating and optional comment</li>
            <li>Hashed version of your IP address (for rate limiting)</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">How We Use Information</h2>
          <p>We use this information to:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Display reviews on the site</li>
            <li>Prevent spam and abuse</li>
            <li>Enforce one review per person per day limit</li>
          </ul>
          <p>We do NOT store your raw IP address or sell your data to third parties.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
