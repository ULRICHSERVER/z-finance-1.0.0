# Z-FINANCE 1.0.0 - Task Management Guide

## Overview
The Task Management Engine enables teams to create, assign, and monitor unlimited tasks within projects.

## Core Features
- **Task Attributes**: Task Number (`TSK-XXXXX`), Title, Description, Assigned User, Priority, Start Date, Deadline, Status, Progress %, Estimated/Actual Hours.
- **Task Status Progression**: New → Assigned → In Progress → Waiting → Review → Completed → Cancelled.
- **Task Priorities**: Low, Medium, High, Urgent, Critical.
- **Comments & Attachments**: Task discussion threads, @mentions, file attachments (PDFs, Specifications, Images, Contracts).

## REST API Endpoint
`GET /modules/tasks/api/tasks.php?project_id=1`
`POST /modules/tasks/api/tasks.php`
