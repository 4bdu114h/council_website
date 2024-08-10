CREATE TYPE "Academic_year" AS ENUM (
  'First',
  'Second',
  'Third',
  'Fourth'
);

CREATE TYPE "Target_audience" AS ENUM (
  'UG Students',
  'PG Students'
);

CREATE TYPE "Certificate_type" AS ENUM (
  'Individual',
  'Team'
);

CREATE TYPE "Approval_status" AS ENUM (
  'Approved',
  'Pending',
  'Rejected'
);

CREATE TYPE "Certificate_level" AS ENUM (
  'Inter College',
  'Intra College',
  'Regional',
  'National',
  'International'
);

CREATE TABLE "councils" (
  "council_id" int PRIMARY KEY,
  "council_name" varchar
);

CREATE TABLE "tenure" (
  "tenure_id" int PRIMARY KEY,
  "tenure" varchar
);

CREATE TABLE "members" (
  "council_id" int,
  "tenure_id" int,
  "member_id" int PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "designation" varchar,
  "branch" varchar,
  "academic_year" Academic_year,
  "roll_number" int,
  "email" varchar,
  "contact" int
);

CREATE TABLE "activities" (
  "activity_id" int PRIMARY KEY,
  "council_id" int,
  "tenure_id" int,
  "date_of_activity" date,
  "name_of_activity" varchar,
  "activity_type" varchar,
  "name_of_the_organizer" varchar,
  "start_date_of_activity" date,
  "end_date_of_activity" date,
  "target_audience" Target_audience,
  "no_of_hours" int,
  "no_of_participants" int,
  "description" varchar2,
  "pamplets" image,
  "activity_photos" varbinary
);

CREATE TABLE "certificates" (
  "certificate_id" int PRIMARY KEY,
  "member_id" int,
  "tenure_id" int,
  "name_of_certificate" varchar,
  "date_of_issue" date,
  "start_date_of_certificate" date,
  "end_date_of_certificate" date,
  "issue_by" varchar,
  "certificate_type" Certificate_type,
  "level" Certificate_level,
  "certificate_description" varchar2,
  "certificate_image" varbinary,
  "certificate_photos" varbinary
);

CREATE TABLE "faculty_incharge" (
  "facuty_name" varchar,
  "council_id" int,
  "faculty_id" int PRIMARY KEY
);

CREATE TABLE "member_faculty_approval" (
  "member_approval_id" int PRIMARY KEY,
  "member_id" int,
  "approval_status" Approval_status
);

CREATE TABLE "certificate_faculty_approval" (
  "certificate_approval_id" int PRIMARY KEY,
  "certificate_id" int,
  "approval_status" Approval_status
);

CREATE TABLE "activity_faculty_approval" (
  "activity_approval_id" int PRIMARY KEY,
  "activity_id" int,
  "approval_status" Approval_status
);

ALTER TABLE "members" ADD FOREIGN KEY ("council_id") REFERENCES "councils" ("council_id");

ALTER TABLE "faculty_incharge" ADD FOREIGN KEY ("council_id") REFERENCES "councils" ("council_id");

ALTER TABLE "activities" ADD FOREIGN KEY ("council_id") REFERENCES "councils" ("council_id");

ALTER TABLE "certificates" ADD FOREIGN KEY ("member_id") REFERENCES "members" ("member_id");

ALTER TABLE "member_faculty_approval" ADD FOREIGN KEY ("member_id") REFERENCES "members" ("member_id");

ALTER TABLE "certificate_faculty_approval" ADD FOREIGN KEY ("certificate_id") REFERENCES "certificates" ("certificate_id");

ALTER TABLE "activity_faculty_approval" ADD FOREIGN KEY ("activity_id") REFERENCES "activities" ("activity_id");

ALTER TABLE "members" ADD FOREIGN KEY ("tenure_id") REFERENCES "tenure" ("tenure_id");

ALTER TABLE "activities" ADD FOREIGN KEY ("tenure_id") REFERENCES "tenure" ("tenure_id");

ALTER TABLE "certificates" ADD FOREIGN KEY ("tenure_id") REFERENCES "tenure" ("tenure_id");
