import React, { useEffect, useState } from "react";
import '../App.css';

const Book = () => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage < 9 ? prevPage + 1 : 0));
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="book-section">
      <h2 className="text-center mb-4">Our Medical Services</h2>
      <div className="book-container">
        <div className={`book page-${currentPage}`}>
          <div className="cover front-cover">
            <h2>Medical Services</h2>
          </div>

          <div className="page page1">
          <h3>Core Medical Services</h3>
          <ul>
            <li>Emergency Care</li>
            <li>Outpatient Services</li>
            <li>Surgical Services</li>
            <li>Pharmacy</li>
            <li>Laboratory Testing</li>
          </ul>
        </div>

        <div className="page page2">
          <h3>Additional Services</h3>
          <ul>
            <li>Radiology</li>
            <li>Rehabilitation</li>
            <li>Dental Care</li>
            <li>Mental Health</li>
            <li>Telemedicine</li>
          </ul>
        </div>

        <div className="page page3">
          <h3>Specialist Services</h3>
          <ul>
            <li>Cardiology</li>
            <li>Neurology</li>
            <li>Orthopedics</li>
            <li>Oncology</li>
            <li>Pediatrics</li>
          </ul>
        </div>

        <div className="page page4">
          <h3>Preventive Care</h3>
          <ul>
            <li>Health Checkups</li>
            <li>Vaccinations</li>
            <li>Screening Services</li>
            <li>Nutrition Counseling</li>
            <li>Fitness Programs</li>
          </ul>
        </div>

        <div className="page page5">
          <h3>Women's Health Services</h3>
          <ul>
            <li>Gynecology</li>
            <li>Fertility Services</li>
            <li>Pregnancy Care</li>
            <li>Breast Health</li>
            <li>Menopause Care</li>
          </ul>
        </div>

        <div className="page page6">
          <h3>Pediatric Services</h3>
          <ul>
            <li>Child Immunizations</li>
            <li>Pediatric Surgery</li>
            <li>Well-Baby Clinics</li>
            <li>Child Nutrition</li>
            <li>Developmental Screenings</li>
          </ul>
        </div>

        <div className="page page7">
          <h3>Senior Care Services</h3>
          <ul>
            <li>Geriatric Care</li>
            <li>Home Health Services</li>
            <li>Chronic Disease Management</li>
            <li>Assisted Living Support</li>
            <li>Hospice Care</li>
          </ul>
        </div>

        <div className="page page8">
          <h3>Diagnostic Services</h3>
          <ul>
            <li>Blood Tests</li>
            <li>Imaging Services</li>
            <li>Biopsy Services</li>
            <li>Cardiac Stress Tests</li>
            <li>Electrocardiograms (EKG)</li>
          </ul>
        </div>

        <div className="page page9">
          <h3>Mental Health Services</h3>
          <ul>
            <li>Therapy Sessions</li>
            <li>Psychiatric Consultations</li>
            <li>Support Groups</li>
            <li>Crisis Intervention</li>
            <li>Substance Abuse Programs</li>
          </ul>
        </div>

          <div className="cover back-cover"></div>
        </div>
      </div>
    </div>
  );
};

export default Book;
