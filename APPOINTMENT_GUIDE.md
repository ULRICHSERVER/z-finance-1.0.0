# Z-FINANCE 1.0.0 - Appointment Management Guide

## Overview
The Appointment Management System enables seamless client consultations, service bookings, and staff allocations.

## Core Capabilities
- **Customer & Service Appointments**: Unique appointment numbers (`APT-YYYYMMDD-XXXX`), customer details, assigned staff, duration, and service name.
- **Statuses**: Requested, Pending Approval, Confirmed, Completed, Cancelled, Rescheduled, No Show.
- **Payment Integration**: Unpaid, Partially Paid, Paid, Refunded status tracking.
- **REST API Endpoints**:
  - `GET /modules/appointments/api/appointments.php?action=get_appointments`
  - `POST /modules/appointments/api/appointments.php?action=create_appointment`
