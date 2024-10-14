<!-- @format -->

# Sahara API

## Introduction

Sahara API is a backend service that provides endpoints for user authentication, product management, and shopping cart functionality. This README provides an overview of the available endpoints and their usage.

## Base URL

```
https://sahara-zouo.onrender.com/shop
```

## Endpoints

### User Authentication

#### Register a new user

- **URL:** `/register`
- **Method:** POST
- **Description:** Register a new user account.

#### User Login

- **URL:** `/login`
- **Method:** POST
- **Description:** Authenticate a user and receive a token.

#### Get Logged In User

- **URL:** `/userLogged`
- **Method:** GET
- **Description:** Retrieve information about the currently logged-in user.

#### User Logout

- **URL:** `/logoutUser`
- **Method:** POST
- **Description:** Log out the current user and invalidate their token.

#### Forgot Password - Step 1

- **URL:** `/forgotPassword/begin`
- **Method:** POST
- **Description:** Initiate the password reset process.

#### Forgot Password - Step 2 (OTP)

- **URL:** `/forgotpassword/otp`
- **Method:** POST
- **Description:** Verify the OTP and complete the password reset process.

#### Update User Profile

- **URL:** `/updateProfile`
- **Method:** POST
- **Description:** Update the user's profile information.

### Product Management

#### Get All Products

- **URL:** `/allProducts`
- **Method:** GET
- **Description:** Retrieve a list of all available products.

#### Remove a Product

- **URL:** `/removeProduct/:upis`
- **Method:** DELETE
- **Description:** Remove a product from the database using its UPIS (Unique Product Identifier String).

#### Add a New Product

- **URL:** `/addNewProduct`
- **Method:** POST
- **Description:** Add a new product to the database.
- **Note:** This endpoint uses `upload.single("pics")` middleware for handling file uploads.

### Shopping Cart and Wishlist

#### Get Cart List

- **URL:** `/getcartlist`
- **Method:** POST
- **Description:** Retrieve the user's shopping cart contents.

#### Modify Wishlist

- **URL:** `/checkWishlist`
- **Method:** POST
- **Description:** Add or remove an item from the user's wishlist.

#### Modify Cart

- **URL:** `/checkCart`
- **Method:** POST
- **Description:** Add or remove an item from the user's shopping cart.

## Authentication

Most endpoints require authentication. Include the authentication token in the request headers:

```
Authorization: Bearer <your_token_here>
```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests. In case of an error, the response will include a JSON object with an `error` field describing the issue.

## Rate Limiting

To ensure fair usage, the API implements rate limiting. Please refer to the response headers for information on your current rate limit status.

## Versioning

This documentation is for version 1 of the Sahara API. As the API evolves, we'll update the version number and provide separate documentation for each version.

## Support

For any questions or issues regarding the Sahara API, please contact our support team at support@sahara.com.
