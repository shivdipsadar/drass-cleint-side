import React, { useState } from "react";
import useData from "../hooks/useData";

import PageHero from "../components/PageHero";
import { getImageUrl } from "../utils/api";

const ContactUs = () => {

  const { data, loading, error } = useData();

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Failed to load data
      </div>
    );
  }

  if (!data) return null;

  const contactData = data?.contact;

  // ❗ Safety
  if (!contactData) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No contact data available
      </div>
    );
  }

  // ✅ SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sending) return;

    setSending(true);

    const form = e.target;

    const payload = {
      To: contactData.receiverEmail,
      Subject: `Inquiry | ${new Date().toLocaleString("en-IN")}`,
      Body: `
Name: ${form.firstname.value} ${form.lastname.value}
Email: ${form.email.value}
Phone: ${form.mobile.value}

Message:
${form.message.value}
      `,
    };

    try {
      await fetch(import.meta.env.VITE_CONTACT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
      form.reset();

    } catch (err) {
      console.error("❌ Submission failed:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>

      {/* ✅ HERO */}
      {contactData.title && (
        <PageHero
          title={contactData.title}
          backgroundImage={
            contactData.backgroundImage
              ? getImageUrl(contactData.backgroundImage)
              : ""
          }
        />
      )}

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-stretch">

          {/* ✅ MAP */}
          <div className="h-[500px] rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Location"
              src={contactData.mapEmbed}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          {/* ✅ FORM */}
          <div className="h-[500px] flex flex-col justify-center">

            {!submitted ? (
              <>
                <h2 className="text-3xl font-semibold mb-8 text-center">
                  {contactData.formTitle || "Contact Us"}
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>

                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Enter Firstname"
                      required
                      className="w-full p-3 border rounded-md"
                    />

                    <input
                      type="text"
                      name="lastname"
                      placeholder="Enter Lastname"
                      required
                      className="w-full p-3 border rounded-md"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      required
                      className="w-full p-3 border rounded-md"
                    />

                    <input
                      type="text"
                      name="mobile"
                      placeholder="Enter Mobile"
                      required
                      className="w-full p-3 border rounded-md"
                    />
                  </div>

                  <textarea
                    rows="4"
                    name="message"
                    placeholder="Enter Message"
                    required
                    className="w-full p-3 border rounded-md"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-md transition disabled:opacity-50"
                  >
                    {sending ? "Sending..." : "Submit Enquiry"}
                  </button>

                </form>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-700 mb-3">
                  Inquiry Submitted 🎉
                </h3>
                <p className="text-gray-600">
                  Thank you! We will contact you soon.
                </p>
              </div>
            )}

          </div>

        </div>
      </section>

    </>
  );
};

export default ContactUs;