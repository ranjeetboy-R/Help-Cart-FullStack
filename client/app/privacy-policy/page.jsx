export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy of HelpCart",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <p className="text-gray-600 mb-6">
        Last Updated: June 2026
      </p>

      <div className="space-y-8 text-gray-700 leading-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Introduction
          </h2>
          <p>
            Welcome to HelpCart. We value your privacy and are committed
            to protecting your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Information We Collect
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Name</li>
            <li>Email Address</li>
            <li>Mobile Number</li>
            <li>Profile Photo</li>
            <li>Location Information</li>
            <li>Professional and Service Details</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            How We Use Information
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Create and manage accounts</li>
            <li>Connect customers with providers</li>
            <li>Improve platform performance</li>
            <li>Provide customer support</li>
            <li>Prevent fraud and misuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Data Security
          </h2>

          <p>
            We use reasonable security measures to protect user data.
            However, no online system can guarantee complete security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Third-Party Services
          </h2>

          <p>
            We may use third-party services such as hosting providers,
            analytics tools, and other services required to operate
            HelpCart.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            User Rights
          </h2>

          <p>
            Users may request correction or deletion of their account
            information by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Changes to This Policy
          </h2>

          <p>
            We may update this Privacy Policy from time to time. Any
            changes will be posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Contact Us
          </h2>

          <p>
            If you have any questions regarding this Privacy Policy,
            please contact us through HelpCart.
          </p>
        </section>
      </div>
    </div>
  );
}