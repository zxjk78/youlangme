FROM python:3.8

RUN pip3 install django

WORKDIR /home/ssafy/youlangme

COPY . .

WORKDIR ./matchmaking_server

CMD ["python3", "manage.py", "runserver", "--noreload"]

EXPOSE 8000