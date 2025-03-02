FROM python:3.11

COPY python_shared/ /app/python_shared
COPY notifications_consumer/ /app/notifications_consumer

WORKDIR /app/notifications_consumer

RUN pip install --no-cache-dir -r requirements.txt

ARG DEBUG
ARG SECRET_KEY
ARG DATABASE_URL
ARG EMAIL_API_KEY
ARG EMAIL_SENDER
ARG TELEGRAM_BOT_TOKEN

ENV DEBUG=$DEBUG
ENV SECRET_KEY=$SECRET_KEY
ENV DATABASE_URL=$DATABASE_URL
ENV EMAIL_API_KEY=$EMAIL_API_KEY
ENV EMAIL_SENDER=$EMAIL_SENDER
ENV TELEGRAM_BOT_TOKEN=$TELEGRAM_BOT_TOKEN


CMD ["python", "consumer.py"]
