INSERT INTO public.user 
( username,
  password,
  email_address,
  first_name,
  last_name,
  photo_uri,
  about_me,
  creation_date,
  last_update_date 
) VALUES
( 'username',
  '1234',
  'user@gmail.com',
  'First',
  'Last',
  '[INSERT URL]',
  'This is some about me data',
  now(),
  now()
);