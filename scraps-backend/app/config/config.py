import os
from dotenv import load_dotenv

load_dotenv()  # 

# ENVIRONMENT VARIABLES
DATABASE_URL = os.getenv("DATABASE_URL")
