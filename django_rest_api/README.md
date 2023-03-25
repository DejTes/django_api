
# Intro to Django

![](https://i.imgur.com/l5FQzMh.png)


## Setup

### Why Virtual Environment? 
First things first, we want to create a space like our package.json in NodeJS, where all the dependencies we install will be "stored" and version controlled. Creating a blueprint of sorts for our app, a bubble that keeps all of the technologies we used to build it as **constants**. If we built it with Mongoose 6.8, Django 4.1.7 etc...if someone was to clone it down and start it up, there's a roadmap for everything it was made with and therefore it's optimized to run the way we built it. 

If we decide to come back to it years later, it will still run like it did when we made it. If someone else clones it down and starts it up, they will be running it with what we built it with. As you saw in NodeJS, one project can be using 5-10-20+ different third-party packages. As those get updated, they will conflict with other things. We're also (on our machine) trying to stay away from global pollution (global installations of software) as much as we can. Global variables in an app can cause issues and so can global installations on a machine. So, the best thing to do is to try to install everything locally (i.e. within an npm or a venv) within our app. In Python apps, we do that with a virtual environment. 

### Global Installations and PIP

Let's take a look at what Python dependencies we have installed globally on our machine so far....

Python has it's own "package manager" (like Node with NPM) called `pip`. 

In Terminal: let's type in `pip list`. As you can see, I have a lot of packages installed globally. You may not, but nevertheless you want to keep this list as short as you can to avoid any potential conflict from these independent programs. 


## Using VENV to make a Virtual Enviroment

We are going to use a module that comes installed with Python called `venv` to make our virtual environment. 

In Matt's markdown, he makes a folder in the root directory called `ga-env`. You could do that and I know why he's doing that, to introduce you to a venv. But best practice is to put your venv folder inside of the project you're working n. 

In Terminal, create and navigate to `student_examples` folder. Inside of that folder, let's run the following command: `python3 -m venv py_env`. You will see a folder called `py_env` appear in the folder. Inside of that are a few other folders, let's to go the folder called `bin` and take a look. 

Inside of there you will see aliases (or shortcuts) to our installations (and executables) to Python. The next command we will run will `source` these files, which basically means OPEN...it an execute command that activates everything we have set up inside of our environment (shell). So far that's just Python (the current version we have installed on our machine (mine is 3.11).

In Terminal: `source py_env/bin/activate`

You will see (py_env) pop up in your command prompt. This means you are now in the development environment and that anything you do/install while in this venv will stay in the venv. "What happens in py_env, stays in py_env". And even if you navigate to other folders, you will stay inside of it until you type `deactivate`. Let's type in `pip list` again to see the difference. And there we go...


> ❗**NOTE**: You WILL have to run `source py_env/bin/activate` every time you create a new terminal window.  And since it's located in your student_examples folder, you will need to be in it as while since that's the path name. If you want, you can put a shortcut into your terminal profile (called an alias). An alias allows you to make one-word commands for common or long commands. [Making an alias](https://medium.com/fbdevclagos/using-zsh-aliases-for-better-terminal-experience-6f16f261ad52). 

For now, let's go ahead and close out VSCode and re-open it so our root directory is student_examples (i.e. where we installed our py_env)


## Install Django - Create Django Project

Let's install Django: 

```console
python -m pip install Django
```

Let's create a new Django project by running Django's version of "create-react-app". Be advised of a few things:
- We will be creating a Restful API (backend) using Django
- Django can also be used to make a full-stack app (frontend and backend), but today/tomorrow we will be using it to make a backend for a simple address book
- We will be installing a package called *Django Rest Framework* (like a Postman webpage) which will allow us to interact with our the database and to test our API
- Django Rest Framework will also be a helper tool that will allows us to set up two "routes" that will be our CRUD routes
- We will not be making a frontend with Django, however it would be quite easy to add HTML pages onto what we are building now and make your entire app with Django.


Let's create our Django project:
 
```console
django-admin startproject django_rest_api
```

## Tour of Django App 

All of this can seem intimidating at first…node does a great job of kinda hiding away everything that you don’t need to interact with where django installs all of these folders and files and lines of code (like in this settings.py)....90% of this you won’t interact with but it’s intimidating because you’re like omg…this is so much stuff! 

Basically you just learn what you need to know in order to do what you’re trying to do and over time you start to learn more about what these variables and strings are.

- `asgi.py` - web server stuff - ASGI - [Asynchronous Server Gateway Interface](https://www.infoworld.com/article/3658336/asgi-explained-the-future-of-python-web-development.html)
- `settings.py` - this is the most important file in our project. The heart of everything:


```python
INSTALLED_APPS = [
   'corsheaders',
   'rest_framework',
   'contacts_api',
   'django.contrib.admin', # gives us an admin interface to manage data
   'django.contrib.auth', # authenticates user
   'django.contrib.contenttypes',
   'django.contrib.sessions', # legacy - we don't use sessions anymore - this can be deleted
   'django.contrib.messages', # this gives one-time notifications to users
   'django.contrib.staticfiles', # manages static files
]
	
```
	
- `urls.py` - this is our router file - path should have slash at end. Then a path method. It will be collection of all of our url paths. 
	- `contacts\` path will go in here soon…
- `wsgi.py` - this has to do with hosting your site and making it where others can access it. [WSGI - Web Server Gateway Interface](https://www.toptal.com/python/pythons-wsgi-server-application-interface#:~:text=Nowadays%2C%20almost%20all%20Python%20frameworks,other%20popular%20frameworks%20do%20it.)
	


## Switching our VSCode Python Interpreter

You may see "squiggles" under some files. There's a reason for that since you are using a virtual environment, you must point VSCode to the that virtual environment (i.e. Python path). 

To do that, you will need to:
- Go all the way to the bottom of VSCode where it says the Python and the Version Number
- Click on the Version Number (3.xxx)
- Command Palette will open and "Select Interpreter" dropdown will show
- Click on the one that says `py_env/bin/python`
- Squiggles Be Gone!

[Select Environment Path - VSCode](https://code.visualstudio.com/docs/python/environments#_select-and-activate-an-environment)

## Create Contacts App

Now - let's create our "app". 

- 🤔 A Django project can contain many apps.  
	- Each app is a logical section of your project that is self-contained.  
	- Apps in Django are a bit like a controller file in Express, which contains all routes for one specific model
	- They also contain their own data model and everything that pertains to that section of our project. 

We are just making an address book where we can add, edit, delete our contacts. So, we will only have one "app" in our Django project, called `contacts`:

```console
cd django_rest_api
python manage.py startapp contacts
```

This will create an "app" called `contacts` inside of our project directory. 


## Tour of Contacts App

- `admin.py` - controls the built-in admin screen included with Django - how we want it to look 
- `apps.py` - should really be called config.py - we use this to configure our app
- `models.py` - where we define our data models. Schema, you've seen this before. It's where we put our blueprint for our data structure. 
- `tests.py` - where we make our unit tests - we won’t be using this
- `views.py` - it should really be actions.pywhere our server req/res actions will go (POST/GET ALL/ GET ONE (:ID)). 
	 	- in Django this is called a VIEW. Confusing... since a VIEW usually means something you view. And we know `views` as our HTML/EJS folder in Express.
		 
If we were using Django as our frontend too...we would have a `templates` folder where we would put our HTML.


Now that we know a basic overview of what we're looking at....let's create and connect our database!


## Create Database - Connect Postgres

Open Postgres - `psql postgres`. Create a subdatabase that our project will use:

```sql
CREATE DATABASE django_api;
```

> **NOTE**: The DB name can be whatever you want (as long as `NAME` in the next step matches what you've named it)

### Let's add our Database Info to our Django settings:

#### In `django_rest_api/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'django_api',
        'USER': '',
        'PASSWORD': '',
        'HOST': 'localhost'
    }
}
```

#### In Terminal

```console
python -m pip install psycopg2-binary
```

This installs a driver that allows Django to talk to Postgres.  It's a bit like Mongoose. 

[What is psycopg2-binary?](https://www.geeksforgeeks.org/introduction-to-psycopg2-module-in-python/?ref=rp)


## Migrations

Now we want to run a migration to set up the tables necessary to get Django working.  
- Migrations are Python files that run SQL for you, so that you don't have to write it yourself:
- This line of code puts all of our system files in the database that makes data transfer from Django to Database possible

### What are [migrations](https://docs.djangoproject.com/en/4.1/topics/migrations/) in Django?

There are several commands which you will use to interact with migrations and Django’s handling of database schema:

- migrate - responsible for applying and unapplying migrations.
- makemigrations - responsible for creating new migrations based on the changes you have made to your models.
- sqlmigrate -  displays the SQL statements for a migration.
- showmigrations - lists a project’s migrations and their status.

You should think of migrations as a version control system for your database schema. makemigrations is responsible for packaging up your model changes into individual migration files - analogous to commits - and migrate is responsible for applying those to your database.

The migration files for each app live in a “migrations” directory inside of that app, and are designed to be committed to, and distributed as part of, its codebase. You should be making them once on your development machine and then running the same migrations on your colleagues’ machines, your staging machines, and eventually your production machines.

So let's start up migrate...but we won't be using it just yet:

```console
cd django_rest_api
python manage.py migrate
```

Let's go to Postgres and take a look at our database:

`\dt` - All this stuff was just created in our database

Our database is created so let's register our `contacts` app with Django.  This is a bit like in Express when we require a file into server.js:

#### In `django_rest_api/settings.py`:

```python
INSTALLED_APPS = [
    'contacts', # add this
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
````

## Create Data Model (Schema)

Now let's create a model.  This model will help us organize our data (like a schema) to show how we would like it structured in the database. 

Data that we will be converting from Python to SQL - with the help of psycopg2-binary and our migrations functionality:

Add `contacts/models.py`:

```python
from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=32)
    age = models.IntegerField()
    def __str__(self): return self.name    	
```


You'll notice that `models.CharField` takes params like so: `max_length=32`. 
    - This is just a way to specify parameters to a function by name (as opposed to order).

***What is this function I've added at the end?** 

Well, when we look at our information in the Admin screen, it will be displayed as the value of name: "Matt", "Jim" instead of just satying just say Contact object for every contact entered.

This line of code defines a method called __str__() within the Contact model class. The __str__() method is a special method in Python that defines how an object should be represented as a string. 

In this case, when a Contact object is printed or displayed as a string (for example, in the Django admin interface), it will return the name attribute of the object as a string. So, the line of code def __str__(self): return self.name is simply defining that the string representation of a Contact object should be its name attribute.


## Make our `Contacts` database table

This takes our `Contact` data model and generates the necessary table in Postgres

But it also sets up how we are going to take tabular relational data from SQL and turn it into Python objects. 

### In Terminal

```console
python manage.py makemigrations contacts
```

Let's go take a look at what the Python end of our migration looks like by looking at the migration file created (0001). 

Now that we've seen what the Python looks like, what will our SQL look like? Let's take a look:

❗This is not a migrations step...we are just taking a look at the SQL end of it!

```console
python manage.py sqlmigrate contacts 0001
```

NOTE: If you create more migrations later on and you want to see that new migration's SQL, you'll have to update this command to the number of the new migration file that was created. 

Why would you create more migrations? The biggest reason is that you add a line to your 'schema/model' and you run `makemigrations` and `migrate` again to make that change. Make as many migrations files as you want...it will add lines/delete lines. It will delete your age data if you erase your age line from your model! 

Or You might create a whole other data model and then you would go through the same process above with that model. 

So, now we have: 

1. Set up our DB with the proper migration files
2. Created our Data Model
3. Created our Table in the Database (using our Model and makemigrations)
4. Looked at our Python model - Looked at our SQL translation

Look's good to go...Let's execute the migration using `migrate` command once again:

```console
python manage.py migrate
```
This is much like add/commit (makemigrations), push (migrate)...

Want to learn more about Migrations? Check out this [Django Migrations Primer](https://realpython.com/django-migrations-a-primer/)

So now we have added our Python/SQL translator for our contacts data. Let's test that it worked by entering some data manually.  
❗ Again, this is not a mandatory step...but it's good to check to see if it works.

### Manually entering data with the Python Shell:

#### In Terminal:

Let's open up Python's shell:

```console
python manage.py shell
```

Once it's started we are going to type out some Python to enter data. To test our migrations are working...and to show you how much heavy lifting migrations and the other helpers will be doing with data entry. 

Just to have a look at all it's going to be doing for us:

```python
from contacts.models import Contact
Contact.objects.all() # get all the contacts in the db
c = Contact(name="Matt", age=40) # create a new contact.  Note this isn't yet in the db
c.save() # save the contact to the db
c.id # check the id to make sure it's in the db
Contact.objects.all()
Contact.objects.all()[0]
Contact.objects.all()[0].name
Contact.objects.all()[0].age
quit()
```


## Django's Admin Screen

### Create user/login

Django has a really nice admin app that lets us interface with the database from the browser. 

#### In Terminal:

```console
python manage.py createsuperuser
```

When you run this it will ask you for a username and a password. Keep it simple. lowercase, your name, simple password (1111 or something)

❗ It will prompt you that your password is too simple, just override it ...(Y), doesn't matter. You can will need this info to login. 

You can delete users and create new superusers at a later time. 

#### Register our contacts app with Admin

#### In `contacts/admin.py`:

```python
from .models import Contact
admin.site.register(Contact)
```


### Starting Django

Woohoo...finally! 🥳

#### In Terminal:

```console
python manage.py runserver
```

Go to http://localhost:8000/admin/ in the browser and sign in with the credentials you created when running `python manage.py createsuperuser`.

....Let's play around with the Admin screen...add some contacts and take a look around....and see what it can do. 

Want to [customize/personalize your Admin screen](https://rajansahu713.medium.com/customization-of-django-admin-interface-312b4a3c0f84)? 


## Create API endpoints

Now, let's start working on our CRUD functionality.  We'll use a package called ***Django Rest Framework*** which allows us to easily use Django as an API.

### Install / Set Up Django Rest Framework



#### In Terminal 

```console
python -m pip install djangorestframework
```

When we install a package, we always have to add it to our Installed Apps in `settings`! 

Let's add *Django Rest Framework*. 

#### In `django_rest_api/settings.py`:

```python
INSTALLED_APPS = [
    'rest_framework',  # add this
    'contacts',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

So, now we want to create a serializer for our Contact model.  
    - What does a serializer do? It takes Python objects and converts it to JSON -- since we will nee to respond to our frontend (React) with JSON.
   
   
❔ We used something like this in Unit 3, remember? ---> express.json() middleware

Here's a flow chart on how it works / will work:

![](https://i.imgur.com/6xX1mW8.png)

*Image from [Build a Restful API with Django in 30 minutes](https://medium.com/swlh/build-your-first-rest-api-with-django-rest-framework-e394e39a482c)

SQL to Python
[Django ORM](https://opensource.com/article/17/11/django-orm) - Object Relational Mapping - (Django's migrations functionality, basically)

Python to JSON
[What is Serialization?](https://hazelcast.com/glossary/serialization/)


### Setup the Serializer

#### Create `contacts/serializers.py`

Add this in the file:

```python
from rest_framework import serializers # use rest_framework's serializer
from .models import Contact # import our Contact model

class ContactSerializer(serializers.ModelSerializer):    # ModelSerializer is a method inside of serializer
    class Meta:
        model = Contact   # tell django which model to use
        fields = ('id', 'name', 'age',)    # tell django which fields to send out
```

Don't get thrown off by the nested class (`Meta`)!  This is what DRF's documentation requires and it can't be changed/renamed, neither can the `model` and `fields` variables either. [What is Meta and why do we use it?](https://stackoverflow.com/questions/74925082/what-does-class-meta-do-in-django-and-django-rest-framework). It's complicated, explanation is linked.


### Creating Actions (Views)

Now, lets create views which will connect the serializer for Contact (`ContactSerializer`) with the `Contact` model.

### Create `contacts/views.py`:

```python
from rest_framework import generics
from .serializers import ContactSerializer
from .models import Contact

class ContactList(generics.ListCreateAPIView):
    queryset = Contact.objects.all().order_by('id')     # what are we retrieving? -- retrieve all objects from the DB, order by id ascending
    serializer_class = ContactSerializer    # tell django what serializer to use

class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all().order_by('id') -  # this is not a typo...these two are exactly alike but DRF requires it 
    serializer_class = ContactSerializer
```

- `generics.ListCreateAPIView` will be inherited by `ContactList` so that it will either display all Contacts in the DB or create a new one, depending on the request url and method
	- GET /contacts - READ
	- POST /contacts - CREATE

- `generics.RetrieveUpdateDestroyAPIView` will be inherited by `ContactDetail` so that it will either update or delete a contact in the DB, depending on the request url and method
	- GET /contacts/:id - READ one
	- PUT /contacts/:id - UPDATE
	- DELETE /contacts/:id - DELETE



❗ These variables above cannot be changed... `queryset` and `serializer_class`


## Mapping our URLs / Paths

In Django, the actions are seperate from the paths (URLs). So let's map out our URLS.

### Mapping Contact URLs:

#### Create `contacts/urls.py` and add the following:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('contacts', views.ContactList.as_view(), name='contact_list'),       # contacts will be routed to the ContactList view for handling
    path('contacts/<int:pk>', views.ContactDetail.as_view(), name='contact_detail'),     # contacts/<int:pk> will be routed to the ContactDetail view for handling
]
```

❗ **NOTE**: This is not the same as django_rest_api/urls.py.  We have a separate file just for our contacts urls for code organization purposes (This is a bit like our controller files in Express).  We *could* put everything in django_rest_api/urls.py, but this allows us to keep different parts of the app separated from each other.  This makes it more modular so that we could copy entire apps (along with their urls) to different projects


### Mapping Main URLs:


#### Edit `django_rest_api/urls.py`:

```python
from django.contrib import admin
from django.urls import path
from django.conf.urls import include # add this

urlpatterns = [
    path('', include('contacts.urls')), # add this
    path('admin/', admin.site.urls),
]
```
❗ **NOTE**: This is a bit like when we included our controller routes into server.js in Express. 


## Adding CORS 

We all remember this...backend/frontend coming from two different IP addresses (origins) will through a CORS error. Let's install a package to stop that from happening:    

#### In Terminal 

Install the `django-cors-headers` package:

```console
python -m pip install django-cors-headers
```

#### In `django_rest_api/settings.py`:

- Add to INSTALLED APPS:

```python
INSTALLED_APPS = [
    'corsheaders', # add this
    'rest_framework',
    'contacts,
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

```
- Add to MIDDLEWARE:

```python

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # this makes the cors package run for all requests.  A bit like app.use() in express
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

```

- Under and Outside of Middleware, add this line: 

```python
CORS_ALLOW_ALL_ORIGINS = True # add this
```

### Test it out in Postman

Open Postman
- GET request to localhost:8000/contacts
- Create an `Origin` header in the request
- Set it to any domain - `blahblah.com`
- Send GET Request
- In the response, check that `Access-Control-Allow-Origin` is present and set to `*` in the Headers tab.

![](https://i.imgur.com/YvWhPzl.png)


> This is OPTIONAL and EXTRA INFO - It has not been accuracy checked recently to make sure it's still valid - (3/22/23 - NM)

## Deploy to Heroku

### Locally

✔️ **NOTE**: Make sure you're running the commands below in the **root** of your Django project

Create a Heroku app from the root of your project folder and run `heroku create` in the terminal.  
- The command will randomly generate a name for you. If you want to name your app something specific, run: `heroku create urlNameYouWantHere`.
- Copy the heroku URL that was created (without the `https://`)
- Go to your `django_rest_api/settings.py` and add it into the `ALLOWED_HOSTS`

```python
ALLOWED_HOSTS = ['localhost', 'agile-earth-74098.herokuapp.com']
```

Add `dj_database_url` so that production will get the database info from environment variables:

```console
python -m pip install dj_database_url
```

At the top of `django_rest_api/settings.py`, add `import dj_database_url`:

```python
from pathlib import Path
import dj_database_url # add this
```

Further down `django_rest_api/settings.py`, make the following change:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'django_contacts',
        'USER': '',
        'PASSWORD': '',
        'HOST': 'localhost'
    }
}

db_from_env = dj_database_url.config(conn_max_age=600) # add this
DATABASES['default'].update(db_from_env) # add this
```

We need to set up static files correctly for Heroku.  

Edit `django_rest_api/settings.py` at the top to import `os`:

```python
from pathlib import Path
import dj_database_url
import os # add this

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # edit this var
```

Now edit the bottom of the same file:

```python
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') # add this
```

Install `whitenoise` to help with static files:

```
python -m pip install whitenoise
```

Edit `django_rest_api/settings.py` to include `whitenoise`

```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # add this
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage' # add this
```

Now, install gunicorn which will serve your Django code

```console
python -m pip install gunicorn
```

Create `Procfile` and add:

```python
web: gunicorn django_rest_api.wsgi
```

This will tell Heroku how to serve your app.
    
Now, run the following to create a dependencies list for heroku:

```console
python -m pip freeze > requirements.txt
```
    
### In Browser 

1. Go to your Heroku dashboard for the Heroku project you just created
1. Click on "Configure Add-Ons"
1. Search for Heroku Postgres and add it

### In Terminal

1. `git add -A`
1. `git commit -m "heroku deployment"`
1. `git push heroku main` 
1. Once it builds successfully, run `heroku run bash` 
1. While in heroku bash,  apply the migrations to the heroku project by running: `python manage.py migrate` 
1. Still in heroku bash, create a superuser for the heroku project by running `python manage.py createsuperuser` and follow the prompts
    - To exit heroku bash, run `exit`

### In Browser 

1. After the migrations finish, you should now be able to open the heroku app in your browser to see the Django REST interface!
    - Don't forget to go to `/api/contacts`
1. Remember that your heroku database is separate from your local database, so there should not be any data on the first load. 
    - You can add data by logging in with the heroku superuser you created
1. You can now use this deployed version as your backend API
