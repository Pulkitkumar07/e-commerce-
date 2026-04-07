import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🔝 Banner */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">About Our Store</h1>
        <p className="mt-4 text-gray-300">
          Trusted by thousands of customers across India 🇮🇳
        </p>
      </div>

      {/* 🛍️ Intro */}
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        
        <div>
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
            alt="ecommerce"
            className="rounded-2xl shadow-lg"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Your Trusted Shopping Partner
          </h2>
          <p className="text-gray-600 mb-4">
            We bring you the best products from top brands at unbeatable prices.
            From electronics to fashion, everything is available at one place.
          </p>
          <p className="text-gray-600">
            Our goal is to make online shopping fast, secure, and enjoyable.
          </p>
        </div>
      </div>

      {/* 📊 Stats (very important 🔥) */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div>
            <h2 className="text-3xl font-bold">10K+</h2>
            <p className="text-gray-500">Happy Customers</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">500+</h2>
            <p className="text-gray-500">Products</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">50+</h2>
            <p className="text-gray-500">Brands</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">24/7</h2>
            <p className="text-gray-500">Support</p>
          </div>

        </div>
      </div>

      {/* 🚀 Features */}
      <div className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Shop With Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🚚 Fast Delivery</h3>
            <p className="text-gray-500">
              Quick and reliable delivery across the country.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">💳 Secure Payment</h3>
            <p className="text-gray-500">
              100% safe and secure transactions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">⭐ Top Quality</h3>
            <p className="text-gray-500">
              Only the best products from trusted brands.
            </p>
          </div>

        </div>
      </div>

      {/* 📢 CTA */}
      <div className="bg-black text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Shopping Today
        </h2>
        <p className="mb-6 text-gray-300">
          Discover amazing deals and trending products now.
        </p>
        <a
          href="/shop/listing"
          className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition"
        >
          Shop Now
        </a>
      </div>

    </div>
  );
};

export default About;