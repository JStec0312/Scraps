import os
from dotenv import load_dotenv

load_dotenv()  # 

# ENVIRONMENT VARIABLES
DATABASE_URL = os.getenv("DATABASE_URL")
DOMAIN = os.getenv("DOMAIN", "http://localhost:8000")