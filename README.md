# Web Dev Tech Assignment for GovTech 2025

Assignment submission for the [GovTech's Fullstack developer assignment](https://gist.github.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf)

## Table of Contents

- [Installation](#installation)
- [Run the App](#run-the-app)
- [Run Unit Tests](#run-tests)
- [Assumptions](#assumptions)
- [Preview](#preview)

## Installation

To install and run this project on your local machine, follow these steps:

1. Clone the repository

   ```bash
   git clone https://github.com/akitak1290/govtech-web-developer-assignment.git
   cd govtech-web-developer-assignment 
   ```

2. Install dependencies

   ```bash
    npm install
   ```

## Run the App

1. Run command

   ```bash
   npm run dev
   ```

2. Open your browser and go to http://localhost:5173

## Run Unit Tests

   ```bash
   npm run test
   ```

You can also go to coverage folder to see the test coverage report

## Assumptions
As we are using a mock API to get data only for the query string "child", the suggestion list and search result will only work with that query string.

## Preview
Typeahead suggestion dropdown
![typeahead](/docs/typeahead.png)

Search result
![reach_result](/docs/search_result.png)
