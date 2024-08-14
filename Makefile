setup_backend:
	pip install pipenv --user
	pipenv install

setup_frontend:
	cd frontend; npm i

setup:
	make -j 2 setup_backend setup_frontend

migrate:
	cd backend; python manage.py migrate

start_backend:
	cd backend; python manage.py runserver

start_frontend:
	cd frontend; npm run dev

start:
	make -j 2 start_frontend start_backend