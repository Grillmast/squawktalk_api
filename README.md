## Squawktalk_api
Squawktalk_api is a backend API built using Express.js and Mongoose packages. The goal of this project was to create the backend functionality for a social media platform where users can share their thoughts and connect with friends. MongoDB was used as the database, and the Mongoose ODM (Object Data Modeling) was employed to interact with the database.

## Technologies Used
Express.js: A web application framework for Node.js, used for routing and handling HTTP requests.

Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js, used for data modeling and interacting with the MongoDB database.

MongoDB: A NoSQL database used to store user data, thoughts, and friend relationships.

Insomnia: A REST API client used for testing and interacting with the API endpoints.

## Functionality
The Squawktalk_api backend provides the following functionality:

User Management: Users can be created, updated, and deleted. Each user has a username, email, thoughts (array of their thoughts), and friends (array of their friends).

Thought Management: Users can create thoughts and associate them with their account. Each thought has a thoughtText field and is linked to the user who created it.

Friend Management: Users can add and remove friends. The friends field in the user schema maintains an array of references to other User documents.

## Screenshots
Here are some screenshots showcasing the Squawktalk_api backend:

## Screenshot 1
![squawk 1](https://github.com/Grillmast/squawktalk_api/assets/115853912/0f9d42ca-0762-4ab4-a654-5881e202acf6)

## Screenshot 2
![squawk 2](https://github.com/Grillmast/squawktalk_api/assets/115853912/44137b53-0173-4c9b-b3a2-0314ef4eca22)


## Link 
https://drive.google.com/file/d/1WJTbvbG-cXlKI_yWwvWjRsOQCTeJ8pm-/view

## Conclusion
Squawktalk_api demonstrates the implementation of a backend API using Express.js and Mongoose. It provides the necessary routes for user management, thought management, and friend management. The MongoDB database and Mongoose ODM enable efficient data storage and retrieval. Insomnia was used for testing the API endpoints and ensuring their functionality.

With Squawktalk_api, users can create accounts, share their thoughts, and connect with friends, forming a basic social media platform.
