# MoreLyrics

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## To-do (required)

# Angular Frontend Project with Firebase

## To-Do List

### 1. Authentication
- [ ] Implement authentication service
- [ ] Enable user login functionality
- [ ] Enable user logout functionality
- [ ] Enable user registration functionality
- [ ] Create a reactive registration form
  - [ ] Implement at least 1 synchronous validator
  - [ ] Implement at least 1 asynchronous validator
  - [ ] Provide clear messages and/or visual hints for incorrect fields
- [ ] Integrate Firebase SDK for authentication

### 2. Lazy Loading
- [ ] Create at least 1 lazy-loaded routing configuration representing a complete feature
- [ ] Create at least 1 lazy-loaded component
  - [ ] Component can be inside the lazy-loaded feature or separate

### 3. General Requirements
- [ ] Create a data storage service and/or backend service
- [ ] Implement routing with at least 3 different routes
  - [ ] Include at least 1 child route
  - [ ] Handle incorrectly entered routes
- [ ] Implement routing guards
  - [ ] Create at least 2 different `canActivate` guards
  - [ ] Create at least 1 `canDeactivate` guard
- [ ] Create at least 1 custom directive
- [ ] Implement at least 1 pipe to filter or sort data
- [ ] Utilize at least 1 subject in the application
- [ ] Define at least 3 access levels:
  - [ ] Not logged in => restricted access (login/registration)
  - [ ] Logged in => normal user access
  - [ ] Admin => extended options

### 4. Testing
- [ ] Develop a unit testing plan for at least 1 component
  - [ ] Document both positive and negative tests
- [ ] Write unit tests based on the testing plan
  - [ ] Implement at least 3 positive unit tests
  - [ ] Implement at least 2 negative unit tests

### 5. Deployment
- [ ] Deploy the application via Firebase using the AOT principle

### 6. Firebase Setup
- [ ] Configure Firebase Firestore database for data storage
- [ ] Implement database access rules
  - [ ] Ensure different access levels for admin and normal users
- [ ] Set up Firebase authentication using email and password
- [ ] Utilize Firebase Storage for storing documents and figures
- [ ] Host the application using Firebase Hosting

### 7. Documentation
- [ ] Create a README file containing:
  - [ ] Firebase URL
  - [ ] Administrator credentials
- [ ] Include the testing plan for the chosen component
- [ ] Document the results of the self-written unit tests
- [ ] Provide full code of the app (excluding node modules)
- [ ] Ensure Firestore rules and Firebase rules are included in the codebase

### 8. My own requirements:
 
- [ ] Add profile picture upload for songbooks
- [ ] Fix songbook/song database clash
- [ ] Add dates under songbook name
- [ ] Fix layout
  - [ ] Remove the second bar on the top
- [ ] Fix the regex (currently not highlighting the # in A/G#)

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
