FROM python:3.7-alpine

RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev jpeg-dev zlib-dev

COPY requirements.txt .
COPY requirements-dev.txt .
RUN pip install -r requirements.txt && \
    pip install -r requirements-dev.txt
