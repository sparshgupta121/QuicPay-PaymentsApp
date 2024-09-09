# 🚀 QuicPay - Payment Application

![QuicPay Banner](../QuicPay-PaymentsApp/frontend/src/assets/logo.png)

**Note: Not a Real Money App (Gives you Random Number as Money)**\
\
**Created For Learning the Full-Stack Concepts**

**QuicPay** is a Basic web application that allows users to send and receive payments seamlessly. With a user-friendly interface and features, it simplifies financial transactions (Gives Random Dummy Amount).

---

## 🚀 **Features**

1. **User Search and Filter**  
   Quickly find users using the **Search Bar** on the dashboard.  

2. **Send Payment**  
   Once a user is found, easily send payments with a few clicks.  

3. **Reset Forgotten Password**  
   Forgot your password? No worries, you can securely reset it in a few easy steps.  

4. **Update Profile**  
   Keep your profile up-to-date by editing your details whenever needed.

5. **Login/Logout**  
   Securely log in and out of your account with ease. Your session remains safe while you work.


---

## 💻 **Installation Instructions**

1. **Clone the repository**
   ```bash
   git clone https://github.com/sparshgupta121/QuicPay-PaymentsApp.git
   ```
   

1. **Navigate to the frontend and backend folders and Install Dependencies run the following command:**


    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. **Set up Environment Variables Frontend**\
    \
    Create a `.env` file in the `frontend` directory and include the following:

    ```bash
    VITE_API_BASE_URL=<backend-api-url>`
    ```
    
4. **Set up Environment Variables Backend**\
    \
    Create a `.env` file in the `backend` directory and include the following:

    ```bash
    MONGO_URI=<Your-Mongo-Connection-URL>
    JWT_SECRET=<Your-Jwt-secret>
    
4. **Start Frontend App**\
    \
    Make Sure you are in a `frontend` directory and run the following command:

    ```bash
    npm run dev
    ```

4. **Start Backend App**\
    \
    Make Sure you are in a `backend` directory and run the following command:

    ```bash
    node index.js
    ```


---

🌐 **Live Demo**
----------------

Check out the live version: [QuicPay](https://quicpay.vercel.app/signin)

* * * * *

🛠️ **Technologies Used**
-------------------------

-   **Frontend:** React, Vite, Axios
-   **Backend:** Node.js, Express, MongoDB
-   **Deployment:** Vercel (Frontend), Render (Backend)

* * * * *

🔒 **Security Features**
------------------------

-   **JWT Authentication:** User authentication using JWT tokens.
-   **Password Encryption:** All user passwords are encrypted using bcrypt.

* * * * *

Made with ❤️ by Sparsh Gupta [LinkedIn](https://www.linkedin.com/in/sparshgupta121/)
