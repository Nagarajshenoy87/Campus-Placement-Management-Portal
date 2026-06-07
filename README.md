# Campus Placement Management Portal

## Overview

Campus Placement Management Portal is a full-stack web application designed to automate and streamline the campus recruitment process. The platform enables students to create profiles, apply for jobs, track applications, and receive placement updates, while administrators and recruiters can manage job postings, applications, and hiring activities.

## Features

### Student Module

* Student Registration and Login
* Secure Authentication
* Profile Management
* Resume Upload
* View Available Job Opportunities
* Apply for Jobs
* Track Application Status
* Placement Dashboard

### Recruiter Module

* Recruiter Registration and Login
* Company Profile Management
* Create and Manage Job Postings
* View Student Applications
* Shortlist Candidates
* Update Recruitment Status

### Admin Module

* Admin Dashboard
* Manage Students
* Manage Recruiters
* Manage Job Postings
* Monitor Placement Statistics
* Generate Reports

### Authentication & Security

* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* Role-Based Access Control

### Analytics

* Placement Statistics Dashboard
* Student Performance Analysis
* Recruitment Reports
* Placement Trends

## Tech Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript
* Bootstrap / Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* bcrypt.js

### Tools

* Postman
* Git
* GitHub
* MongoDB Compass

## Project Structure

Campus-Placement-Management-Portal/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md

## API Endpoints

### Authentication

* POST /api/register
* POST /api/login

### Students

* GET /api/students
* GET /api/student/:id
* PUT /api/student/:id

### Companies

* POST /api/company
* GET /api/company
* DELETE /api/company/:id

### Applications

* POST /api/apply
* GET /api/applications

## Future Scope

* AI-Based Job Recommendation System
* Resume Screening
* Email Notifications
* Interview Scheduling
* Placement Prediction Analytics

## Author

Nagaraj Shenoy
