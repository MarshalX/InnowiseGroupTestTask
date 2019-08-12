FROM python:3.7-alpine

RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev jpeg-dev zlib-dev
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY InnowiseGroupTestTask ./app
WORKDIR app

RUN chmod +x /app/docker-entrypoint.sh
