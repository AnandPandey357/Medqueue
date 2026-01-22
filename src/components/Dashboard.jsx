import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.jpeg'; 
import background from '../assets/background1.gif'; 
import consultation from "../assets/consultation.gif";
import bed from "../assets/bed.gif";
import pharmancy from "../assets/pharmancy.gif";
import image1 from "../assets/img1.avif";
import image2 from "../assets/img2.jpeg";
import image3 from "../assets/img3.jpeg";
import Book from './Book';

const HospitalManagementSystem = () => {
  const [activeLink, setActiveLink] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="relative min-h-screen">
      {/* Medical Cross Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 pattern-plus opacity-30"></div>
      
      {/* Main Content with Overlay */}
      <div className="relative z-10">
        {/* Navbar Section */}
        <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-lg rounded-b-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-3xl font-extrabold tracking-wide">MedQueue</h1>

            {/* Mobile Menu Button */}
            <button
              className="text-white md:hidden block focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>

            {/* Navigation Links */}
            <div
              className={`flex flex-col md:flex-row md:space-x-8 md:items-center ${
                isMenuOpen ? 'block' : 'hidden'
              } md:block`}
            >
              <a
                href="#about"
                className={`text-lg font-medium transition-colors duration-300 hover:text-blue-100 hover:underline underline-offset-4 ${
                  activeLink === 'about' ? 'text-blue-200 border-b-2 border-white' : 'text-white'
                }`}
                onClick={() => handleLinkClick('about')}
              >
                About Us
              </a>
              <a
                href="#services"
                className={`text-lg font-medium transition-colors duration-300 hover:text-blue-100 hover:underline underline-offset-4 ${
                  activeLink === 'services' ? 'text-blue-200 border-b-2 border-white' : 'text-white'
                }`}
                onClick={() => handleLinkClick('services')}
              >
                Services
              </a>
              <a
                href="#departments"
                className={`text-lg font-medium transition-colors duration-300 hover:text-blue-100 hover:underline underline-offset-4 ${
                  activeLink === 'departments' ? 'text-blue-200 border-b-2 border-white' : 'text-white'
                }`}
                onClick={() => handleLinkClick('departments')}
              >
                Departments
              </a>
              <a
                href="#contact"
                className={`text-lg font-medium transition-colors duration-300 hover:text-blue-100 hover:underline underline-offset-4 ${
                  activeLink === 'contact' ? 'text-blue-200 border-b-2 border-white' : 'text-white'
                }`}
                onClick={() => handleLinkClick('contact')}
              >
                Contact Us
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${background})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start pl-12">
            <h1 className="text-[4rem] font-bold mb-4 text-left animate-drop-down animate-move-up transition-colors duration-700 text-white shadow-lg">
              Welcome to MedQueue
            </h1>
            <p className="text-[2rem] text-white font-bold mb-8 text-left">
              Your Health, Our Priority
            </p>
            <a
              href="#services"
              className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600 transition duration-300 text-left animate-flash"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        {/* Services Section */}
        <section id="services" className="py-16 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <img src={consultation} alt="Consultation" className="h-32 w-32 mx-auto rounded-full mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Consultation</h3>
                <p className="text-gray-600">Expert medical consultation services to ensure your health is in the best hands.</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <img src={bed} alt="Bed Availability" className="h-32 w-32 mx-auto rounded-full mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Real Time Bed Availability</h3>
                <p className="text-gray-600">Find Real Time Bed Availability in your city.</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <img src={pharmancy} alt="Pharmacy" className="h-32 w-32 mx-auto rounded-full mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Pharmacy</h3>
                <p className="text-gray-600">Fully stocked pharmacy with all your medical needs, available 24/7 for your convenience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Departments Section */}
        <section id="departments" className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Our Departments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {[
                { name: "Cardiology", description: "Comprehensive heart care for all your cardiac needs." },
                { name: "Neurology", description: "Advanced treatments for neurological disorders." },
                { name: "Orthopedics", description: "Expert care for bones, muscles, and joints." },
                { name: "Rheumatology", description: "Diagnosis and treatment of autoimmune and joint disorders." },
                { name: "Pediatrics", description: "Medical care for infants, children, and adolescents." },
                { name: "Dermatology", description: "Comprehensive care for skin, hair, and nail conditions." },
                { name: "Gastroenterology", description: "Specialized care for digestive health and disorders." },
                { name: "Oncology", description: "Comprehensive cancer care and treatment." },
                { name: "Endocrinology", description: "Diagnosis and treatment of hormone-related conditions." },
                { name: "Urology", description: "Care for urinary tract and male reproductive system." },
                { name: "Pulmonology", description: "Specialized care for respiratory and lung conditions." },
              ].map((dept, index) => (
                <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-2">{dept.name}</h3>
                  <p>{dept.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Book/>

        {/* Team Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Meet Our Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Dr. John Doe", specialty: "Cardiologist with 20+ years of experience.", img: image1 },
                { name: "Dr. Sarah Lee", specialty: "Neurologist specializing in epilepsy.", img: image2 },
                { name: "Dr. Michael Brown", specialty: "Orthopedic surgeon with expertise in joint replacement.", img: image3 },
              ].map((doctor, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                  <img src={doctor.img} alt={doctor.name} className="h-32 w-32 mx-auto rounded-full mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialty}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gradient-to-r from-blue-500 to-indigo-600 py-4">
          <div className="container mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              {/* About Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">About MedQueue</h3>
                <p className="text-sm">
                  MedQueue is your trusted healthcare partner, offering quality medical services with cutting-edge technology to ensure you receive the best care possible.
                </p>
              </div>

              {/* Quick Links Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#services" className="hover:underline">Services</a></li>
                  <li><a href="#departments" className="hover:underline">Departments</a></li>
                  <li><a href="#contact" className="hover:underline">Contact Us</a></li>
                  <li><a href="#about" className="hover:underline">About Us</a></li>
                </ul>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <p className="text-sm">
                  123 Healthcare Avenue, MedCity<br />
                  Phone: (123) 456-7890<br />
                  Email: info@medqueue.com
                </p>
              </div>
            </div>

            <div className="border-t border-blue-400 mt-8 pt-4">
              <p className="text-sm text-blue-200">
                &copy; 2024 MedQueue. All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HospitalManagementSystem;
