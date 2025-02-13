import React from 'react';
import { Brain, Shield, Target, Users, Activity, HeartPulse, Microscope, Stethoscope, Award, Clock, CheckCircle, Upload, Linkedin, Mail } from 'lucide-react';

export function About() {
  const teamMembers = [
    {
      name: "Harichselvamc",
      role: "AI & ML Engineer",
      image: "https://iamharichselvam.web.app/logo.png",
      bio: "Expert in AI-driven healthcare solutions, specializing in ML models and data science.",
      linkedin: "#",
      email: "harichselvamc@gmail.com"
    }
  ];
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">About OralCare AI</h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Revolutionizing oral healthcare through cutting-edge artificial intelligence and machine learning technology
            </p>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Large Feature Box */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center mb-6">
              <Brain className="h-8 w-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Our Technology</h2>
            </div>
            <p className="text-gray-600 mb-4">
              OralCare AI utilizes state-of-the-art deep learning models trained on extensive datasets of dental images. Our system can detect various oral health conditions with high accuracy, providing quick and reliable results.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Advanced neural networks for precise detection
              </li>
              <li className="flex items-center text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Continuous model improvement through machine learning
              </li>
              <li className="flex items-center text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Real-time analysis and instant results
              </li>
            </ul>
          </div>

          {/* Statistics Box */}
          <div className="bg-blue-600 text-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold mb-6">Impact Numbers</h3>
            <div className="space-y-6">
              <div>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-blue-100">Detection Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50,000+</div>
                <div className="text-blue-100">Analyses Performed</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-blue-100">Available Service</div>
              </div>
            </div>
          </div>

          {/* Mission Box */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600">
              To make early oral disease detection accessible to everyone and improve global oral health through innovative technology and artificial intelligence.
            </p>
          </div>

          {/* Team Box */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Expert Team</h2>
            </div>
            <p className="text-gray-600">
              Our team consists of experienced dental professionals, AI researchers, and software engineers working together to provide the most accurate and reliable oral health detection system.
            </p>
          </div>

          {/* Privacy Box */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Privacy & Security</h2>
            </div>
            <p className="text-gray-600">
              We prioritize your privacy and ensure all data is handled securely in compliance with healthcare standards and regulations. Your information is protected with enterprise-grade encryption.
            </p>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Upload className="h-6 w-6" />, title: "Upload Image", description: "Take or upload a clear image of your oral cavity" },
              { icon: <Activity className="h-6 w-6" />, title: "AI Analysis", description: "Our AI processes and analyzes the image" },
              { icon: <CheckCircle className="h-6 w-6" />, title: "Get Results", description: "Receive detailed analysis and predictions" },
              { icon: <Users className="h-6 w-6" />, title: "Expert Review", description: "Share results with healthcare providers" }
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">
              Experts dedicated to revolutionizing oral healthcare
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex space-x-4">
                    <a href={member.linkedin} className="text-gray-600 hover:text-blue-600">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-blue-600">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Certifications</h2>
            <p className="mt-4 text-lg text-gray-600">
              Recognized and certified by leading healthcare organizations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Award className="h-8 w-8" />, title: "ISO Certified", description: "Meets international standards for healthcare systems" },
              { icon: <Shield className="h-8 w-8" />, title: "HIPAA Compliant", description: "Ensures complete patient data privacy and security" },
              { icon: <CheckCircle className="h-8 w-8" />, title: "FDA Approved", description: "Cleared for medical device standards" }
            ].map((cert, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                  {cert.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}