from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.engine import CapacityLinearForecaster
from app.schemas import TrainRequest, TrainResponse

app = FastAPI()

# CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)
forecaster = CapacityLinearForecaster()

@app.post("/train")
def train(request: TrainRequest) -> TrainResponse:
    forecaster.train(request.data)
    return TrainResponse(slope=forecaster.slope, intercept=forecaster.intercept)