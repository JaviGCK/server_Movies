# Movies Server with MongoDB and Prisma

This is a simple movies server that uses MongoDB as the database and Prisma as the ORM. The server handles user, movie, and genre data and allows basic CRUD operations on these models.

# Data Model

## User

- **id**: Unique identifier for the user.
- **name**: User's name.
- **email**: User's email (unique).
- **movies**: List of movies associated with the user.
- **createdAt**: User's creation date.
- **updatedAt**: User's last update date.

## Movie

- **id**: Unique identifier for the movie.
- **name**: Movie's title.
- **url**: Movie's URL.
- **score**: Movie's rating.
- **description**: Movie's description.
- **genres**: List of genres associated with the movie.
- **createdAt**: Movie's creation date.
- **updatedAt**: Movie's last update date.
- **User**: User associated with the movie.
- **userId**: ID of the user who created the movie.

## Genre

- **id**: Unique identifier for the genre.
- **name**: Genre's name.
- **Movie**: Movie associated with the genre.
- **movieId**: ID of the movie to which the genre belongs.

# Running the Server

To run the server, follow these steps:

1. Clone this repository to your local machine.
2. Ensure Node.js is installed on your system.
3. Install dependencies using `npm install`.
4. Set the `MONGO_CLUSTER_URI` environment variable with your MongoDB database URI.
5. Start the server using `npm start`.

# Access the Server

You can access the server at the following URL:
[Server Movies](https://server-movies-oo55.vercel.app/)
