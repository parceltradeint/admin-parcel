/* eslint-disable react/no-unescaped-entities */
import React from "react";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-600">
              "Parcel has been instrumental in helping our business expand
              globally. Their export services are efficient and reliable. Highly
              recommended!"
            </p>
            <p className="text-gray-800 font-semibold mt-4">John Smith</p>
            <p className="text-gray-600">CEO, Company ABC</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-600">
              "We have been using Parcel's import solutions for years. They have
              saved us time and effort in managing our international suppliers.
              Excellent service!"
            </p>
            <p className="text-gray-800 font-semibold mt-4">Jane Doe</p>
            <p className="text-gray-600">Procurement Manager, Company XYZ</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-600">
              "Parcel's global logistics services have streamlined our supply
              chain and improved our operational efficiency. They are a trusted
              partner in our import-export operations."
            </p>
            <p className="text-gray-800 font-semibold mt-4">Mike Johnson</p>
            <p className="text-gray-600">Supply Chain Director, Company 123</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
