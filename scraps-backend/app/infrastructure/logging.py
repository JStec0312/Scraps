import logging
from logging.config import dictConfig


LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "format": "[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s",
        },
    },
    "handlers": {
        "default": {
            "class": "logging.StreamHandler",
            "formatter": "default",
        },
    },
    "loggers": {
        "app": {
            "handlers": ["default"],
            "level": "INFO",
        },
        "sqlalchemy.engine": {
            "handlers": ["default"],
            "level": "WARNING",
        },
    },
}

def setup_logging():
    dictConfig(LOGGING_CONFIG)


def get_logger(name: str):
    return logging.getLogger(name)
