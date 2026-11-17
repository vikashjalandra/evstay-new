import type { Metadata } from "next";
import Header from "@/component/Header";
import Footer from "@/component/Footer";

export const metadata: Metadata = {
  title: "Delete Your EVStay Customer Account | EV Stay",
  description:
    "Request deletion of your EVStay Customer account and learn which data is deleted or retained.",
  alternates: { canonical: "https://evstay.in/account-deletion" },
  robots: { index: true, follow: true },
};

const heading = "text-2xl font-normal text-gray-950 tracking-tight";
const link = "text-primary-600 underline underline-offset-2";

export default function AccountDeletionPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <section className="w-full bg-[#0a0a0a] text-white py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-mono tracking-widest text-primary-400 uppercase block font-light">
              EVSTAY CUSTOMER APP
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight leading-[1.05]">
              Delete your account
            </h1>
            <p className="text-neutral-400 text-sm md:text-base max-w-2xl leading-relaxed">
              Request deletion of your EVStay Customer account and associated personal data. This page is provided by EVStay Pvt Ltd.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 md:px-12">
          <article className="max-w-4xl mx-auto space-y-12 text-gray-700 leading-relaxed">
            <section className="space-y-4">
              <h2 className={heading}>Request deletion in the EVStay Customer app</h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li>Open the EVStay Customer app and sign in.</li>
                <li>Open <strong>Profile</strong>.</li>
                <li>Select <strong>Request account deletion</strong>.</li>
                <li>Read the confirmation message and confirm your request.</li>
                <li>Request and enter the fresh phone OTP sent through Firebase Phone Authentication.</li>
              </ol>
              <p>
                Submitting the request signs out your active sessions and restricts account access while EVStay checks for active charging and processes any refundable wallet balance. You may cancel a pending deletion request by signing in and verifying your registered phone number again before deletion is completed.
              </p>
            </section>

            <section className="rounded-3xl border border-primary-200 bg-primary-50/50 p-6 md:p-8 space-y-4">
              <h2 className={heading}>Cannot access the app?</h2>
              <p>
                Email{" "}
                <a className={link} href="mailto:contact@evstay.in?subject=EVStay%20Customer%20account%20deletion%20request">
                  contact@evstay.in
                </a>{" "}
                with the subject <strong>EVStay Customer account deletion request</strong>. Include the mobile number registered to your EVStay Customer account so we can locate and verify the account.
              </p>
              <p>
                Do not send your OTP, PIN, card number, bank password, or UPI PIN by email. EVStay may ask you to complete phone verification before processing the request.
              </p>
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-600 px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
                href="mailto:contact@evstay.in?subject=EVStay%20Customer%20account%20deletion%20request"
              >
                Email a deletion request
              </a>
            </section>

            <section className="space-y-4">
              <h2 className={heading}>Data deleted or anonymised</h2>
              <p>After the request is verified, active charging has ended, and refundable wallet funds have been handled, EVStay deletes or anonymises:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>your name, registered mobile number, Firebase account identifier, and hashed app PIN;</li>
                <li>customer login sessions, refresh tokens, device fingerprints, and device labels associated with those sessions;</li>
                <li>customer reviews associated with your account; and</li>
                <li>customer-identifying fields, such as mobile number or name, from charging-session records that must otherwise be retained.</li>
              </ul>
              <p>Your deleted account cannot be used to sign in again. Creating a future account is treated as a new registration.</p>
            </section>

            <section className="space-y-4">
              <h2 className={heading}>Data retained and retention period</h2>
              <p>
                EVStay may retain anonymised charging records and limited wallet, payment, refund, receipt, invoice, tax, accounting, fraud-prevention, security-audit, and deletion-request records. These records are kept only where necessary to complete transactions, demonstrate deletion, comply with legal and tax obligations, prevent abuse, or resolve disputes.
              </p>
              <p>
                Financial, accounting, tax, and related audit records are normally retained for <strong>eight financial years</strong>. Records connected to an unresolved payment, refund, dispute, court proceeding, regulatory investigation, or legal hold may be retained longer, but only until the matter and any required follow-up retention period are complete.
              </p>
              <p>
                Retained records are access-controlled, are not used to restore your deleted account, and are not used for advertising.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={heading}>Questions or status updates</h2>
              <p>
                Contact EVStay Pvt Ltd at{" "}
                <a className={link} href="mailto:contact@evstay.in?subject=EVStay%20Customer%20deletion%20status">
                  contact@evstay.in
                </a>{" "}
                or call{" "}
                <a className={link} href="tel:+917507245993">
                  +91 75072 45993
                </a>.
              </p>
              <p>
                See the full{" "}
                <a className={link} href="/privacy-policy">
                  EVStay Customer Privacy Policy
                </a>{" "}
                for more information about how EVStay handles customer data.
              </p>
            </section>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
