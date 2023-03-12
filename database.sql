CREATE TABLE "tasks" (
	"id" serial primary key,
	"tasks" varchar(80),
	"completed" boolean,
	"notes" varchar(120) not null
	);
	
INSERT INTO "tasks" 
	( "tasks", "completed", "notes")
VALUES
('Go get groceries', false, 'get done fast!'),
('Get gas', false, 'ask for money'),
('Fix tire', false, 'check tire pressure');