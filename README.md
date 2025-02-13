# OralCare AI

## OralCare AI is a web-based platform that utilizes machine learning and AI algorithms to detect various oral health conditions from images. The system provides accurate and quick predictions for conditions like bruxism, cavities, gum disease, and more.

### Problem:
- Oral health issues often go unnoticed in the early stages. Traditional diagnosis can be time-consuming and requires visits to dental professionals.

### Solution:
- OralCare AI leverages advanced machine learning models to provide instant, accurate oral health predictions from dental images. The platform also maintains user history for tracking and follow-up.

## Installation & Running the Application

1. Clone the repository:
   ```
   git clone https://github.com/harichselvamc/OralCareAI.git
   cd OralCareAI
   ```

3. Set up the Frontend:
   - Navigate to the `frontend` folder:
``` cd frontend ```
   - Install dependencies:
   ```  npm install ```
   - Start the frontend server:
   ```  npm run dev```

4. Set up the Backend:
   - Open another terminal and navigate to the `backend` folder:
    ``` cd backend ```
   - Install required Python dependencies:
 ```    pip install -r requirements.txt ```
   - Run the FastAPI backend server:
  ```   uvicorn main:app --reload ```

# How It Works:

- Frontend: Built with React, it provides the UI to upload dental images and view prediction results.
- Backend: FastAPI handles API requests. The AI model is based on PyTorch and predicts various oral health conditions based on the uploaded images.

# Problem & Solution

Problem:  
Detecting oral health conditions early is difficult without professional assistance.

Solution:  
OralCare AI leverages machine learning to provide instant detection and diagnosis of common oral conditions, directly from images.

Contact

For any issues or contributions, please contact [harichselvamc@gmail.com].
