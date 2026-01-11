from pydantic import BaseModel
from typing import List, Tuple

class TrainRequest(BaseModel):
    """
    This class is used to request the training data for the capacity linear forecaster.
    """
    data: List[Tuple[int, float]]

class TrainResponse(BaseModel):
    """
    This class is used to response the training data for the capacity linear forecaster.
    """
    slope: float
    intercept: float