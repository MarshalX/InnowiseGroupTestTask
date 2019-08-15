FROM python:3.7-alpine

RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev jpeg-dev zlib-dev

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . /app
WORKDIR app

RUN chmod +x docker-entrypoint.sh
CMD ["sh", "docker-entrypoint.sh"]
