# from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Form
# from fastapi.responses import JSONResponse
# from pydantic import BaseModel
# from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime, Float
# from sqlalchemy.orm import sessionmaker, relationship, Session
# from sqlalchemy.ext.declarative import declarative_base
# from datetime import datetime
# import tensorflow as tf
# import numpy as np
# from PIL import Image
# import logging
# from fastapi.middleware.cors import CORSMiddleware

# # FastAPI setup
# app = FastAPI()

# # Middleware for handling CORS
# from fastapi.middleware.cors import CORSMiddleware

# # Allow requests from your frontend (React app)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # You can add more origins if needed
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
#     allow_headers=["*"],  # Allow all headers
# )

# # Database setup using SQLAlchemy
# DATABASE_URL = "sqlite:///./test.db"
# engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()

# # Define models for SQLite (users and results)
# class User(Base):
#     __tablename__ = "users"
#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, unique=True, index=True)
#     hashed_password = Column(String)

#     results = relationship("PredictionResult", back_populates="user")  # Relationship for results

# class PredictionResult(Base):
#     __tablename__ = "results"
#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, ForeignKey("users.username"))  # Link with username instead of user_id
#     file_name = Column(String)
#     predicted_class = Column(String)
#     confidence = Column(Float)
#     timestamp = Column(DateTime, default=datetime.utcnow)

#     user = relationship("User", back_populates="results")

# # Create database tables
# Base.metadata.create_all(bind=engine)

# # TensorFlow model loading
# model = tf.keras.models.load_model('oral_disease_model.keras')

# # Define class labels
# class_labels = {
#     "0": "Bruxism",
#     "1": "Cavities",
#     "2": "Dental caries (tooth decay)",
#     "3": "Edentulism (total tooth loss)",
#     "4": "Periodontal (gum) disease",
#     "5": "Thrush",
#     "6": "Tooth discoloration"
# }

# # Pydantic models for request and response validation
# class SignupRequest(BaseModel):
#     username: str
#     password: str

# class SigninRequest(BaseModel):
#     username: str
#     password: str

# class PredictionResponse(BaseModel):
#     predicted_class: str
#     confidence: float

# class ImagePredictionRequest(BaseModel):
#     username: str  # Username will be used as user_id
#     file_name: str = 'Unknown'

# # Helper functions
# def preprocess_image(image_file: UploadFile):
#     """Preprocess uploaded image file for model prediction."""
#     img = Image.open(image_file.file)
#     img = img.resize((150, 150))  # Resize to match model input
#     img_array = np.array(img)
#     img_array = np.expand_dims(img_array, axis=0) / 255.0
#     return img_array

# # Dependency to get the database session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # Routes

# @app.post("/signup")
# def signup(request: SignupRequest, db: Session = Depends(get_db)):
#     """Sign up new user with unique username."""
#     # Check if the username already exists in the database
#     existing_user = db.query(User).filter(User.username == request.username).first()
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Username already taken")

#     # Create a new user
#     user = User(username=request.username, hashed_password=request.password)
#     db.add(user)
#     db.commit()
#     db.refresh(user)

#     return JSONResponse(status_code=201, content={"message": "User created successfully"})

# @app.post("/signin")
# def signin(request: SigninRequest, db: Session = Depends(get_db)):
#     """Sign in existing user."""
#     user = db.query(User).filter(User.username == request.username).first()
#     if user and user.hashed_password == request.password:
#         return JSONResponse(status_code=200, content={"message": "Signin successful"})
#     raise HTTPException(status_code=401, detail="Invalid credentials")

# @app.post("/predict")
# async def predict(
#     image: UploadFile = File(...),
#     username: str = Form(...),  # Accept username as a form field
#     file_name: str = 'Unknown',
#     db: Session = Depends(get_db)  # Correctly use the db session here
# ):
#     try:
#         # Check if the user exists in the database by username
#         user = db.query(User).filter(User.username == username).first()
#         if not user:
#             raise HTTPException(status_code=404, detail="User not found")

#         # Preprocess the image
#         img_array = preprocess_image(image)
        
#         # Run the model to get the prediction
#         prediction = model.predict(img_array)
#         predicted_class_index = str(np.argmax(prediction))
#         confidence = float(np.max(prediction))

#         # Map the predicted index to a class name
#         predicted_class_name = class_labels.get(predicted_class_index, "Unknown class")

#         # Save the prediction result to the database using the username
#         result = PredictionResult(
#             username=username,  # Use username as foreign key here
#             file_name=file_name,
#             predicted_class=predicted_class_name,
#             confidence=confidence
#         )
#         db.add(result)
#         db.commit()
#         db.refresh(result)

#         # Return the prediction result
#         return {
#             "predicted_class": predicted_class_name,
#             "confidence": confidence
#         }
    
#     except Exception as e:
#         logging.error(f"Error during prediction: {e}")
#         raise HTTPException(status_code=500, detail="Internal Server Error. Please try again later.")

# from datetime import datetime

# @app.get("/results/{username}")
# def get_results(username: str, db: Session = Depends(get_db)):
#     try:
#         # Check if the user exists in the database by username
#         user = db.query(User).filter(User.username == username).first()
#         if not user:
#             raise HTTPException(status_code=404, detail="User not found")

#         # Get the prediction results for the user
#         results = db.query(PredictionResult).filter(PredictionResult.username == username).all()

#         if not results:
#             return JSONResponse(status_code=200, content={"message": "No results found for this user"})

