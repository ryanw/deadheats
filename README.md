# Dead Heats Race Management Software

This is software for managing race events.  
The backend is written in Ruby on Rails, while the frontend is TypeScript + Vite + React.

## Backend
Tested with Ruby v3.3.5

Start the Races REST API server

```
cd backend
bundle
bundle exec rails db:migrate
bundle exec rails server
```

Open http://localhost:3000 to see the OpenAPI/Swagger UI interface to the Races REST API.

Backend tests can be run with:

```
bundle exec rails spec
```

## Frontend
Tested with Node v22.9.0

OpenAPI is used to generate TypeScript types for the REST API, reducing the risk of bugs.


Start the Vite dev server:

```
cd frontend
npm install
npm run dev
```

Open http://localhost:4000 to see the React frontend.

API types can be regenerated using

```
npm run generate-api
```


## Room for improvement

* Pagination - The index page has no pagination so can get very long.
* Confirm Dialogs - Calls to `confirm` should be remade using a react component.
* Drag and Drop - Reordering lanes is tedious, drag and drop would make it a lot easier.
* UI Tests - Frontend is lacking tests, add tests using something like Jest and Enzyme.
