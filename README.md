# MoreLyrics

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## To-do (required)

# Angular Frontend Project with Firebase

## To-Do List

### 1. Authentication
- [x] Implement authentication service
- [x] Enable user login functionality
- [x] Enable user logout functionality
- [x] Enable user registration functionality
- [ ] Create a reactive registration form
  - [ ] Implement at least 1 synchronous validator
  - [ ] Implement at least 1 asynchronous validator
  - [ ] Provide clear messages and/or visual hints for incorrect fields
- [x] Integrate Firebase SDK for authentication

### 2. Lazy Loading
- [x] Create at least 1 lazy-loaded routing configuration representing a complete feature
- [x] Create at least 1 lazy-loaded component
  - [x] Component can be inside the lazy-loaded feature or separate

### 3. General Requirements
- [x] Create a data storage service and/or backend service
- [x] Implement routing with at least 3 different routes
  - [x] Include at least 1 child route
  - [x] Handle incorrectly entered routes
- [x] Implement routing guards
  - [x] Create at least 2 different `canActivate` guards
  - [x] Create at least 1 `canDeactivate` guard
- [x] Create at least 1 custom directive
- [x] Implement at least 1 pipe to filter or sort data
- [x] Utilize at least 1 subject in the application
- [x] Define at least 3 access levels:
  - [x] Not logged in => restricted access (login/registration)
  - [x] Logged in => normal user access
  - [x] Admin => extended options

### 4. Testing
- [x] Develop a unit testing plan for at least 1 component
  - [x] Document both positive and negative tests
- [x] Write unit tests based on the testing plan
  - [x] Implement at least 3 positive unit tests
  - [x] Implement at least 2 negative unit tests

### 5. Deployment
- [x] Deploy the application via Firebase using the AOT principle

### 6. Firebase Setup
- [x] Configure Firebase Firestore database for data storage
- [x] Implement database access rules
  - [x] Ensure different access levels for admin and normal users
- [x] Set up Firebase authentication using email and password
- [x] Utilize Firebase Storage for storing documents and figures
- [x] Host the application using Firebase Hosting

### 7. Documentation
- [x] Create a README file containing:
  - [x] Firebase URL
  - [x] Administrator credentials
- [x] Include the testing plan for the chosen component
- [x] Document the results of the self-written unit tests
- [x] Provide full code of the app (excluding node modules)
- [x] Ensure Firestore rules and Firebase rules are included in the codebase

### 8. My own requirements:

- [x] Make realtime updates reflect in both components
- [x] Make a logo
- [ ] Fix layout for phones
- [ ] Add profile picture upload for songbooks
- [ ] Fix songbook/song database clash
- [x] Fix layout
  - [x] Remove the second bar on the top
- [x] Fix the regex (currently not highlighting the # in A/G#)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
