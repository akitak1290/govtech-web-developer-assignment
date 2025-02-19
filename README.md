# Web Dev Tech Assignment for GovTech 2025

This project is a submission for the [GovTech's Fullstack developer assignment](https://gist.github.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf), built with ReactJS and Typescript, built with Vite, with automated testing for quality assurance.

## 💻 Table of Contents

- 🗄️ [Project Structure](#🗄️-project-structure)
- ⚙️ [Installation](#⚙️-installation)
- 🚄 [Run the App](#🚄-run-the-app)
- 🧪 [Run Unit Tests](#🧪-run-unit-tests)
- 🧱 [Technologies Used](#🧱-technologies-used)
- 📷 [Preview](#📷-preview)

## 🗄️ Project Structure
```
├───app                 # main application layer
├───assets              # additional assets folder
├───components          # shared minimal state UI components
├───features            # shared features
│   └───feature
│       ├───api         # api services used by the feature
│       └───components  # locally scope components
├───hooks               # shared hooks
└───testing             # test utilities and mock
```

## ⚙️ Installation 

### Prerequisites
Ensure that you have the following installed:
- Node.js (LTS version recommended)
- npm (comes with Node.js)

1. Clone the repository

   ```bash
   git clone https://github.com/akitak1290/govtech-web-developer-assignment.git
   cd govtech-web-developer-assignment 
   ```

2. Install dependencies

   ```bash
    npm install
   ```

## 🚄 Run the App

This will start a development server on port 5173 by default.

   ```bash
   npm run dev
   ```
Open your browser and go to http://localhost:5173

## 🧪 Run Unit Tests

   ```bash
   npm run test
   ```
![test_coverage](/docs/test_coverage.png)

Test library used:
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/)

## 🧱 Technologies Used
- **Frontend**: ReactJS, Typescript
- **Build tool**: Vite
- **Testing tool**: React Testing Library, Jest 

## 📷 Preview
**Typeahead**\
![typeahead](/docs/typeahead.png)

**Search result**\
![reach_result](/docs/search_result.png)

### Responsiveness

**Typeahead mobile**\
![typeahead_mobile](/docs/typeahead_mobile.png)

**Search result mobile**\
![search_result_mobile](/docs/search_result_mobile.png)