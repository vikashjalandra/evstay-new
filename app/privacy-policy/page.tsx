import type { Metadata } from "next";
import Header from "@/component/Header";
import Footer from "@/component/Footer";

export const metadata: Metadata = {
  title: "EVStay Customer App Privacy Policy | EV Stay",
  description:
    "Learn how the EVStay Customer app collects, uses, shares, protects, retains, and deletes personal and device data.",
  alternates: { canonical: "https://evstay.in/privacy-policy" },
  robots: { index: true, follow: true },
};

const heading = "text-2xl font-normal text-gray-950 tracking-tight";
const link = "text-primary-600 underline underline-offset-2";

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-neutral-400 text-sm md:text-base max-w-2xl leading-relaxed">
              Effective and last updated: 17 November 2026. This policy explains how EVStay Pvt Ltd handles information when you use the EVStay Customer mobile app and its related services.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 md:px-12">
          <article className="max-w-4xl mx-auto space-y-12 text-gray-700 leading-relaxed">
            <section className="space-y-4">
              <h2 className={heading}>1. Who we are and what this policy covers</h2>
              <p>
                The EVStay Customer app is operated by EVStay Pvt Ltd (&quot;EVStay&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). The app helps EV drivers find EVStay charging locations, scan charger QR codes, start and monitor charging, review charging history, and manage wallet payments. This policy applies specifically to the EVStay Customer app, its customer account services, and the EVStay systems used by the app.
              </p>
              <p>
                This policy does not replace the separate privacy notices of third-party services that you choose to use, such as your mobile carrier, Google, Razorpay, or an external maps application.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={heading}>2. Information we collect and process</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="font-medium text-gray-950">Account and authentication information</h3>
                  <p>
                    We process your mobile number, name when provided, Firebase account identifier, phone-verification status, app PIN in securely hashed form, login and session records, device fingerprint, device label, and account status. Google Firebase Phone Authentication processes your phone number and one-time-password verification to authenticate you.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-950">Location information</h3>
                  <p>
                    With your permission, the app accesses approximate or precise device location while you use the app to show nearby charging locations, centre the map, calculate distance, and improve location search results. The current app does not request background location access. You can search for a city or browse locations without granting location permission, although some nearby-location features will be limited.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-950">Camera and QR information</h3>
                  <p>
                    With your permission, the app uses the camera to scan an EVStay charger QR code. Camera images and video are processed for scanning and are not intentionally stored by EVStay. The decoded QR value is sent to EVStay services to identify the charger and connector and to help start a charging session.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-950">Charging and app activity</h3>
                  <p>
                    We process charger and connector identifiers, charging location, session start and end times, charging status, energy delivered, meter values, tariffs, amounts, receipts, charging commands, fault and support information, and ratings or reviews you submit. Charging-site teams may create or access operational records needed to provide the charging service and resolve issues.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-950">Wallet and payment information</h3>
                  <p>
                    If you use EVStay Wallet, we process wallet balances, reserved amounts, top-up amounts, charging deductions, refunds, transaction status, and related Razorpay order, payment, and refund identifiers. Razorpay processes the checkout and payment method information under its own privacy practices. EVStay does not intentionally store your complete card, bank-account, or UPI credentials.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-950">Technical, security, and support information</h3>
                  <p>
                    EVStay systems may process app version, device model or label, device and session identifiers, IP address, request timestamps, security and audit events, diagnostic information, and messages or details you provide when contacting support. We use this information to secure accounts, prevent abuse, diagnose failures, and provide support.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className={heading}>3. How we use information</h2>
              <p>We use information described in this policy to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>create, authenticate, secure, and support your customer account;</li>
                <li>show charging locations and help you navigate to them;</li>
                <li>identify chargers, start and manage charging sessions, and display live or historical session information;</li>
                <li>calculate charges, maintain wallet balances, process top-ups, payments, receipts, reversals, and refunds;</li>
                <li>provide customer support and investigate charger, payment, safety, fraud, or security issues;</li>
                <li>maintain service reliability, enforce limits, and improve EVStay products; and</li>
                <li>comply with accounting, tax, legal, regulatory, dispute-resolution, and law-enforcement obligations.</li>
              </ul>
              <p>We do not sell your personal data, and the current EVStay Customer app does not display third-party advertising.</p>
            </section>

            <section className="space-y-4">
              <h2 className={heading}>4. App permissions and your choices</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Location:</strong> used for nearby chargers, distance, and map positioning.</li>
                <li><strong>Camera:</strong> used only when you open the QR scanner to identify a charger.</li>
                <li><strong>Internet:</strong> required to authenticate, load charger data, manage sessions, and process wallet activity.</li>
              </ul>
              <p>
                You can deny or revoke location and camera permissions in your device settings. The related feature may not work, but you can still use other available parts of the app. The current Android app does not request access to contacts, call logs, SMS content, microphone, or background location.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={heading}>5. When and with whom information is shared</h2>
              <p>We disclose information only as needed to operate and protect the service, including to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Firebase:</strong> for phone-number authentication and OTP verification;</li>
                <li><strong>Google Maps and map services:</strong> to display maps, charging locations, and directions;</li>
                <li><strong>Razorpay:</strong> to create and verify wallet top-ups, payments, and refunds;</li>
                <li><strong>EVStay charging-site and hotel teams:</strong> for the limited customer, charging, receipt, and support information necessary to operate chargers and resolve charging issues;</li>
                <li><strong>EVStay personnel and service providers:</strong> where access is required for hosting, security, operations, support, accounting, or system maintenance; and</li>
                <li><strong>Authorities or other parties:</strong> when required by law, to protect safety and rights, investigate fraud or misuse, or complete a business reorganisation subject to appropriate safeguards.</li>
              </ul>
              <p>
                These parties may process information under their own terms and privacy notices. We expect service providers acting for EVStay to use information only for authorised purposes and with appropriate safeguards.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={heading}>6. Storage and security</h2>
              <p>
                The app communicates with EVStay services over HTTPS. Authentication sessions and pending wallet-checkout information stored by the app use operating-system protected secure storage, such as Android Keystore-backed storage. EVStay uses access controls, hashed PINs, session revocation, audit records, and operational safeguards designed to protect customer information.
              </p>
              <p>
                No electronic system is completely secure. Please protect your phone, OTPs, and PIN, install updates, and contact us promptly if you believe your account has been misused.
              </p>
            </section>

            <section id="account-deletion" className="space-y-4 scroll-mt-24">
              <h2 className={heading}>7. Retention and account deletion</h2>
              <p>
                We keep personal data only for as long as needed for the purposes described above and for applicable legal, tax, accounting, fraud-prevention, safety, dispute, and security requirements. Retention periods vary by record type and applicable obligations.
              </p>
              <p>
                You can request deletion in the app from <strong>Profile → Request account deletion</strong>. A fresh phone OTP is required. Submitting a request signs out active sessions and restricts account use while EVStay checks for an active charging session and returns any refundable wallet balance. You may cancel a pending request by verifying your phone number again before deletion is completed.
              </p>
              <p>
                When deletion is completed, EVStay removes or anonymises direct account identifiers, removes saved login sessions and customer reviews, and removes customer-identifying fields from retained charging records. Limited charging, payment, refund, tax, accounting, security, audit, and deletion-request records may be retained where required to complete transactions, demonstrate compliance, prevent fraud, resolve disputes, or meet legal obligations. Retained records are not used to restore access to the deleted account.
              </p>
              <p>
                If you cannot access the app, request account and associated personal-data deletion by emailing{" "}
                <a className={link} href="mailto:contact@evstay.in?subject=EVStay%20Customer%20account%20deletion%20request">
                  contact@evstay.in
                </a>{" "}
                and include your registered mobile number and the words “EVStay Customer account deletion request.” We will verify the request before acting on it. Do not send your OTP or PIN by email.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={heading}>8. Your privacy choices and requests</h2>
              <p>
                Depending on applicable law, you may ask to access, correct, update, or delete personal information, or raise a concern about how it is used. You can update permission choices in device settings, sign out to remove the active app session, use the in-app deletion workflow, or contact us. We may need to verify your identity and may retain information where the law permits or requires it.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={heading}>9. Children</h2>
              <p>
                The EVStay Customer app is intended for EV drivers who can lawfully create an account and use payment services. It is not directed to children. If you believe a child has provided personal information without appropriate authorisation, contact us so we can review and address the request.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={heading}>10. Changes to this policy</h2>
              <p>
                We may update this policy when the app, our providers, or legal requirements change. We will publish the revised policy at this URL and update the effective date. Where required, we will provide additional notice in the app or request consent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={heading}>11. Contact EVStay</h2>
              <p>
                For privacy questions, data requests, or account-deletion support, contact EVStay Pvt Ltd at{" "}
                <a className={link} href="mailto:contact@evstay.in?subject=EVStay%20Customer%20privacy%20request">
                  contact@evstay.in
                </a>{" "}
                or call{" "}
                <a className={link} href="tel:+917507245993">
                  +91 75072 45993
                </a>.
              </p>
            </section>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
