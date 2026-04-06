Student: Esteban Sarmiento
Course: CSE 340

Proejct:
# ces340-woodtrack

This is my final project for the CSE 340 Web Backend Development class.

WoodTrack is a simple web application focused on woodworking. The main idea of this project is to allow users to submit and keep track of custom build requests.

I created this project to practice the main concepts from this course, such as working with Express, connecting to a PostgreSQL database, using EJS templates, and building login and role-based features.

Users can create an account, log in, and submit their own custom build requests. Each user can see their own requests in their dashboard. There is also an admin role that can view all requests, update their status, and manage user accounts.

Technologies planned:
- Node.js  
- Express  
- EJS  
- PostgreSQL  
- Render  

Database Overview
    This project uses two main tables:
    users:
        - id
        - name
        - email
        - password (stored securely with bcrypt)
        - role

    requests:
        - request_id
        - request_title
        - request_description
        - request_status
        - user_id (linked to users table)
        - created_at

    Each reuest is ocnneted to a user, so one user can have multiples requests.

User Roles
    user(client)
        - Create an account and log in
        - Submit custom build requests
        - View their own requests on the dashboard

    admin
        - Access the admin dashboard
        - View all requests from all users
        - Update request status (submitted, in progress, completed)
        - Edit and delete user accounts

___________________________________________

Test Account Credentials

Use these accounts to test the application:

    Admin
    - Email: admin@test.com
    - Password: P@$$w0rd!

    User
    - Email: user@test.com
    - Password: P@$$w0rd!



