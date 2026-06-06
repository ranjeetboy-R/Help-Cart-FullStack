export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions of HelpCart",
};

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        Terms & Conditions
      </h1>

      <p className="text-gray-600 mb-6">
        Last Updated: June 2026
      </p>

      <div className="space-y-8 text-gray-700 leading-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Acceptance of Terms
          </h2>

          <p>
            By accessing and using HelpCart, you agree to comply with
            these Terms and Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Platform Nature
          </h2>

          <p>
            HelpCart is a platform that connects customers with
            independent service providers. HelpCart does not directly
            provide the listed services unless otherwise stated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            User Responsibilities
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate information</li>
            <li>Use the platform legally</li>
            <li>Respect other users</li>
            <li>Avoid fraudulent activity</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Provider Responsibilities
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain accurate profile information</li>
            <li>Provide services responsibly</li>
            <li>Comply with applicable laws</li>
            <li>Communicate honestly with customers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Prohibited Activities
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Posting false information</li>
            <li>Impersonating another person</li>
            <li>Uploading harmful content</li>
            <li>Abusing platform features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Account Suspension
          </h2>

          <p>
            HelpCart reserves the right to suspend or terminate any
            account that violates these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Limitation of Liability
          </h2>

          <p>
            HelpCart is not responsible for disputes, damages, losses,
            or service quality issues between customers and providers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Changes to Terms
          </h2>

          <p>
            We may modify these Terms and Conditions at any time.
            Continued use of the platform indicates acceptance of the
            updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Contact Information
          </h2>

          <p>
            For any questions regarding these Terms and Conditions,
            please contact HelpCart.
          </p>
        </section>
      </div>
    </div>
  );
}