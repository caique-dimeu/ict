INSERT INTO users (name, email, password_hash, role, avatar) 
VALUES 
('John Doe', 'john.doe@example.com', 'hashedpassword123', 'advisor', 'path_to_avatar'),
('Jane Smith', 'jane.smith@example.com', 'hashedpassword123', 'student', 'path_to_avatar');

INSERT INTO research_groups (title, description, advisor_id) 
VALUES 
('Research Group A', 'Research Group A description', 1);

INSERT INTO projects (title, description, student_id, advisor_id, status, research_group_id) 
VALUES 
('Project A', 'Description of project A', 2, 1, 'em andamento', 1),
('Project B', 'Description of project B', 2, 1, 'em andamento', 1);

INSERT INTO history (project_id, changed_by, status_snapshot, title_snapshot, description_snapshot) 
VALUES 
(1, 1, 'em andamento', 'Initial title A', 'Initial description A'),
(2, 2, 'em andamento', 'Initial title B', 'Initial description B');


INSERT INTO deadlines (project_id, description, due_date, status) 
VALUES 
(1, 'Deadline for project A', '2024-12-10', 'pending'),
(2, 'Deadline for project B', '2024-12-15', 'pending');

INSERT INTO documents (project_id, history_id, file_url, file_type) 
VALUES 
(1, 1, 'url_to_document_A', 'pdf'),
(2, 2, 'url_to_document_B', 'pdf');


INSERT INTO feedbacks (history_id, user_id, content) 
VALUES 
(1, 2, 'Feedback for project A'),
(2, 1, 'Feedback for project B');

INSERT INTO notifications (user_id, message, seen) 
VALUES 
(1, 'Notification for project A', false),
(2, 'Notification for project B', false);

INSERT INTO notification_users (notification_id, receiver_id) 
VALUES 
(1, 2),
(2, 1);
