FROM python:3.9.6-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PPYTHONENCODING utf-8

WORKDIR /backend
RUN mkdir media

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev \
    && apk add jpeg-dev zlib-dev libjpeg \
    && pip install Pillow && apk add libffi-dev

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /backend/entrypoint.sh
RUN chmod +x /backend/entrypoint.sh

COPY . .