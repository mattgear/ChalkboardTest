# ChalkboardTest

This is an API to serve as a backend phone book app for a Chalkboard Coding Challenge.

The required set up for the database is:
Create and add your connection details to a .env file in the main directory
An example of the contents is:
DB_HOST=localhost
DB_PORT=5432
DB_USER=user
DB_DATABASE=database
DB_PASSWORD=password

Create a new schema to hold the data in by running SQL:
'CREATE SCHEMA chalkboard';

Create a table in your schema with the following sql
CREATE TABLE chalkboard.contacts (
name varchar(20) PRIMARY KEY,
phone_work varchar(15),
phone_home varchar(15),
phone_mobile varchar(15),
phone_other varchar(15),
email_address varchar(15) NOT NULL,
mailing_address varchar(20) NOT NULL,
UNIQUE(email_address)
);

Each name and email_address should be unique.
We will require the user to only fill in one phone field, hence leaving out the 'NOT NULL' statements for those Fields.
Multiple users from the same household can sign up.

Example Query to find a list of contacts:
query {
contactList {
name
phone_work
phone_home
phone_mobile
phone_other
email_address
mailing_address
}
}
