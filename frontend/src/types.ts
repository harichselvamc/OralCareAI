export interface User {
  username: string;
}

export interface AuthResponse {
  message: string;
}

export interface PredictionResponse {
  predicted_class: string;
  confidence: number;
}

export interface PredictionResult {
  file_name: string;
  predicted_class: string;
  confidence: number;
  timestamp: string;
}