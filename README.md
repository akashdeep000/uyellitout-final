# Uyellitout – Mental Health Counseling Platform

Uyellitout is a full-stack mental health counseling platform designed for online consultations, assessments, and real-time user engagement. It combines secure authentication, paid appointment booking, analytics-driven quizzes, and automated notifications.

## Features

- **Custom Appointment Booking**
  - Schedule, reschedule, and manage counseling sessions
  - Integrated Razorpay payments

- **Authentication**
  - Email & Google OAuth using **BetterAuth**

- **User & Admin Dashboards**
  - User: bookings, quiz results, mental health insights
  - Admin: users, bookings, quizzes, blogs, availability

- **Mental Health Quizzes**
  - Dynamic scoring and result visualization
  - Metrics-based mental health insights

- **Real-time Notifications**
  - WhatsApp and Email notifications for booking updates

- **Modern UI**
  - Responsive, accessible interface built with Tailwind CSS

## Tech Stack

- **Frontend**: React, Next.js (App Router), Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: MongoDB
- **ORM**: Prisma
- **Authentication**: BetterAuth
- **Payments**: Razorpay
- **Notifications**: WhatsApp API, SMTP Email

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance
- Razorpay account
- Google OAuth credentials

### Installation

```bash
git clone https://github.com/your-username/uyellitout.git
cd uyellitout
npm install

