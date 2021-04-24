# The Skiles Index

## Overview

The Skiles Index is a web application that provides information on popular
stocks.
This information will come in the form of stock graphs and tables containing
key technical indicators.
Beyond offering relevant market data,
the application serves as a platform that provides investing educational
material by presenting relevant links and reference material for the basics of
financial literacy and investment strategies.
The Skiles Index provides a centralized site for users to learn the basics of
interpreting market trends and understand the basics of investing.

## Description

This repository contains the source code for both the backend and frontend of
The Skiles Index app.
They are located in the
[`backend/`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/backend)
and
[`frontend/`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/frontend)
subdirectories, respectively.


### Backend
The backend is created in [Python](https://www.python.org/) using the
[Django](https://www.djangoproject.com/) web framework and connects
to a [PostgreSQL](https://www.postgresql.org/) for caching stock data as well as
storing user account
information.

The
[`backend/TSIbackend/TSIbackend/`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/backend/TSIbackend/TSIbackend)
folder contains a couple files of interest.
The
[`settings.py`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/backend/TSIbackend/TSIbackend/settings.py)
contains important constants used throughout the application and also imports
constants from `skiles_secrets.py` (See below).
The
[`urls.py`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/backend/TSIbackend/TSIbackend/urls.py)
file defines endpoints for the API and references the functions that handle
requests at the specified endpoints.

The
[`backend/TSIbackend/api/`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/backend/TSIbackend/api)
folder also contains some important files as well as the main functions that
handle specific requests.
The
[`models.py`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/backend/TSIbackend/api/models.py)
file defines the structure of many tables in the database as Django models.
The
[`serializers.py`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/backend/TSIbackend/api/serializers.py)
file defines serializers for translating between JSON and the Django models.
The
[`views.py`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/backend/TSIbackend/api/views.py)
file defines the main functions that handle all the endpoint requests.
The
[`stock_update_util.py`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/backend/TSIbackend/api/views.py)
file defines the main functions that handle retrieving data from AlphaVantage
and caching it in the database.


#### skiles_secrets.py
The
[`backend/TSIbackend/TSIbackend/`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/backend/TSIbackend/TSIbackend)
directory should contain a `skiles_secrets.py` file that contains important
repository secrets in the form of python variables that are used by the backend.
This file should NOT be committed to the repository and should be kept
confidential.
The file should define the variables below:

```python
SECRET_KEY = '<Django secret key>'

DB_USER = '<Username for the skilesindex database>'
DB_PASSWORD = '<Password for the skilesindex database user>'

ALPHA_VANTAGE_API_KEY = '<Alpha Vantage API key>'
```

Note: Certain special characters in the `DB_PASSWORD` field may break
connections in production.
Stick with alphanumeric passwords for the database.

### Environment Variables (For Deployment)
The `DEBUG` environment variable should be specified in production and set to
false to disable Django's development mode.

### Linting and Coding Style
The backend follows the
[Google Python Style Guide](https://google.github.io/styleguide/pyguide.html).
An auto-formatter such as [yapf](https://github.com/google/yapf) is recommended.


## Frontend
The frontend is created in [JavaScript](https://www.javascript.com/) using the
[React](https://reactjs.org/) framework and sends requests to the backend for
getting stock information and user account information.

The
[`frontend/src/components/`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/frontend/src/components)
folder contains the main function definitions
for retrieving stock data from the backend as well as displaying the stock data
as charts.

The
[`frontend/src/pages/`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/frontend/src/pages)
folder contains the templates and functions for each page of the site.

The
[`frontend/src/App.js`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/frontend/src/App,js)
file defines the routes for the app and associates URLs with their corresponding
pages.

### Environment Variables (For Building)
* `CI`: should be set to `false` when building at least until all tests are
implemented.
* `REACT_APP_API_HOST`: should be set to the root URL of the backend app.
* `DISABLE_ESLINT_PLUGIN`: should be set to `true` until all eslint related
  errors have been fixed.

### Linting and Coding Style
The frontend follows the
[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html).
An auto-formatter/linter such as [eslint](https://eslint.org/) is recommended.


## Requirements

### Backend
Ensure [Python3](https://www.python.org/) is installed on your machine.
It is recommended to use `venv`.

To install the requirements for this project, run the following command:

```sh
$ pip3 install -r requirements.txt
```

#### Using a Virtual Environment

A virtual environment can be used for installing packages locally to avoid
versioning issues with other projects on your machine.

`venv` is a simple virtual environment package.
To setup `venv`, run the following commands

```sh
$ python3 -m venv ./venv
$ ./venv/scripts/activate
```

### Frontend
Ensure [Node.js](https://nodejs.org/en/) is installed on your machine.

In the frontend project directory, run:

```sh
$ npm install
```


## Running/Building the App

### Backend
After installing the backend requirements from above, the backend can be started
by running the following from the
[`backend/TSIbackend`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/backend/TSIbackend)
directory:
```sh
$ python manage.py runserver
```

By default, the app will run in development mode and be accessible at
<http://127.0.0.1:8000/>.


### Frontend
#### Testing
After installing the frontend requirements from above, the frontend can be
started in development mode by running the following from the
[`frontend/`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/frontend)
directory:
```sh
$ npm start
```

By default, the app will run in development mode and be accessible at
<http://localhost:3000>.

#### Building
The app can be built for production by running the following from the
[`frontend/`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/frontend)
directory:
```sh
$ npm start build --if-present
```

The built app will be available in the `frontend/build` directory.


## CI/CD
This repository has CI/CD setup which automatically deploys the backend to
a Google Cloud App Engine instance and the frontend to another Google Cloud
App Engine instance.
The frontend is first built before deployment.
The backend deployment configuration is specified by the
[`app.yaml`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/backend/TSIbackend/app.yaml)
file.
The frontend deployment configuration is specified by the
[`app.yaml`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/frontend/app.yaml)
file.
The CI/CD also deploys the
[`dispatch.yaml`](https://github.com/FPU-Spring-2021-CEN4010/TheSkilesIndex/tree/master/dispatch.yaml)
file which defines the custom domains through which both the backend and
frontend can be reached.


## 3rd Party Libraries

### Backend

#### Django
The backend uses mainly the [Django](https://www.djangoproject.com/) web
framework which handles the low-level handling and routing of requests,
object-relational mapping for the database, and serializing of the database
models.
Django takes care of all of the lower-level web server implementation details
allowing us to focus more on the business logic of the project.

#### alpha-vantage
The [`alpha-vantage`](https://github.com/RomelTorres/alpha_vantage) Python
library is simply a wrapper for making HTTP calls to Alpha Vantage's API
endpoints.
The library simplifies making requests by allowing us to just have to specify
the API key and parameters for filtering the data to retrieve data from the
endpoint as a Python dictionary.

### Frontend
#### React
The frontend uses mainly the [React](https://reactjs.org/) framework which
simplifies creating user interfaces using a more declarative and component-based
paradigm.
React allows using HTML templates which significantly simplifies the displaying
of data.

#### Bootstrap
The frontend also uses [Bootstrap](https://getbootstrap.com/) for simplifying
the design of the UIs by being able to use pre-designed controls.

#### Axios
The frontend relies on [Axios](https://github.com/axios/axios) as an
asynchronous promise-based client for making HTTP requests to the backend more
easily.
The library handles a lot of the HTTP request creation, sending, and response
while letting us focus on where the request is being sent, what is being sent in
the request, and what is being returned.

#### CanvasJS
Finally, the frontend uses [CanvasJS](https://canvasjs.com/) as library for
visualization and displaying graphs.
CanvasJS handles displaying the graphs we want in the format we want while we
can focus on telling it what data we want graphed and how we want it graphed.


## License

This project is licensed under the GPLv3 license.

