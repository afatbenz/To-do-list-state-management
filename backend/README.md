## Environment
We are using NodeJS Express v18 and MySql Database.
You can see the list below, what APIs are available


## API List
1. `/api/sys` [GET] To Check API is running 
2. `/api/auth/register/submit` [POST] Register User 
3. `/api/auth/reset/send-otp` [POST] Send OTP to Reset Password
4. `/api/auth/reset/validate-otp` [POST] OTP Validation to Reset Password
5. `/api/auth/reset/submit-password` [POST] Submit New Password
6. `/api/auth/login` [POST] Login to get session and token
7. `/api/item/submit` [POST] Creating items todo list
8. `/api/item/list` [GET] List of to do list
9. `/api/item/update` [POST] Update to do list items
10. `/api/item/delete` [POST] Delete to do list items


## Do you need a tutorial to run the service?
OK, follow these steps
1. Create database `CREATE DATABASE mobee` and then `USE mobee`
2. Please download the sql file, [here](https://github.com/afatbenz/To-do-list-state-managemen/blob/main/db/mobee.sql). And run the sql in your MySql
3. Clone this repository
4. Run command `npm install` to install node module package
5. Run command `nodemon start www` to start your service
6. The service will running default on port 3100


## Want an example of using the API?
Yes, you just need to import our postman collection. You can get it [here](https://github.com/afatbenz/To-do-list-state-managemen/blob/main/db/Mobee.postman_collection.json).
You only need to change the payload, query and parameters that have been provided
