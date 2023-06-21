import React from "react";

const ServicesSection = () => {
  return (
    <section id="services" className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Export Assistance
            </h3>
            <p className="text-gray-600">
              We offer comprehensive export assistance services, including
              documentation, customs clearance, and logistics coordination.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Import Solutions
            </h3>
            <p className="text-gray-600">
              Our import solutions cover import planning, supplier sourcing,
              quality control, and delivery management to ensure smooth
              operations.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Global Logistics
            </h3>
            <p className="text-gray-600">
              We handle the complex logistics of global trade, offering
              warehousing, shipping, freight forwarding, and supply chain
              management services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
