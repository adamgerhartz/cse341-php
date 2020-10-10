# For now we just want the user to have one photo. If I were to scale this 
# project, I'd create a photo table. 
CREATE TABLE public.user (
	user_id SERIAL NOT NULL PRIMARY KEY,
	username VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL,
	email_address VARCHAR(100) NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL, 
	photo_uri VARCHAR,
	about_me TEXT,
	creation_date TIMESTAMP NOT NULL,
	last_update_date TIMESTAMP NOT NULL
);

# The Relationship table will handle the user/friend relationship. 
# You will notice two user id's inside the table. This is because a relationship 
# is between two and only two users. Those user id's together make up a composite key.
# The type handles the status of the relationship: blocled, friends, pending request
CREATE TABLE public.relationship (
	user_one_id INT NOT NULL REFERENCES public.user(user_id),
	user_two_id INT NOT NULL REFERENCES public.user(user_id),
	type VARCHAR(15) NOT NULL,
	PRIMARY KEY(user_one_id, user_two_id) 
);

# The purpose for creating a thread table is so we can know the owner of the thread. 
# The owner of the thread is the user whose profile page the thread was created. The 
# owner user may delete the thread from the user's page
# A user may have many threads. 
# If user B posts on user A's profile, then user B's id is created with the post, but user A's id
# is used for the thread.
CREATE TABLE public.thread (
	thread_id SERIAL NOT NULL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES public.user(user_id),
	creation_date TIMESTAMP NOT NULL
);

# A Thread may have many posts. A post will be created by one user. A post will be located in one thread.
# Posts may be deleted by the user who created the post. The post won't be deleted until the thread is deleted by the thread owner.
CREATE TABLE public.post (
	post_id SERIAL NOT NULL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES public.user(user_id),
	thread_id INT NOT NULL REFERENCES public.thread(thread_id),
	post TEXT NOT NULL,
	creation_date TIMESTAMP NOT NULL,
	last_update_date TIMESTAMP NOT NULL,
	is_deleted BOOLEAN NOT NULL,
	deletion_date TIMESTAMP
);

# Users get notifications wqhen they have received an incoming friend request, 
# an outgoing friend request was approved, when a friend posts on their page, and 
# as a welcome when the user first regisiters and logs in
CREATE TABLE notification (
	notification_id SERIAL NOT NULL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES public.user(user_id),
	type VARCHAR(10) NOT NULL,
	notification TEXT NOT NULL,
	creation_date TIMESTAMP NOT NULL
);




