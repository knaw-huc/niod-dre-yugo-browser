FROM python:3.12.3-bookworm

RUN apt-get update &&\
	apt-get -y dist-upgrade &&\
	apt-get -y install vim curl

RUN curl -LsSf https://astral.sh/uv/install.sh | sh

RUN mkdir -p /app
WORKDIR /app

COPY ./configs configs
COPY ./procrustus-indexer procrustus-indexer
COPY *.sh .
RUN chmod +x *.sh
COPY main.py .
COPY pyproject.toml .
COPY README.md .

ENTRYPOINT [ "tail", "-f", "/dev/null" ]