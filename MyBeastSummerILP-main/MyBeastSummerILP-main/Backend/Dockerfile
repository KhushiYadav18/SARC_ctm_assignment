FROM python:3
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /Backend/
RUN pip install --upgrade pip
RUN pip install poetry
RUN poetry config virtualenvs.create false
COPY poetry.lock pyproject.toml ./
RUN poetry install --no-dev
RUN pip install django django-cors-headers
COPY wsgi-entrypoint.sh ./
COPY . ./
CMD ["poetry", "run", "python", "manage.py", "runserver" , "0.0.0.0:8000"]