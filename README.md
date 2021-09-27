# Board_Games API Project

<u><b>[Link to Board Games API ](https://nc-board-games.herokuapp.com/api/)</b></u>

## <u>Overview</u>

This API project was designed with the intention of mimicking a real-world back end service, that provides information to front-end architecture. The API interacts with a PSQL database, which has been filled with data about board-games stored in tables including; users, reviews, comments and categories. The API was developed to gain practical experience of using a model, view, controller pattern and a range of technologies to interact to the database, send a structured response to the client and handle a variety of errors. The following technology was used throughout this project;

- Express, dotEnv, PostgreSQL, PostgreSql format and Heroku for live deployment.

- Jest, Jest-sorted and Supertest were also utilised for testing purposes

## <u>Learning objectives</u>

This project will hopefully provide a practical example of designing, creating, testing and delpoying a working API. The project will hopefully aid in my understanding of the following areas;

- The different types of HTTP endpoints, status codes and the structure of a URL.
- Learn how to implement Express to streamline the use of HTTP for a more effective program.
- Use the MVC pattern throughout and understand the importance of a clear structuring when implementing a API.
- Better understanding of routing, and how that aids the MVC model and makes for a clearer code base.
- Implementing SQL database queries and handling the responses, through models.controllers.
- Develop a greater understanding of using node-postgres and connection pooling.
- Learn how to handle errors more effectively, using routers to aid in directing errors. How the keyword next() works and how it is implemented. Handling different errors(400, 404, custom errors) and relaying the correct error code/message back to the client.
- Understand the dangers of SQL injection and the methods to prevent this.
- Learn how to deploy a live API server online using Heroku.

## <u>Set-up</u>

### <u>Cloning Project:</u>

The project can be forked from <u>(https://github.com/RicCrankshaw2409/be-nc-games.git)</u> and cloned using the command;

`git clone https://github.com/RicCrankshaw2409/be-nc-games.git`

### <u>Installing dependencies:</u>

The following dependencies will be required and can be installed used the command;

`npm install express dotenv psql psql-format`.

The following dev-dependencies will be required for testing purposes and can be installed with the command;

`npm install jest jest-sorted supertest -D`.

### <u>Seeding the database</u>

Both databases have been created within the `setup.sql` file, which is run using the command;

`npm run setup-dbs`

The database uses data from both db/data `development_data` and `test-data` folders. The database is seeded, using the command;

`npm run seed`

The command runs the `db/seeds/run-seed.js`, which subsequently calls the `seed` function which is stored in `db/seed/seed.js`, creating and populating the users, reviews, comments and categories tables within the PSQL database. Functionality for the `seed.js` file have been exported to a seperate file `db/utils/helper-seed-function.js` and the formatting of data to be inputted into tables has been exported to `db/utils/data-manipulation`.

### <u>Creation of .env files:</u>

Two .env files will need to be added '.env.test' and '.env.development'. Into both of theses files add PGDATABASE=nc_games_test to .env.test and PGDATABASE=nc_games to .env.development. The .env files have been added to .gitignore along with `node_modules`.

### <u>Running tests:</u>

Jest and Supertest are used to test functionality and error handling and can be run with the command:

`npm test`

The tests are stored within `__tests__/app.test.js`. All utility function tests are stored within `__tests__/utils.js`

### <u>Minimum required versions</u>

node.js: v16.10.0

Postgres: 13.4

## <u>Challenges</u>

- Finding a balance between extracting functionality to utility files such as the `data-manipulation` and `helper-seed-functions` to aid readability and organisation of code and making the code difficult to follow. I found that by moving some functionality out of the seed.js file, it became much easier to read and work out what the seed.js file was doing. However, this came with the challenge of having more moving parts in the code and often led to bugs being created. I overcame these issues by weighing up the need to extract functionality for readability and writing it in line, preventing unnecessary complexity and time taken to create/develop new files and functions. Thorough testing, helped spot bugs early making them easier to source and fix.

- Initially using the MVC pattern and routing made it quite difficult to follow the code from the app.js, through to finally sending a response back to the client. I found by setting up all the routers/controllers/models that I would need throughout at the start, made the code much easier to follow through the whole process. Using the shortcut of clicking on the function name, using command and click also helped follow the code from app.js/router/controller/model and made spotting typos in function names easier to spot. This also made it easier to spot any files that hadn't been required into to the correct files.

- Using console.log as much as possible to follow the request through the process made it much easier to find and deal with any bugs. This was particularly useful when identifying errors. By placing console logs in the controller error catch block, it was much easier to see where the issue was coming from. Console.log also helped identify if the request had reached the controller. if not I could look at the router. Similarly a control.log in the model would help identify if there was an issues with the controller. A console.log of the result being sent back to the controller would identify an issue with the model/SQL database request. Again this ensured bugs were dealt with more effectively.
