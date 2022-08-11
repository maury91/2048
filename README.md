# 2048

This project is a multiplayer version of 2048, the game supports any number of player.

Every move from every player is sent to the server, processed and the result is displayed to every player.

The game supports obstacles, obstacles are unmovable and will prevent other tiles to pass through them.

The first player can choose the number of obstacles, and start the game, the other players will follow.

To win the game you need to reach the number _2048_, if you run out of moves you will lose.

The game support persistency, once you choose a name, that name will be used for the entire life of your session, if you want to change name you will need to close the website and re-open it.

## I want to play now!

The game is hosted on [https://maury91-2048.herokuapp.com/](https://maury91-2048.herokuapp.com/) and can be played at any moment.


## Stack used

The Frontend and the Backend communicate using `socket.io`, this library supports websockets as first choices, if websockets are unavailable it will back off to pooling.

### Frontend

The Frontend is built using React.js, it uses CSS modules for styling and Redux for local state storage.

### Backend

The Backend is built using Node.js and uses Fastify for static hosting ( the backend hosts the frontend so they can live under the same hostname ).

## Testing

Testing is done through Jest both on Frontend and Backend, different types of tests have been used based on what is being tested:

- To test server services, a real Server is being spin-up in the test and the full connection is tested, with this type of test we are able to test the server service like if we are a client.
- To test server game logic and shared logic, simple unit testing has been used
- To test client components, snapshot testing has been used for Pure components ( components that don't have an internal state), and user journey testing has been for Complex components.
- To test redux state, unit testing has been used

A note about testing, I didn't wrote tests for everything because it consumes time and writing repetitive tests will not show anything extra.

To run the tests you can use ( after you complete the _Installing the dependencies_ section ):

```shell
cd frontend && yarn test && cd ../
cd backend && yarn test && cd ../
```

## Ensuring the frontend-backend contract

The contract between the frontend and the backend is ensured through typescript, it is not at the same level of more robust contracts like GraphQL or Swagger, but for a such small project it provides some help.

More in details in both frontend and backend exists a `src/shared` folder, this folder is an equal copy in both of them, it contains the functions used for serialization ( important part that needs to be identical ), and all the Events sent in the Socket with the Typing of their Params.

## Running the game locally

You can use the script `start_2048.sh`, or you can follow the guide below

### Installing the dependencies

In order to run the game locally you need to install all the dependencies.  
It is recommended to use Node 16.

If you don't have the correct version of Node, you can install [NVM](https://github.com/nvm-sh/nvm) and then run:

```shell
nvm use
```

once you have the correct Node you can proceed at installing the dependencies, to do that you can use:

```shell
cd frontend && yarn && cd ../
cd backend && yarn && cd ../
```

### Running in Dev mode

To run the project in Dev mode you need to run both the Frontend and Backend in separate processes:

```shell
cd frontend && yarn start
```

```shell
cd backend && yarn start
```

The Frontend will open automatically the browser at the right URL.

### Running in Prod mode

To run the project in Prod mode you need to build both the Frontend and Backend:

```shell
cd frontend && yarn build && cd ../
cd backend && yarn build && cd ../
```

Then you will need to copy the output of the Frontend into the `public` folder of the Backend:

```shell
cd frontend && cp -a build/* ../backend/public
```

and finally you can run the built Backend with:

```shell
cd backend && yarn start-prod
```

### Running in Prod mode with Docker

As an alternative you can also run through Docker:

```shell
docker build . -t maury91/2048-mp
docker run -p 3000:3000 -e PORT=3000 -d maury91/2048-mp
```

You will be able to access the game at http://localhost:3000
