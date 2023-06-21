import React from "react";

const ContactSection = () => {
  return (
    <section id="contact" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Contact Us
        </h2>
        <div className="max-w-md mx-auto">
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-800 font-semibold mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-300 rounded px-3 py-2 w-full bg-white text-black"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-800 font-semibold mb-2 "
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 rounded px-3 py-2 w-full bg-white text-black"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-800 font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                className="border border-gray-300 rounded px-3 py-2 w-full h-32 bg-white text-black"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
