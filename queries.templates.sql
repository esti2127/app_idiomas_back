ALTER TABLE users RENAME COLUMN create_at TO created_at;

CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('user', 'admin')) DEFAULT 'user',
	is_active BOOLEAN NOT NULL DEFAULT true,
	create_at TIMESTAMP DEFAULT NOW()
  
);


CREATE TABLE lessons (
    id_lesson SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    level VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('vocabulary', 'grammar', 'reading')), 
    is_published BOOLEAN NOT NULL DEFAULT true
);



ALTER TABLE lessons DROP CONSTRAINT IF EXISTS lessons_type_check;


UPDATE lessons SET type = 'vocabulary' WHERE type IN ('lexiko', 'VOCABULARY', 'vocabulary');
UPDATE lessons SET type = 'grammar' WHERE type IN ('gramatika', 'GRAMMAR', 'grammar');
UPDATE lessons SET type = 'reading' WHERE type IN ('irakurketa', 'READING', 'reading');


ALTER TABLE lessons 
    ADD CONSTRAINT lessons_type_check 
    CHECK (type IN ('vocabulary', 'grammar', 'reading'));



ALTER TABLE lessons 
    ALTER COLUMN type TYPE VARCHAR(20);

-- CREATE TABLE lessons (
--     id_lesson SERIAL PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     level VARCHAR(200) NOT NULL,
--     type VARCHAR(10) NOT NULL CHECK (type IN ('lexiko', 'gramatika','irakurketa')),
-- 	is_published BOOLEAN NOT NULL DEFAULT true
-- );



UPDATE lessons 
SET level = 'B1' 
WHERE id_lesson = 5;






CREATE TABLE questions (
    id_question SERIAL PRIMARY KEY,
    id_lesson INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('Fill in the blank', 'multiple choice')), 
    CONSTRAINT fk_questions_lesson
    FOREIGN KEY (id_lesson) REFERENCES lessons(id_lesson) ON DELETE CASCADE
);


ALTER TABLE questions 
    DROP CONSTRAINT IF EXISTS questions_type_check;

UPDATE questions SET type = 'Fill in the blank' WHERE type = 'betetzeko';
UPDATE questions SET type = 'multiple choice' WHERE type = 'aukera-desberdinak';

ALTER TABLE questions 
    ADD CONSTRAINT questions_type_check 
    CHECK (type IN ('Fill in the blank', 'multiple choice'));


DELETE FROM questions 
WHERE id_question = 15;



-- CREATE TABLE questions (
--     id_question SERIAL PRIMARY KEY,
-- 	id_lesson INTEGER NOT NULL,
--     question_text TEXT NOT NULL,
--     type VARCHAR(20) NOT NULL CHECK (type IN ('betetzeko', 'aukera-desberdinak')),
-- 	order_index INTEGER NOT NULL DEFAULT 1,
-- 	CONSTRAINT fk_questions_lesson
-- 	FOREIGN KEY (id_lesson) REFERENCES lessons(id_lesson) ON DELETE CASCADE
-- );

CREATE TABLE users_progress (
    id_user_progress SERIAL PRIMARY KEY,
	id_user INTEGER NOT NULL,
	id_lesson INTEGER NOT NULL,
	is_completed BOOLEAN NOT NULL DEFAULT false,
	completed_at TIMESTAMP,
	score INTEGER DEFAULT 0,
	CONSTRAINT fk_users_progress_user
	FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
	CONSTRAINT fk_users_progress_lesson
	FOREIGN KEY (id_lesson) REFERENCES lessons(id_lesson) ON DELETE CASCADE
);


CREATE TABLE answers (
    id_answer SERIAL PRIMARY KEY,
	id_question INTEGER NOT NULL,
	answer_text TEXT NOT NULL,
	is_correct BOOLEAN NOT NULL DEFAULT false,
	CONSTRAINT fk_answers_question
	FOREIGN KEY (id_question) REFERENCES questions(id_question) ON DELETE CASCADE
);







INSERT INTO users (name, email, password_hash, role)
VALUES
('Pepe', 'pepe@gmail.com', '1968', 'user'),

('Ana', 'ana@gmail.com', '1971', 'user'),

('Juan', 'juan@gmail.com', '2002', 'user'),

('Maite', 'maite@gmail.com', '2002', 'admin'),

('Rafa', 'rafa@gmail.com', '2007', 'admin');