import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative">
      <div className="relative h-96">
        <div className="absolute inset-0">
          <Image
            src="/parcel-cover.jpg"
            alt="Slider Image 1"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold">
              Your Global Export-Import Partner
            </h1>
            <p className="mt-4 text-lg md:text-xl lg:text-2xl text-white">
              Reliable, Efficient, and Secure Transportation Solutions
            </p>
            <button className="mt-8 bg-blue-500 text-white font-semibold px-6 py-3 rounded hover:bg-blue-600">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
