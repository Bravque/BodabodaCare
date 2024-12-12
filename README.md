# BodaBodaCare

BodaBodaCare is an innovative platform designed to provide motorbike riders (commonly known as "boda boda" operators) with access to affordable insurance coverage against accidents, sickness, and unforeseen incidents, empowering them to safeguard their livelihoods and families.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contribution](#contribution)
- [License](#license)
- [Contact Information](#contact-information)

## Project Overview
BodaBodaCare aims to reduce financial risks for motorbike operators in Kenya and beyond by providing comprehensive insurance coverage. The platform facilitates seamless enrollment, policy management, and claims processing, ensuring ease of access and efficient operations.

### Key Objectives
- Provide tailored insurance policies for motorbike operators.
- Offer an intuitive interface for policy management.
- Ensure quick and efficient claims processing.
- Promote financial security and safety for operators and their families.

## Features
1. **Insurance Enrollment**: Riders can register and select insurance packages that suit their needs.
2. **Policy Management**: Riders can view, update, or renew their policies.
3. **Claims Submission**: Quick and efficient submission of claims with document uploads.
4. **User Authentication**: Secure authentication for both riders and administrators.
5. **Admin Dashboard**: Management portal for policy approvals, claims tracking, and user management.

## Tech Stack
### Frontend:
- HTML5, CSS3, JavaScript
- React.js (or your chosen framework)

### Backend:
- Node.js with Express.js
- MySQL for database management

## Installation and Setup
### Prerequisites:
- Node.js (v16+)
- MySQL (v8+)

### Steps:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/bodabodacare.git
   cd bodabodacare
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_HOST=your_database_host
   DATABASE_USER=your_database_user
   DATABASE_PASSWORD=your_database_password
   DATABASE_NAME=bodabodacare
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```
4. **Start the Server**:
   ```bash
   npm start
   ```
5. **Access the Application**:
   Navigate to `http://localhost:4000` in your browser.

## Usage
- **Riders**:
  - Register an account.
  - Select and purchase an insurance package.
  - Manage policies and submit claims.
- **Administrators**:
  - Login to the admin dashboard.
  - Approve policies and claims.
  - Manage user accounts.

## API Endpoints
| Endpoint               | Method | Description                   |
|------------------------|--------|-------------------------------|
| `/api/auth/register`   | POST   | Register a new user.          |
| `/api/auth/login`      | POST   | Login and obtain a token.     |
| `/api/policies`        | GET    | Fetch available policies.     |
| `/api/claims`          | POST   | Submit a claim.               |
| `/api/admin/users`     | GET    | Fetch all users (admin only). |

Refer to the API documentation for detailed specifications.

## Contribution
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Commit your changes and open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact Information
For inquiries or support:
- **Developer**: Bravin Ojweke
- **Email**: bravinowino008@gmail.com
- **LinkedIn**: [Bravin Ojweke](https://linkedin.com/in/bravin-ojweke)

---
Thank you for using BodaBodaCare!


