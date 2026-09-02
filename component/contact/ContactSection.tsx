"use client"
import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [propertyType, setPropertyType] = useState<string>('Hotel');
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    phoneNumber: '',
    propertyName: '',
    cityLocation: '',
    parkingSpaces: '',
    additionalDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const propertyTypes = ['Hotel', 'Resort', 'Restaurant', 'Highway Property', 'Other'];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, propertyType }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setStatusMessage(
          data.message || 'Thank you! Your enquiry has been sent to hr@dassgroup.in.'
        );
        setFormData({
          fullName: '',
          businessEmail: '',
          phoneNumber: '',
          propertyName: '',
          cityLocation: '',
          parkingSpaces: '',
          additionalDetails: '',
        });
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Failed to send your request. Please try again.');
      }
    } catch (err) {
      console.error('Contact Form Submission Error:', err);
      setStatus('error');
      setStatusMessage('An unexpected network error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#fcfcf9] text-gray-900 py-16 md:py-24 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Section Tag */}
          <div className="md:col-span-4 text-base font-light text-green-600 uppercase pt-2 tracking-wide">
            [01] GET IN TOUCH
          </div>

          {/* Headline & Subtitle Container */}
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-gray-950 leading-[1.05]">
              Let’s Build an EV-Ready Destination.
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-xl">
              Tell us a little about your property and what you're looking for. Our team will help you understand the right charging setup for your location.
            </p>
          </div>
        </div>

        {/* Content Layout: Direct Lines + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-6">

          {/* Left Column: Direct Lines Info */}
          <div className="lg:col-span-5 space-y-8 pt-4">
            <h3 className="text-2xl font-light text-gray-950 tracking-tight">
              Direct Lines
            </h3>

            <div className="space-y-6">
              {/* Partnerships */}
              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-green-600 shrink-0 mt-0.5 stroke-[1.5]" />
                <div className="space-y-1">
                  <span className="text-xs text-green-700 uppercase block">
                    PARTNERSHIPS
                  </span>
                  <a
                    href="tel:+917507245993"
                    className="text-sm font-medium text-gray-900 hover:text-green-600 transition-colors"
                  >
                    +91 7507245993
                  </a>
                </div>
              </div>

              {/* General Enquiries */}
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-green-600 shrink-0 mt-0.5 stroke-[1.5]" />
                <div className="space-y-1">
                  <span className="text-xs text-green-700 uppercase block">
                    GENERAL ENQUIRIES
                  </span>
                  <a
                    href="mailto:sales@evstay.in"
                    className="text-sm font-medium text-gray-900 hover:text-green-600 transition-colors"
                  >
                    sales@evstay.in
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-green-600 shrink-0 mt-0.5 stroke-[1.5]" />
                <div className="space-y-1">
                  <span className="text-xs text-green-700 uppercase block">
                    ADDRESS
                  </span>
                  <p className="text-sm font-medium text-gray-900 leading-relaxed">
                    Office No 1, Pangare Building, Velu <br />
                    Phata, Velu, Pune
                    {/* Office 204, A Wing, City Vista, Kharadi, Pune, Maharashtra 411014 */}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Box */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Feedback Alert Banners */}
              {status === 'success' && (
                <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-800 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900">Enquiry Sent!</p>
                    <p className="text-xs text-green-700 mt-0.5">{statusMessage}</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900">Submission Error</p>
                    <p className="text-xs text-red-700 mt-0.5">{statusMessage}</p>
                  </div>
                </div>
              )}

              {/* Input Grid Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pb-2 pt-1 border-b border-gray-200 text-sm focus:border-green-600 focus:outline-none transition-colors placeholder-gray-300 bg-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="businessEmail"
                    required
                    placeholder="jane@hotel.com"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    className="w-full pb-2 pt-1 border-b border-gray-200 text-sm focus:border-green-600 focus:outline-none transition-colors placeholder-gray-300 bg-transparent"
                  />
                </div>
              </div>

              {/* Input Grid Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="+91"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full pb-2 pt-1 border-b border-gray-200 text-sm focus:border-green-600 focus:outline-none transition-colors placeholder-gray-300 bg-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Property Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="propertyName"
                    required
                    placeholder="Grand Resort & Spa"
                    value={formData.propertyName}
                    onChange={handleChange}
                    className="w-full pb-2 pt-1 border-b border-gray-200 text-sm focus:border-green-600 focus:outline-none transition-colors placeholder-gray-300 bg-transparent"
                  />
                </div>
              </div>

              {/* Property Type Radio Pills */}
              <div className="space-y-3 pt-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Property Type
                </label>
                <div className="flex flex-wrap gap-3">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={`px-5 py-2.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${propertyType === type
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-green-400 hover:text-green-700'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Grid Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    City / Location
                  </label>
                  <input
                    type="text"
                    name="cityLocation"
                    placeholder="Mumbai, MH"
                    value={formData.cityLocation}
                    onChange={handleChange}
                    className="w-full pb-2 pt-1 border-b border-gray-200 text-sm focus:border-green-600 focus:outline-none transition-colors placeholder-gray-300 bg-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Total Parking Spaces
                  </label>
                  <select
                    name="parkingSpaces"
                    value={formData.parkingSpaces}
                    onChange={handleChange}
                    className="w-full pb-2 pt-1 border-b border-gray-200 text-sm focus:border-green-600 focus:outline-none transition-colors text-gray-700 bg-transparent cursor-pointer"
                  >
                    <option value="" disabled>
                      Select range
                    </option>
                    <option value="1-10">1 - 10 spaces</option>
                    <option value="11-50">11 - 50 spaces</option>
                    <option value="51-100">51 - 100 spaces</option>
                    <option value="100+">100+ spaces</option>
                  </select>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Additional Details (Optional)
                </label>
                <input
                  type="text"
                  name="additionalDetails"
                  placeholder="Any specific requirements or timelines?"
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  className="w-full pb-2 pt-1 border-b border-gray-200 text-sm focus:border-green-600 focus:outline-none transition-colors placeholder-gray-300 bg-transparent"
                />
              </div>

              {/* Bottom Footer: Terms & Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                <p className="text-[11px] text-gray-400 max-w-xs text-center sm:text-left leading-relaxed">
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-green-600/20 transition-all shrink-0 px-8 py-3.5 rounded-full text-xs font-semibold flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;