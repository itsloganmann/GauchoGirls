import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Contact</h1>
        <div className="prose space-y-4">
          <p>For questions, concerns, or to report inappropriate content, please contact us:</p>
          <p className="text-lg">
            <strong>Email:</strong> <a href="mailto:contact@gauchogirls.com" className="text-blue-600 underline">contact@gauchogirls.com</a>
          </p>
          <p className="text-sm text-gray-600 mt-8">We will respond to all inquiries within 48 hours.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
