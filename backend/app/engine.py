import numpy as np
from typing import List, Tuple

class CapacityLinearForecaster:
    """
    This class is used to forecast the capacity of the system based on the user traffic.
    """
    def __init__(self):
        self.slope = 0.0
        self.intercept = 0.0

    def train(self, data: List[Tuple[int, float]]):
        user_traffic = np.array([point[0] for point in data]) # feature, in this casse we only have 1
        cpu_usage = np.array([point[1] for point in data]) # target

        mean_user_traffic = np.mean(user_traffic)
        mean_cpu_usage = np.mean(cpu_usage)

        numerator = (user_traffic - mean_user_traffic) * (cpu_usage - mean_cpu_usage)
        denominator = (user_traffic - mean_user_traffic) ** 2

        sum_denom = np.sum(denominator)
        if sum_denom == 0:
            self.slope = 0.0 # No trend possible if X never changes
        else:
            self.slope = np.sum(numerator) / sum_denom

        # b = mean(y) - (m * mean(x))
        self.intercept = mean_cpu_usage - (self.slope * mean_user_traffic)