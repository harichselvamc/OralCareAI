import React from 'react';
import { Shield, Activity, Brain, HeartPulse, Microscope, CheckCircle } from 'lucide-react';

const diseases = [
  {
    name: 'Bruxism',
    description: 'Teeth grinding and jaw clenching, often occurring during sleep.',
    symptoms: ['Worn tooth enamel', 'Jaw pain', 'Headaches', 'Tooth sensitivity'],
    prevention: [
      'Use a night guard',
      'Practice stress reduction',
      'Avoid caffeine before bed',
      'Regular dental check-ups'
    ],
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000'
  },
  {
    name: 'Dental Caries',
    description: 'Also known as tooth decay or cavities, caused by bacteria that produce acid which destroys tooth enamel.',
    symptoms: ['Tooth pain', 'Sensitivity to hot/cold', 'Visible holes in teeth', 'Dark spots on teeth'],
    prevention: [
      'Regular brushing and flossing',
      'Use fluoride toothpaste',
      'Limit sugary foods',
      'Regular dental check-ups'
    ],
    image: 'https://th.bing.com/th/id/OIP.z49Xu1A1WW-VlZbNtUlXtQHaD4?rs=1&pid=ImgDetMain'
  },
  {
    name: 'Periodontal Disease',
    description: 'Advanced gum disease that can lead to tooth loss if left untreated.',
    symptoms: ['Receding gums', 'Loose teeth', 'Persistent bad breath', 'Bleeding gums'],
    prevention: [
      'Daily flossing',
      'Regular professional cleanings',
      'Quit smoking',
      'Maintain good oral hygiene'
    ],
    image: 'https://images.unsplash.com/photo-1658994477988-da3fcac18785?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Thrush',
    description: 'Oral yeast infection causing white patches in the mouth.',
    symptoms: ['White patches on tongue', 'Redness', 'Loss of taste', 'Cotton-like feeling'],
    prevention: [
      'Good oral hygiene',
      'Regular dental check-ups',
      'Limit sugar intake',
      'Manage underlying conditions'
    ],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000'
  }
];

export function Diseases() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Common Oral Diseases</h1>
          <p className="mt-4 text-lg text-gray-500">
            Learn about various oral diseases, their symptoms, and prevention methods
          </p>
        </div>

        {/* Prevention Tips Overview */}
        <div className="mt-12 bg-blue-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">General Prevention Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Daily Care",
                tips: ["Brush twice daily", "Floss regularly", "Use mouthwash"]
              },
              {
                icon: <Activity className="h-6 w-6" />,
                title: "Lifestyle Habits",
                tips: ["Avoid smoking", "Limit sugary foods", "Stay hydrated"]
              },
              {
                icon: <CheckCircle className="h-6 w-6" />,
                title: "Regular Check-ups",
                tips: ["Bi-annual dental visits", "Professional cleaning", "Early detection"]
              }
            ].map((section, index) => (
              <div key={index} className="bg-blue-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {section.icon}
                  <h3 className="ml-2 text-lg font-semibold">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Disease Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {diseases.map((disease) => (
            <div key={disease.name} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
              <img
                src={disease.image}
                alt={disease.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{disease.name}</h3>
                <p className="text-gray-600 mb-4">{disease.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Symptoms:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {disease.symptoms.map((symptom) => (
                      <li key={symptom}>{symptom}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Prevention:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {disease.prevention.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Care Section */}
        <div className="mt-12 bg-red-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-red-700 mb-4">When to Seek Emergency Care</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Warning Signs</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                  Severe tooth pain or swelling
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                  Knocked-out tooth
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                  Severe bleeding
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Immediate Actions</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                  Contact emergency dental services
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                  Apply cold compress for swelling
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                  Preserve knocked-out tooth in milk
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}