#         # Format the results to return them
#         result_list = [
#             {
#                 "file_name": result.file_name,
#                 "predicted_class": result.predicted_class,
#                 "confidence": result.confidence,
#                 "timestamp": result.timestamp.isoformat() if isinstance(result.timestamp, datetime) else str(result.timestamp)
#             }
#             for result in results
#         ]
#         print(result_list)

#         return JSONResponse(status_code=200, content={"results": result_list})

#     except Exception as e:
#         logging.error(f"Error fetching results for {username}: {e}")
#         raise HTTPException(status_code=500, detail="Internal Server Error")
from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import sessionmaker, relationship, Session
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import torch
import timm
import numpy as np
from PIL import Image
import logging
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import torch
import torch.nn as nn
import timm
import torch.nn.functional as F

# FastAPI setup
app = FastAPI()

# Middleware for handling CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # You can add more origins if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Database setup using SQLAlchemy
DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
# Pydantic models for request and response validation
class SignupRequest(BaseModel):
    username: str
    password: str

class SigninRequest(BaseModel):
    username: str
    password: str

# Define models for SQLite (users and results)
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    results = relationship("PredictionResult", back_populates="user")  # Relationship for results

class PredictionResult(Base):
    __tablename__ = "results"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, ForeignKey("users.username"))  # Link with username instead of user_id
    file_name = Column(String)
    predicted_class = Column(String)
    confidence = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="results")

# Create database tables
Base.metadata.create_all(bind=engine)

# PyTorch model loading
import torch
import torch.nn as nn
import timm
import torch
import timm
import torchvision.transforms as transforms
from PIL import Image
import torch.nn as nn
from fastapi import FastAPI, File, UploadFile
from io import BytesIO
import uvicorn

# Define the InceptionResNetV2 model
class InceptionResNetV2(nn.Module):
    def __init__(self, num_classes):
        super(InceptionResNetV2, self).__init__()
        self.model = timm.create_model('inception_resnet_v2', pretrained=True)
        in_features = self.model.classif.in_features
        self.model.classif = nn.Linear(in_features, num_classes)  # Adjusting the final layer

    def forward(self, x):
        return self.model(x)

# Load the PyTorch model
def load_model(model_path):
    model = InceptionResNetV2(num_classes=6)  # Adjust the number of classes as needed
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))  # Ensure it loads on the CPU
    model.eval()  # Set the model to evaluation mode
    return model

# Define class labels (adjust this based on your model)
class_names = [
    'Calculus',
    'Gingivitis',
    'Caries',
    'Ulcers',
    'Hypodontia',
    'Tooth Discoloration'
]

# Preprocessing for the test image
test_transforms = transforms.Compose([
    transforms.Resize((299, 299)),  # Inception models expect 299x299 images
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])  # Standard normalization for Inception
])

# Helper function to preprocess image and predict
def preprocess_and_predict(image_file: UploadFile, model):
    img = Image.open(image_file.file)
    img_tensor = test_transforms(img).unsqueeze(0)  # Add batch dimension
    with torch.no_grad():
        outputs = model(img_tensor)  # Forward pass
    
    probabilities = torch.nn.functional.softmax(outputs, dim=1)
    predicted_class_idx = torch.argmax(probabilities, dim=1).item()
    confidence_score = probabilities[0, predicted_class_idx].item()

    predicted_class = class_names[predicted_class_idx]
    return predicted_class, confidence_score

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Load model when the server starts
model = load_model('crossVIT_transformer_oral_disease_classifier.pth')

# Routes

@app.post("/signup")
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    """Sign up new user with unique username."""
    existing_user = db.query(User).filter(User.username == request.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")

    user = User(username=request.username, hashed_password=request.password)
    db.add(user)
    db.commit()
    db.refresh(user)

    return JSONResponse(status_code=201, content={"message": "User created successfully"})

@app.post("/signin")
def signin(request: SigninRequest, db: Session = Depends(get_db)):
    """Sign in existing user."""
    user = db.query(User).filter(User.username == request.username).first()
    if user and user.hashed_password == request.password:
        return JSONResponse(status_code=200, content={"message": "Signin successful"})
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/predict")
async def predict(
    image: UploadFile = File(...),
    username: str = Form(...),  # Accept username as a form field
    file_name: str = 'Unknown',
    db: Session = Depends(get_db)  # Correctly use the db session here
):
    try:
        # Check if the user exists in the database by username
        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Preprocess the image and get prediction
        predicted_class, confidence = preprocess_and_predict(image, model)

        # Save the prediction result to the database using the username
        result = PredictionResult(
            username=username,  # Use username as foreign key here
            file_name=file_name,
            predicted_class=predicted_class,
            confidence=confidence
        )
        db.add(result)
        db.commit()
        db.refresh(result)

        # Return the prediction result
        return {
            "predicted_class": predicted_class,
            "confidence": confidence
        }
    
    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error. Please try again later.")

@app.get("/results/{username}")
def get_results(username: str, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        results = db.query(PredictionResult).filter(PredictionResult.username == username).all()

        if not results:
            return JSONResponse(status_code=200, content={"message": "No results found for this user"})

        result_list = [
            {
                "file_name": result.file_name,
                "predicted_class": result.predicted_class,
                "confidence": result.confidence,
                "timestamp": result.timestamp.isoformat() if isinstance(result.timestamp, datetime) else str(result.timestamp)
            }
            for result in results
        ]
        return JSONResponse(status_code=200, content={"results": result_list})

    except Exception as e:
        logging.error(f"Error fetching results for {username}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
