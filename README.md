# ResumeAI 🚀

AI-powered resume analysis and career assistant built with React, TypeScript, Node.js, Express, Prisma, PostgreSQL and Groq AI.

ResumeAI helps users analyze their resumes, improve them for ATS systems, match them against job descriptions, generate cover letters, and manage AI-generated career documents.

## 🌐 Live Demo

https://resume-ai-omega-pearl.vercel.app

## 💻 Source Code

https://github.com/Shahbaz0012/ResumeAI

---

# ✨ Features

### 📄 AI Resume Analysis

Upload a PDF resume and receive an AI-powered analysis including:

- ATS Score
- Resume Summary
- Skills
- Missing Skills
- Strengths
- Improvements
- Recommended Job Roles

### 🎯 AI Job Match

Paste a job description and compare it against your resume.

The system provides:

- Job Match Score
- Matching Skills
- Missing Skills
- AI Suggestions
- Job Match Summary

### ✨ Resume Improvement

AI analyzes the resume and provides:

- Professional Summary
- Improved Skills
- Experience Rewrite
- Project Suggestions
- ATS Keywords
- Final Improvement Tips

### ✉️ AI Cover Letter

Generate personalized cover letters using the uploaded resume and job information.

### 📁 My Documents

Manage AI-generated documents:

- Cover Letters
- Resume Improvements
- Document Preview
- Copy Document
- Delete Document

### 📊 Resume History

View previously analyzed resumes and their results.

### 👤 User Profile

Users can view and manage their account information.

### 🔐 Authentication

Secure authentication system with:

- User Registration
- Login
- JWT Authentication
- Protected Routes
- Logout
- Password Hashing with bcrypt

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT
- bcrypt
- Multer
- PDF.js

## AI

- Groq API
- Llama 3.3 70B

## Database

- PostgreSQL
- Neon PostgreSQL

## Deployment

- Vercel — Frontend
- Render — Backend
- Neon — Database

---

# 🏗️ Architecture

```text
                    ResumeAI
                       │
             ┌─────────┴─────────┐
             │                   │
         Frontend             Backend
          Vercel               Render
             │                   │
             │              ┌────┴────┐
             │              │         │
             │           Prisma      Groq
             │              │          AI
             │              ↓
             │            Neon
             │         PostgreSQL
             │
             └──────── API ──────────┘
