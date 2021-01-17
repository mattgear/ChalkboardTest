# ChalkboardTest

This is an API to serve as a backend phone book app for a Chalkboard Coding Challenge.
Contact details: Matt Gear - matt.gear@live.co.uk - https://github.com/mattgear

## Project set up

1. Clone the repository and run 'npm install'
2. Follow the steps below to ensure your database is set up

## Database set up

The required set up for the database is:

1. Create and add your connection details to a .env file in the main directory. Note keep the secret as 'secret'.
   An example of the contents is, please change to match your db setup.
   DB_HOST=localhost  
   DB_PORT=5432  
   DB_USER=user  
   DB_DATABASE=database  
   DB_PASSWORD=password
   JWT_SECRET='secret'

2. Create a new schema to hold the data in by running SQL:  
   'CREATE SCHEMA chalkboard';

3. Create a table in your schema with the following sql  
   CREATE TABLE chalkboard.contacts (  
    name varchar(20) PRIMARY KEY,  
    phone_work varchar(15),  
    phone_home varchar(15),  
    phone_mobile varchar(15),  
    phone_other varchar(15),  
    email_address varchar(15) NOT NULL,  
    mailing_address varchar(100) NOT NULL,  
    UNIQUE(email_address)  
   );

Each name and email_address should be unique.  
We will require the user to only fill in one phone field, hence leaving out the 'NOT NULL' statements for those Fields.  
Multiple users from the same household can sign up.

## Query a contact

Example basic query to find a list of contacts:  
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

With sorting and pagination
query {  
 contactList (
sort: {
field: NAME
direction: DESC
}
pagination: 1
) {
name  
 phone_work  
 phone_home  
 phone_mobile  
 phone_other  
 email_address  
 mailing_address  
 }  
}

## Authenticate a query

For simiplicity I user generic { data: "user" } to the TokenQuery, rather than checking a users credentials.  
Example query to get a token for authentication:  
query {  
 token  
}

I am leaving off authentication from Querying a contact to mock a read only access. But will include it on any Create, update, delete action.

## Create a contact

To create a contact you will need to have generated a token.  
An example query is:  
mutation {  
 createContact(  
 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidXNlciIsImlhdCI6MTYxMDkwODM0NSwiZXhwIjoxNjEwOTExOTQ1fQ.ehtmVnmECRdaEVvM6vRUR02EZsA6OnUzImUQIPzep5A"  
 newContact: {  
 name: "Matt"  
 phone_work: "07527244951"  
 email_address: "matt@test.com"  
 mailing_address: "16 House, Notts, NG55 5ED"  
 }  
 ) {  
 contact {  
 name  
 phone_work  
 email_address  
 mailing_address  
 }  
 }  
}

## Notes on tests

In order to get the ContactMutation Tests to work a valid token must be put into the file. This is obviously not ideal and if I had more time would
rework the resolver such that I could test without this.  
I would also wire tests to a test DB instead of having them connected to dev.
Furthermore after re-working the ContactQuery I would need to amend the tests for that but have ran out of time.
