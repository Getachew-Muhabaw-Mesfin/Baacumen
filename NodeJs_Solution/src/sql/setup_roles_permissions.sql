-- Create the permissions table with default createdAt and updatedAt values
CREATE TABLE IF NOT EXISTS permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  action VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the roles table with default createdAt and updatedAt values
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the role_permissions table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS role_permissions (
  roleId INT NOT NULL,
  permissionId INT NOT NULL,
  PRIMARY KEY (roleId, permissionId),
  FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (permissionId) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Insert Permissions for Collaboration Board with explicit 'createdAt' and 'updatedAt'
INSERT INTO permissions (action, createdAt, updatedAt) VALUES
  ('Post Request', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Manage Requests', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Respond to Requests', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('View Requests', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Filter Requests', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Notify Users', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Create Event', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('View Event', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('RSVP to Event', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Edit Event', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Delete Event', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Register for Event', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Send Event Reminder', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Roles for Collaboration Board with explicit 'createdAt' and 'updatedAt'
INSERT INTO roles (name, createdAt, updatedAt) VALUES
  ('User', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Roles for Event Management System with explicit 'createdAt' and 'updatedAt'
INSERT INTO roles (name, createdAt, updatedAt) VALUES
  ('Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Event Creator', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Registered User', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Guest', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Assign Permissions to Collaboration Board Roles

-- Admin role gets all permissions related to collaboration board
INSERT INTO role_permissions (roleId, permissionId) 
SELECT r.id, p.id 
FROM roles r
JOIN permissions p ON p.action IN ('Post Request', 'Manage Requests', 'Respond to Requests', 'View Requests', 'Filter Requests', 'Notify Users')
WHERE r.name = 'Admin';

-- User role gets permissions related to posting, responding, and viewing requests
INSERT INTO role_permissions (roleId, permissionId) 
SELECT r.id, p.id 
FROM roles r
JOIN permissions p ON p.action IN ('Post Request', 'Respond to Requests', 'View Requests', 'Filter Requests')
WHERE r.name = 'User';

-- Guest role gets permission to view and filter requests
INSERT INTO role_permissions (roleId, permissionId) 
SELECT r.id, p.id 
FROM roles r
JOIN permissions p ON p.action IN ('View Requests', 'Filter Requests')
WHERE r.name = 'Guest';

-- Assign Permissions to Event Management Roles

-- Admin role gets all permissions related to event management
INSERT INTO role_permissions (roleId, permissionId) 
SELECT r.id, p.id 
FROM roles r
JOIN permissions p ON p.action IN ('Create Event', 'View Event', 'RSVP to Event', 'Edit Event', 'Delete Event', 'Register for Event', 'Send Event Reminder')
WHERE r.name = 'Admin';

-- Event Creator role gets permissions to create, edit, and delete events
INSERT INTO role_permissions (roleId, permissionId) 
SELECT r.id, p.id 
FROM roles r
JOIN permissions p ON p.action IN ('Create Event', 'Edit Event', 'Delete Event')
WHERE r.name = 'Event Creator';

-- Registered User role gets permissions to RSVP and view events
INSERT INTO role_permissions (roleId, permissionId) 
SELECT r.id, p.id 
FROM roles r
JOIN permissions p ON p.action IN ('RSVP to Event', 'View Event')
WHERE r.name = 'Registered User';

-- Guest role gets permission to view events
INSERT INTO role_permissions (roleId, permissionId) 
SELECT r.id, p.id 
FROM roles r
JOIN permissions p ON p.action = 'View Event'
WHERE r.name = 'Guest';

-- Final message to indicate that the script has run successfully
SELECT 'Roles and Permissions have been set up successfully' AS message;
