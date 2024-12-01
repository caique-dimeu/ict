\c ict_database

CREATE TYPE user_role AS ENUM ('student', 'advisor', 'admin');
CREATE TYPE project_status AS ENUM ('em andamento', 'finalizado', 'rejeitado', 'atrasado');
CREATE TYPE history_status AS ENUM ('em andamento', 'finalizado', 'rejeitado', 'atrasado');
CREATE TYPE feedback_status AS ENUM ('pending', 'completed');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE research_groups (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    advisor_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (advisor_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    student_id INT NOT NULL,
    advisor_id INT,
    status project_status DEFAULT 'em andamento',
    research_group_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (advisor_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (research_group_id) REFERENCES research_groups(id) ON DELETE SET NULL
);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    changed_by INT NOT NULL,
    status_snapshot history_status NOT NULL,
    title_snapshot VARCHAR(255),
    description_snapshot TEXT,
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    seen BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notification_users (
    notification_id INT NOT NULL,
    receiver_id INT NOT NULL,
    PRIMARY KEY (notification_id, receiver_id),
    FOREIGN KEY (notification_id) REFERENCES notifications(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    history_id INT NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    file_type VARCHAR(20) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (history_id) REFERENCES history(id) ON DELETE CASCADE
);

CREATE TABLE feedbacks (
    id SERIAL PRIMARY KEY,
    history_id INT NOT NULL,
    user_id INT NOT NULL,
    parent_feedback_id INT DEFAULT NULL,
    content TEXT NOT NULL,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (history_id) REFERENCES history(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_feedback_id) REFERENCES feedbacks(id) ON DELETE SET NULL
);

CREATE TABLE deadlines (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    status feedback_status DEFAULT 'pending',
    completion_date TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    can_edit_project BOOLEAN DEFAULT FALSE,
    can_manage_users BOOLEAN DEFAULT FALSE,
    assigned_by INT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE CASCADE
);
