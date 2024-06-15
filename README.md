# Multi-Tenant Internet Booking Engine

## Overview

This repository contains the source code for a highly scalable, configurable, and secure multi-tenant hotel booking engine. The application is designed to ensure responsiveness across various devices and is built using Spring Boot, React, TypeScript, PostgreSQL, GraphQL, and Azure.

## Features

- **Scalability**: Designed to handle multiple tenants efficiently.
- **Configuration**: Easily configurable to meet various tenant requirements.
- **Security**: Implements robust security measures, including Azure AD B2C for authentication and KeyVault for secure credential storage.
- **Responsiveness**: Ensures optimal performance and user experience across different devices.

## Technologies Used

- **Backend**: Spring Boot, GraphQL, PostgreSQL
- **Frontend**: React, TypeScript
- **Cloud Services**: Azure App Service, Azure Static Web Apps, Azure KeyVault, Azure AD B2C, Azure Monitor
- **Testing**: JUnit for backend testing, Cypress for end-to-end frontend testing

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Java (JDK 11 or higher)
- PostgreSQL
- Azure account

### Installation

1. Clone the repository:
   ```
   git clone <repository_url>
   cd <project_directory>
   ```

2. Set up the backend:
   - Navigate to the backend directory:
     ```
     cd backend
     ```
   - Install dependencies and build the project:
     ```
     ./mvnw clean install
     ```
   - Update application properties with your PostgreSQL and Azure configurations.

3. Set up the frontend:
   - Navigate to the frontend directory:
     ```
     cd frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Update environment variables with your Azure Static Web Apps configurations.

### Running the Application

1. Start the backend server:
   ```
   ./mvnw spring-boot:run
   ```

2. Start the frontend development server:
   ```
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Project Structure

```
multi-tenant-booking-engine/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```

## Deployment

### Backend Deployment

1. Deploy the backend to Azure App Service.
2. Ensure the necessary environment variables are configured in the Azure App Service settings.

### Frontend Deployment

1. Deploy the frontend to Azure Static Web Apps.
2. Ensure the environment variables are set up correctly for the static web app.

## Testing

- **Backend**: 
  - Run JUnit tests:
    ```
    ./mvnw test
    ```
  - Achieved 85% code coverage.

- **Frontend**: 
  - Run Cypress end-to-end tests:
    ```
    npm run cypress:open
    ```

## Monitoring

Utilize Azure Monitor to keep track of application performance and health metrics.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request for any improvements or fixes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

This README provides a comprehensive guide to setting up, running, and contributing to the Multi-Tenant Booking Engine project. Customize the instructions to fit your specific setup and requirements.