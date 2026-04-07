import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🔝 Header */}
      <div className="bg-black text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-3 text-gray-300">
          We’d love to hear from you 💬
        </p>
      </div>

      {/* 📩 Main Section */}
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">

        {/* 📋 Form */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
            ></textarea>

            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
              Send Message
            </button>
          </form>
        </div>

        {/* 📍 Info Section */}
        <div className="space-y-6">
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">📍 Address</h3>
            <p className="text-gray-500">
              Agwar, Uttar Pradesh, India
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">📞 Phone</h3>
            <p className="text-gray-500">+91 98765 43210</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">📧 Email</h3>
            <p className="text-gray-500">support@shopease.com</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">⏰ Working Hours</h3>
            <p className="text-gray-500">
              Mon - Sat: 9 AM - 8 PM
            </p>
          </div>

        </div>
      </div>

      {/* 📢 CTA */}
      <div className="bg-black text-white text-center py-12">
        <h2 className="text-2xl font-bold mb-3">
          Need Help With Your Order?
        </h2>
        <p className="text-gray-300 mb-4">
          Our support team is always ready to assist you.
        </p>
        <a
          href="/shop/home"
          className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200"
        >
          Go to Shop
        </a>
      </div>

    </div>
  );
};

export default Contact;