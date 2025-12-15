import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiX, FiMapPin, FiMaximize2 } from "react-icons/fi";

// --- 1. THE IMAGE DATA ---
// We use high-quality Unsplash IDs to ensure they look premium.
const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80",
    title: "Gauri & Her Calf",
    desc: "Our oldest Gir cow, Gauri, teaching the little one how to graze.",
    height: "h-96", // Tall
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80",
    title: "Sunrise at Rawat krishi  Farms",
    desc: "The farm wakes up at 4:30 AM every day to ensure freshness.",
    height: "h-64", // Short
  },
  {
    id: 3,
    url: "https://www.pashudhanpraharee.com/wp-content/uploads/2020/12/fodder.jpg",
    title: "Organic Fodder",
    desc: "We grow our own hydroponic green grass. No chemicals, ever.",
    height: "h-80", // Medium
  },
  {
    id: 4,
    url: "https://c8.alamy.com/comp/2Y71EXE/cows-in-milking-shed-c-1940-2Y71EXE.jpg",
    title: "The Milking Shed",
    desc: "Touch-free milking ensures zero contamination.",
    height: "h-72",
  },
  {
    id: 5,
    url: "https://tmff.net/wp-content/uploads/2023/04/3dbf195949-poster.jpg",
    title: "Happy Herd",
    desc: "Our cows roam free on 20 acres of open pasture.",
    height: "h-96",
  },
  {
    id: 6,
    url: "https://www.ajantabottle.com/blog/wp-content/uploads/2023/04/perfect-set-pure-clean-healthy-water-transparent-glass-bottles-cups-presented-wooden-2-scaled.jpg",
    title: "Pure Glass Bottles",
    desc: "Eco-friendly packaging that keeps the taste authentic.",
    height: "h-64",
  },
  {
    id: 7,
    url: "https://thumbs.dreamstime.com/b/quality-sign-green-check-mark-37493232.jpg",
    title: "Quality Check",
    desc: "Every batch is tested for density and purity before dispatch.",
    height: "h-80",
  },
  {
    id: 8,
    url: "https://thumbs.dreamstime.com/b/herd-cows-peacefully-grazing-golden-hillside-pasture-warm-evening-sunlight-393644200.jpg",
    title: "Evening Grazing",
    desc: "Golden hour is the favorite time for our herd.",
    height: "h-72",
  },
];

const OurFarm = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="bg-dairy-cream min-h-screen pt-28 pb-20 px-4">
      {/* --- HEADER SECTION --- */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-dairy-gold font-bold tracking-widest uppercase text-sm mb-2 block">
          Transparency & Trust
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-dairy-dark mb-6">
          Life at Rawat Krishi Farm
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          We believe happy cows give the healthiest milk. Located in the lush
          green foothills, our farm is a sanctuary where tradition meets
          hygiene. Take a look inside.
        </p>
        <div className="flex justify-center items-center gap-2 mt-6 text-dairy-dark font-bold">
          <FiMapPin className="text-dairy-gold" />
          <span>Kasli, Sikar Rajasthan</span>
        </div>
      </div>

      {/* --- MASONRY GALLERY --- */}
      <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryImages.map((img) => (
          <div
            key={img.id}
            className="relative group break-inside-avoid rounded-2xl overflow-hidden shadow-md cursor-pointer"
            onClick={() => setSelectedImg(img)}
          >
            {/* Image */}
            <img
              src={img.url}
              alt={img.title}
              className={`w-full ${img.height} object-cover transition-transform duration-700 group-hover:scale-110`}
            />

            {/* Overlay Gradient (Hidden by default, visible on hover) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {img.title}
              </h3>
              <p className="text-gray-200 text-sm mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                {img.desc}
              </p>
              <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                <FiMaximize2 size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- CTA BOTTOM --- */}
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-dairy-dark mb-4">
          Want to taste the difference?
        </h2>
        <Link
          to="/"
          className="bg-dairy-gold text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-dairy-dark transition-colors inline-block"
        >
          Order Fresh Milk
        </Link>
      </div>

      {/* --- LIGHTBOX MODAL (Full Screen View) --- */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-dairy-gold transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <FiX size={40} />
          </button>
          
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImg.url} 
              alt={selectedImg.title} 
              className="w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="text-center mt-4 text-white">
              <h3 className="text-2xl font-bold">{selectedImg.title}</h3>
              <p className="text-gray-300 mt-2">{selectedImg.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurFarm;