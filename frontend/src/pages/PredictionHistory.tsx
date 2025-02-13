// src/pages/PredictionHistory.tsx

import React, { useState, useEffect } from 'react';
import { getUserResults } from '../api'; // Adjust the import if needed
import { ChevronRight, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PredictionResult } from '../types';

const PredictionHistory = () => {
  const [userResults, setUserResults] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchResults = async () => {
      if (username) {
        setLoading(true);
        try {
          const response = await getUserResults(username);
          console.log('Results fetched:', response); // Check the structure of the response
          setUserResults(response.results || []); // Assuming 'results' is the key in the response object
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
      {/* Prediction History Section */}
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

          {/* Check if loading */}
          {loading ? (
            <div className="text-center text-gray-600">Loading your results...</div>
          ) : (
            <>
              {/* Check if there are any results */}
              {userResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userResults.map((result, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">
                          {new Date(result.timestamp).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-gray-500">{result.file_name ?? 'Unknown'}</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Predicted Condition
                          </h3>
                          <p className="text-blue-600">{result.predicted_class ?? 'No prediction'}</p>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionHistory;
