# HOSCO FRONTEND


Implemented all tasks except sharing the tracks on social media.
Used TDD along the way.



### To run the app without docker:

  - npm i
  - npm start



### To run the app WITH docker:

  - sudo docker build . -t hosco-frontend
  - sudo docker run -p 8080:3000 hosco-frontend

The first command will generate the image.
The second command will run npm i and npm start.
You can skip the sudo command in case you don't need permissions.

**You can now access the app on http://localhost:8080**


### To run the tests WITH docker:

- sudo docker exec -it <container id> npm test

### ENJOY!!