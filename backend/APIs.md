# Api Endpoints

## **Login or Get Access Token**

* **URL**

    /auth/token

* **Method:**

    `POST`

* **Data Params**

    `username=[string]` <br />
    `password=[string]`

* **Success Response**

    * **Code:** 200 <br />
    **Content:** `{refresh: <refresh-token>, access: <access-token>}`

* **Error Response**

    * **Code:** 401 Unauthorized <br />
    **Content:** `{detail: "No active account found with the given credentials"}`

    * **Code:** 400 Bad Request <br />
    **Content:** `{"username": ["this field is required"], "password": ["this field is required"]}`

---

## **Refresh access token using refresh-token**

* **URL**

    /auth/token/refresh

* **Method:**

    `POST`

* **Data Params**

    `refresh: <refresh-token>`

* **Success Response**

    * **Code:** 200 <br />
    **Content:** `{refresh: <refresh-token>, access: <access-token>}`

* **Error Response**

    * **Code:** 400 Bad Request <br />
    **Content:** `{"refresh": ["this field is required"]}`

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"detail": "token is invalid or expired", "code": "token_not_valid"}`

---

## **Verify access token**

* **URL**

    /auth/token/refresh

* **Method:**

    `POST`

* **Data Params**

    `refresh: <refresh-token>`

* **Success Response**

    * **Code:** 200 <br />
    **Content:** `{}`

* **Error Response**

    * **Code:** 400 Bad Request <br />
    **Content:** `{"token": ["this field is required"]}`

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"detail": "token is invalid or expired", "code": "token_not_valid"}`

---

## **Register and get access tokens**

* **URL**

    /auth/register

* **Method:**

    `POST`

* **Data Params**

    `username=[string]` <br />
    `password=[string]`

* **Success Response**

    * **Code:** 201 Created <br />
    **Content:** `{refresh: <refresh-token>, access: <access-token>}`

* **Error Response**

    * **Code:** 400 Bad Request <br />
    **Content:** `{"username": ["this field is required"], "password": ["this field is required"]}`

    * **Code:** 409 Conflict <br />
    **Content:** `{"detail": "User already exists"}`

---

## **Get user**

* **URL**

    /auth/getuser

* **Method:**

    `GET`

* **Required Headers:**

    `Authorization: Bearer <access-token>`

* **Data Params**

    `title=[string]` <br />
    `type=[string]` <br />
    `amount=[integer]` <br />
    `interest=[float]` optional <br />



* **Success Response**

    * **Code:** 200 <br />
    **Content:** `{username: <username>}`

* **Error Response**

    * **Code:** 401 Unauthorized <br />


---


## **Create a new Loan/Investment request**

* **URL**

    /addrequest

* **Method:**

    `POST`

* **Required Headers:**

    `Authorization: Bearer <access-token>`

* **Data Params**

    `title=[string]` <br />
    `type=[string]` <br />
    `amount=[integer]` <br />
    `type=[string]` options: `Loan` or `Investment` <br />
    `finalAmount=[integer]` <br />
    `weeks=[integer]` <br />

* **Success Response**

    * **Code:** 201 Created <br />
    **Content:** `{message: "Request created successfully"}`

* **Error Response**

    * **Code:** 400 Bad Request <br />

    * **Code:** 401 Unauthorized <br />


---


## **Get all loan/investment requests**

* **URL**

    /getrequests

* **Method:**

    `GET`

* **Required Headers:**

    `Authorization: Bearer <access-token>`

* **Success Response**

    * **Code:** 200 OK <br />
    **Content:** `{loan_requests: [<loan-request>, <loan-request>, ...], investment_requests: [<investment-request>, <investment-request>, ...]`

* **Error Response**

    * **Code:** 401 Unauthorized <br />
