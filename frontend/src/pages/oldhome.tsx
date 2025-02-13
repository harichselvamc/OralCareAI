import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield, Users, Brain, ChevronRight, Lock, Microscope, HeartPulse, Stethoscope, History } from 'lucide-react';
import { getUserResults } from '../api';
import type { PredictionResult } from '../types';

export function Home() {
  const [userResults, setUserResults] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchResults = async () => {
      if (username) {
        setLoading(true);
        try {
          const results = await getUserResults(username);
          setUserResults(results);
        } catch (error) {
          console.error('Error fetching results:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResults();
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Z-pattern */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                Advanced AI for Oral Health Detection
              </h1>
              <p className="text-xl text-blue-100">
                Detect oral health issues early with our state-of-the-art AI technology. Get instant, accurate predictions for various oral conditions.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/signin"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-300"
                >
                  Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000"
                alt="Dental Care"
                className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why Choose OralCare AI?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our comprehensive solution offers cutting-edge technology for accurate oral health detection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto mb-4">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">AI-Powered Analysis</h3>
            <p className="text-gray-600 text-center">
              Advanced machine learning algorithms trained on thousands of dental images for precise diagnosis
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto mb-4">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">Secure & Private</h3>
            <p className="text-gray-600 text-center">
              Your data is protected with enterprise-grade security and encryption
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto mb-4">
              <Microscope className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">Instant Results</h3>
            <p className="text-gray-600 text-center">
              Get immediate analysis and recommendations for your oral health concerns
            </p>
          </div>
        </div>
      </div>

      {/* Disease Categories */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Conditions We Detect
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our AI system can identify various oral health conditions with high accuracy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Bruxism", icon: <HeartPulse className="h-6 w-6" />, description: "Teeth grinding and jaw clenching" },
              { name: "Cavities", icon: <Activity className="h-6 w-6" />, description: "Tooth decay and dental caries" },
              { name: "Periodontal Disease", icon: <Stethoscope className="h-6 w-6" />, description: "Gum inflammation and infection" },
              { name: "Tooth Discoloration", icon: <Shield className="h-6 w-6" />, description: "Changes in tooth color" },
              { name: "Dental Caries", icon: <Activity className="h-6 w-6" />, description: "Progressive tooth decay" },
              { name: "Edentulism", icon: <Users className="h-6 w-6" />, description: "Complete tooth loss" },
              { name: "Thrush", icon: <Microscope className="h-6 w-6" />, description: "Oral yeast infection" },
              { name: "Gum Disease", icon: <HeartPulse className="h-6 w-6" />, description: "Periodontal conditions" }
            ].map((condition, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                  {condition.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                  {condition.name}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {condition.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
 {/* Results Tracking Section - Only shown when user is logged in */}
 {username && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <History className="h-8 w-8 text-blue-600 mr-2" />
                <h2 className="text-3xl font-bold text-gray-900">Your Prediction History</h2>
              </div>
              <p className="text-lg text-gray-600">
                Track your past oral health assessments and monitor your progress
              </p>
            </div>

            {loading ? (
              <div className="text-center text-gray-600">Loading your results...</div>
            ) : userResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userResults.map((result, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">
                        {/* Format the timestamp using toLocaleDateString */}
                        {new Date(result.timestamp).toLocaleDateString('en-US')}
                      </span>
                      <span className="text-sm text-gray-500">{result.file_name}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Predicted Condition
                        </h3>
                        <p className="text-blue-600">{result.predicted_class}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Confidence Level
                        </h3>
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                            <div
                              style={{ width: `${result.confidence * 100}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                            />
                          </div>
                          <span className="text-sm text-gray-600 mt-1">
                            {(result.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-4">No predictions yet</p>
                <Link
                  to="/predict"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Make Your First Prediction
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {/* CTA Section */}
      <div className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust OralCare AI for early detection and prevention
          </p>
          <Link
            to="/signin"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-300"
          >
            Start Free Analysis <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}