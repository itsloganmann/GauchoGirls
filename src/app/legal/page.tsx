import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Legal</h1>
        <div className="prose space-y-4">
          <h2 className="text-xl font-semibold">Disclaimer</h2>
          <p>GauchoGirls is an independent platform and is NOT affiliated with, endorsed by, or connected to the University of California, Santa Barbara (UCSB) in any way.</p>
          <h2 className="text-xl font-semibold mt-6">Content Disclaimer</h2>
          <p>Reviews posted on this site reflect the opinions of individual users and do not represent the views of GauchoGirls or its operators.</p>
          <p>We are not responsible for the accuracy or truthfulness of user-submitted content.</p>
          <h2 className="text-xl font-semibold mt-6">Limitation of Liability</h2>
          <p>This site is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from your use of this site.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
