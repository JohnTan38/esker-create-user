'use client';

import React, { useState } from 'react';

// Type definition for a single SOP page
interface SopPage {
  id: number;
  title: string;
  subtitle: string;
  content: {
    heading: string;
    text: string;
  }[];
  image?: string; // Optional image filename
}

// Data for the SOP pages
const sopData: SopPage[] = [
  {
    id: 1,
    title: 'Users Management - Create a new user',
    subtitle: 'Step-by-step guide for creating a new user account.',
    content: [
      {
        heading: 'Key note for new user',
        text: 'Use Email for identifier, and a single profile and one or more groups should be assigned for each new user. Welcome email should be sent out to the new user.',
      },
      {
        heading: 'Note: Profile & group selection',
        text: 'Select the appropriate profile from the dropdown and assign relevant groups to the new user.',
      },
    ],
    image: 'create_new_user.jpg',
  },
  {
    id: 2,
    title: 'Users Management - Lock / Unlock account',
    subtitle: 'Procedure to lock or unlock a user account.',
    content: [
      {
        heading: 'Administrator Action',
        text: 'The administrator can manually lock / unlock a user\'s account. It is advised to lock out a user when he/she leaves the organisation.',
      },
      {
        heading: 'Locking Login',
        text: 'To lock the user account, check the "Lock login" checkbox and click the "Save" button.',
      },
    ],
    image: 'lock_user_account.jpg',
  },
  {
    id: 3,
    title: 'Users Management - Reset password',
    subtitle: 'How to reset a user\'s password.',
    content: [
      {
        heading: 'Password Reset',
        text: 'The administrator can Resend the welcome email or send an email link to Reset password on the user\'s behalf. The reset password email contains an URL to the reset password page.',
      },
    ],
    image: 'reset_user_password.jpg',
  },
  {
    id: 4,
    title: 'ESKER Invoice Download Schematic Diagram',
    subtitle: 'Your automated process workflow.',
    content: [
      {
        heading: 'Schematic Workflow Overview',
        text: 'This section provides a high-level overview of the automated process for downloading bills and invoices.',
      },
      {
        heading: 'Schematic Architecture Diagram',
        text: 'A detailed diagram illustrating the system architecture. This diagram can be interacted with to view different parts of the system.',
      },
    ],
    image: 'schematic_layout.jpg',
  },
];

// Map image filenames to placeholder URLs for demonstration
const imageSources: { [key: string]: string } = {
  'create_new_user.jpg': '/create_new_user.jpg',
  'lock_user_account.jpg': '/lock_user_account.jpg',
  'reset_user_password.jpg': '/reset_user_password.jpg',
  'sample_page_layout.jpg': '/schematic_layout.jpg',
};

// Main App component
export default function SopGuide() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter SOP data based on search query
  const filteredSopData = sopData.filter(sop =>
    sop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sop.content.some(section =>
      section.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const page = filteredSopData[currentPage];

  const handleNext = () => {
    setCurrentPage((prev) => (prev < filteredSopData.length - 1 ? prev + 1 : prev));
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset to the first page of the new search results
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* CSS for print media to hide UI elements */}
      <style jsx global>{`
        @media print {
          .print-hidden {
            display: none !important;
          }
          body {
            background-color: #fff;
          }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="print-hidden w-64 bg-white p-6 shadow-lg hidden md:block">
        <h1 className="text-xl font-bold mb-4">ESKER App</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search procedures..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          {filteredSopData.map((sop, index) => (
            <button
              key={sop.id}
              onClick={() => setCurrentPage(index)}
              className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
                currentPage === index
                  ? 'bg-indigo-600 text-white font-semibold shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {sop.title}
            </button>
          ))}
          {filteredSopData.length === 0 && (
            <div className="text-gray-500 p-3">No results found.</div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {page.title}
            </h2>
            <div className="hidden lg:block text-sm text-gray-500">
              Page {currentPage + 1} of {filteredSopData.length}
            </div>
          </div>

          <p className="text-lg text-gray-600 mb-8">{page.subtitle}</p>

          {/* Image and Content */}
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {page.image && (
              <div className="mb-8 lg:mb-0 lg:w-2/3">
                <img
                  src={imageSources[page.image]}
                  alt={page.title}
                  className="rounded-lg shadow-md border-2 border-gray-200 object-contain w-full h-auto"
                />
              </div>
            )}
            <div className="lg:w-1/3">
              {page.content.map((section, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {section.heading}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="print-hidden flex justify-between mt-12 items-center">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className={`px-6 py-3 rounded-full font-semibold transition-transform duration-200 ease-in-out transform hover:scale-105 ${
                currentPage === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white shadow-lg'
              }`}
            >
              &larr; Previous
            </button>
            <button
              onClick={handleDownloadPdf}
              className="px-6 py-3 rounded-full font-semibold transition-transform duration-200 ease-in-out transform hover:scale-105 bg-gray-500 text-white shadow-lg"
            >
              Download as PDF
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === filteredSopData.length - 1}
              className={`px-6 py-3 rounded-full font-semibold transition-transform duration-200 ease-in-out transform hover:scale-105 ${
                currentPage === filteredSopData.length - 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white shadow-lg'
              }`}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
