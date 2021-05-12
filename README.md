## Setup Instructions for Backend


- Fork and clone the Repo by typing the following commands in the terminal 
```
$ git clone https://github.com/your-username/foss-events.git
$ cd foss-events
```
![fork](https://i.postimg.cc/cHx44NPx/Screenshot-152.png)
![clone](https://i.postimg.cc/qqcPttKW/Screenshot-154.png)
![clone](https://i.postimg.cc/T31sxNtz/Screenshot-162.png)

- Change Branch using:
```
$ git checkout backend
$ cd Backend
```
![branch](https://i.postimg.cc/RVsPgQvX/Screenshot-163.png)

- Get connection string from [Mongo Atlas](https://www.mongodb.com/cloud/atlas) by creating a cluster or you can also use your locally installed mongodb
- You can click [here](https://www.youtube.com/watch?v=KKyag6t98g8&t=792s) to learn how to connect atlas to you project
- Create a new file named `.env` in the Backend folder and copy the format of `.env.example` file 
- Paste the connection string in the `.env` file in the `DB_CONNECT` variable
- Install node dependencies using:
```
$ npm install
```
![install](https://i.postimg.cc/jjQPFtzt/Screenshot-164.png)

- To start the server, type:
```
$ node server.js
```
![start](https://i.postimg.cc/RCbf8Pn6/Screenshot-165.png)

- Make changes to the code(for ex- add an update route) and save your changes
- Commit your changes using:
```
$ git commit -m "made changes"
```
- Push the changes to the forked repository
- Navigate to the original repository and make a pull request

<strong>Currently working Routes</strong>
  - Get Routes:
      - /event - Displays all the events
      - /event/:title - Displays the deatils of the specific event
  - Post Routes:
      - /users/login - Login Route
      - /users/signup - Signup Route
      - /event/addevent - Route for adding an event
