import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export default function TosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="prose space-y-4">
          <p>This site is for entertainment purposes only.</p>
          <p>By using this site, you agree to:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Not post defamatory, harassing, or threatening content</li>
            <li>Not share private or personal information</li>
            <li>Not impersonate others</li>
            <li>Not submit spam or automated reviews</li>
          </ul>
          <p>We reserve the right to remove any content that violates these terms.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
