# Music Player

Create your playlist, Add songs to your playlist and Play favourite songs from your playlist.

Music Player App is designed to provide an online music player that serves all the requirements as mentioned above

## Getting Started

Simply, Clone the repository to your local machine 
```
git clone "Repository Name"
```
or 

Download the project zip from here and extract.

### Prerequisites

#### Requirements

Python, Pip, Django, DjangoRestFrameWork, Virtualenv

### Installing

Follow the instructions to install required software and components:-

Python

- Python 3 (Download from : https://www.python.org/)

Pip

- Download get-pip.py here : https://bootstrap.pypa.io/get-pip.py

- Install using following command :-

```
python get-pip.py
```

Install & set up a virtual environment

```
pip install virtualenv
```
```
mkvirtualenv 'EnvironmetName'
```

Install Django
- Activate virtual environment and install Django v1.11 :
```
workon "EnvironmentName"
pip install django==1.11
```
Install Django Rest Framework

```
pip install djangorestframework
```
Using the instructions above you have successfully created an environment for running app.

## Usage

### Running App On Local Machine

Follow the simple steps :

- Navigate to the project directory Music-Player

- Use following command to migrate the initial migrations :

```
python manage.py makemigrations
python manage.py migrate
```
- Create a superuser as admin  :

```
python manage.py createsuperuser
```
Enter Username, Email, Password

- Run the inbuilt python development server :-

```
python manage.py runserver 8000
```
In the browser, navigate to the url '127.0.0.1:8000'.

- To add users and songs use Admin Interface

App uses inbuilt admin interface, so navigate '127.0.0.1:8000/admin' and enter superuser login details.

- Add Users, Add Songs

- Navigate to '127.0.0.1:8000', enter user details and login to access playlist of the user. 
