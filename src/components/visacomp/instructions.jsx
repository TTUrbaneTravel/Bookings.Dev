import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Instructions = () => {
  // Extract countryId from URL parameters
  const { countryId } = useParams();
  const navigate = useNavigate(); // Get the navigate function

  const instructionsContent = {
    UK: {
      title: "🇬🇧 Apply for a UK Visa: Your Guide to Entry",
      overview: `
        You can visit the UK as a Standard Visitor for tourism, business, study (courses up to 6 months), and other permitted activities.
        <br />
        You can usually stay in the UK for up to 6 months. You might be able to apply to stay longer in certain circumstances, such as for medical treatment.
        <br />
        Depending on your nationality, you may not need a visa to visit the UK. You should check if you need a visa before applying.
      `,
      requirements: [
        "Check if your planned activities are allowed as a Standard Visitor.",
        "Check if you meet the eligibility requirements.",
        "Check if you need a visa to visit the UK.",
        "Apply for a Standard Visitor visa online - if required.",
        "Complete the application process and submit required documents.",
      ],
      permissions: {
        allowed: [
          "Tourism (e.g., holiday, vacation)",
          "Visiting family or friends",
          "Volunteering for up to 30 days with a registered charity",
          "Passing through the UK (‘in transit’)",
          "Business activities (e.g., meetings, interviews)",
          "Short-term study, placements, or exams",
          "Participating in school exchange programs",
          "Performing permitted paid engagements",
          "Medical treatment",
        ],
        notAllowed: [
          "Paid or unpaid work for a UK company",
          "Claiming public funds (benefits)",
          "Frequent long-term stays",
          "Marriage or registering a civil partnership",
        ],
      },
      visaTypes: [
        'Standard Visitor Visa',
        'Work Visa',
        'Student Visa',
        'Dependent Visa',
      ],
    },
    USA: {
      title: "🇺🇸 Apply for a USA Visa: Your Guide to Entry",
      overview: `
        You can visit the USA as a tourist, for business, or for other permitted activities.
        <br />
        You can usually stay in the USA for up to 6 months. You might be able to apply to stay longer in certain circumstances.
        <br />
        Depending on your nationality, you may need a visa to visit the USA. You should check if you need a visa before applying.
      `,
      requirements: [
        "Check if your planned activities are allowed as a tourist.",
        "Check if you meet the eligibility requirements.",
        "Check if you need a visa to visit the USA.",
        "Apply for a tourist visa online - if required.",
        "Complete the application process and submit required documents.",
      ],
      permissions: {
        allowed: [
          "Tourism (e.g., holiday, vacation)",
          "Visiting family or friends",
          "Business activities (e.g., meetings, interviews)",
          "Short-term study, placements, or exams",
          "Participating in school exchange programs",
        ],
        notAllowed: [
          "Paid or unpaid work for a USA company",
          "Claiming public funds (benefits)",
          "Frequent long-term stays",
          "Marriage or registering a civil partnership",
        ],
      },
      visaTypes: [
        'Tourist Visa',
        'Work Visa',
        'Student Visa',
        'Dependent Visa',
      ],
    },
  };

  // Use the extracted countryId to get the instructions
  const countryInstructions = instructionsContent[countryId] || {
    title: "Instructions Not Available",
    overview: "Instructions for this country are not available yet.",
    requirements: [],
    permissions: { allowed: [], notAllowed: [] },
    visaTypes: [],
  };

  const handleProceed = () => {
    navigate(`/application/${countryId}`);
  };

  return (
    <div className="container mx-auto pt-28 px-4 md:px-8">
      <h1 className="text-2xl font-bold mb-4">{countryInstructions.title}</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: countryInstructions.overview }} />
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What You Need to Do</h2>
        <ul className="list-disc list-inside text-gray-700">
          {countryInstructions.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What You Can and Cannot Do</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-green-100 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Allowed Activities ✅</h3>
            <ol className="list-decimal list-inside text-gray-700">
              {countryInstructions.permissions.allowed.map((item, index) => (
                <li key={index}><strong>{index + 1}.</strong> {item}</li>
              ))}
            </ol>
          </div>
          <div className="flex-1 bg-red-100 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Not Allowed ❌</h3>
            <ol className="list-decimal list-inside text-gray-700">
              {countryInstructions.permissions.notAllowed.map((item, index) => (
                <li key={index}><strong>{index + 1}.</strong> {item}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      
      <div className="flex justify-center mt-6 p-4">
        <button
          onClick={handleProceed}
          className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          Proceed to Apply
        </button>
      </div>
    </div>
  );
};

export default Instructions;