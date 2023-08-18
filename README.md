# Social-Network-API

- [repo](https://github.com/RyanTheSCholar/Social-Network-API)

- [WalkThrough link](https://youtu.be/XZkBz70rmOg)

## Description
This API is to demonstrate my skills with mongoDB, specifically using mongoose. 
Using 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
## Installation

In order to use this database you must download the repo and then use the commands in order as follows.
- clone this repo to your local device
- must have mongoDB Compass
- for the data in the application to work to standard
- then you will need to have insomnia or some other HTTP-based API endpoint application
- npm i to install the packages on the repo
- node index.js

Endpoints for the application
#### main endpoint
- /api
#### api endpoints
- /thoughts
- /users
##### key: "- QUERY PARAMETERS FOR ENDPOINTS ->"; these parameters are inbetween the dash and the arrow, not including the dash and the arrow by any means
#### userRoutes endpoints
- / -> this for getting all users and creating a user
- /:_id -> this is for creating a user, updating a user and deleting a user
- /:_id/friends/:friendId -> this to add a friend or to delete a friend
#### thoughtRoutes endpoints
- / -> this is for getting all thoughts and to create a thought
- /:thoughtId -> this is to get a single thought, update a thought and delete a thought.
- /:thoughtId/reactions -> this is to post a reaction to a specific thought
- /:thoughtId/reactions/:reactionId -> this is to delete a specific reaction depending on which thought it is located in

## Usage

![screenshot](./images/social%20network%20pic.PNG)

## Credits

N/A

## License

![license](https://img.shields.io/badge/License-None-blue)

## Badges

![JavaScript](https://img.shields.io/badge/JavaScript-100%25-yellow)
## Features

Database for a social-network that allows full CRUD functionality, letting the user create, read, update and delete data at specific endpoints in the query.

## How to Contribute
    
- Ryan.business.bowen@gmail.com
- [GitHub](https://github.com/RyanTheScholar)

## Tests
N/A