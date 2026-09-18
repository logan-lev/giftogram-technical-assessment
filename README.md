# Created by Logan Levine
This project was done as a technical assessment for Giftogram.
# Time Taken
The amount of time taken completing this assessment was approximately six hours to complete.
# Steps Taken
The steps taken to complete this assessment:
1. Installing dependencies (express, mysql2, bcrypt, dotenv, and nodemon)
2. Added database schema with users table and messages table.
3. Created MySQL connection pool in db.js and Express server skeleton in server.js
4. Added the register endpoint to register new users with 3 separate error messages & bcrypt password hashing.
5. Added the login endpoint to authenticate a user with 2 separate error messages checking emails & passwords.
6. Added the send message endpoint with 2 separate error messages and a success message stating the message was sent.
7. Added the view messages endpoint with 2 separate error messages as well as a response of the messages between 2 users.
8. Added the list all users endpoint with 2 separate error messages and a response of all registered users except the requester.
9. Finishing up a final round of bug testing, adding the SQL dump of the MySQL database, as well as fully completing the README.
# Issues
Some issues I found with the current endpoint structure were:
1. The send message endpoint doesn't have any sort of authentication allowing any user to fabricate messages between any other two users. Similarly, the view messages and list all users endpoints don't have verifications meaning everyone is able to access them.
2. There is currently no way to handle view messages and list all users at scale. It is fine for a demo since I control the number of messages and users, but for an app with hundreds or thousands of users, there is no order or limit to the results.
3. For viewing messages, I would have preferred to use a more human-readable format such as a plain time and date rather than epoch seconds as it would make it easier to look through at scale. It would be possible to keep storing epoch, and just convert it to a formatted string date before it is sent to the user.
# Suggested Improvements
## Security
- There needs to be some sort of authentication or verification per each request as anyone can access and modify anything currently.
- There needs to be a rate limit on the register and login endpoints to prevent brute-force attempts.
- There needs to be enforcement on password length and complexity instead of any non-empty string.

## Usability
- There needs to be a way to sift through the view messages and list all users endpoints because of the issue it would have at scale. Maybe through pagination.
- There needs to be input validation feedback on user email in the registration endpoint because currently invalid emails are acceptable.

## API Design
- To future-proof the API design, there should be the version of the API so that any future breaking changes don't disrupt any existing clients.
- Create a unified endpoint error / success response rather than how I currently have it on an endpoint-by-endpoint basis.