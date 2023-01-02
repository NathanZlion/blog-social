# Url to operate with this program

# 1. Run the program

    `npm start` is the command to startit.

# 2. use Postman or whatever to send requests to it at localhost , port 5000

# 2.1. USER SIGNUP \_\_success

    use: `http:localhost:5000/api/user/signup` and use `post` with body content in json format

    { name, email, password }

# 2.2. USER LOGIN \_\_success

    use: `localhost:5000/api/user/login` with a `post` request with a body json content
    { email, password }

# 2.7. GET ALL USERS \_\_success

    Simply use: `localhost:5000/api/user/`

# 2.3. ADD BLOG \_\_

    use: `localhost:5000/api/blog/add` with `post` request with a json content of
    { title, description, image, user }

# 2.8. GET ALL BLOGS
    use: `localhost:5000/api/blog/`

# 2.4. UPDATE BLOG

# 2.5. DELETE BLOG

# 2.6. GET BLOG BY USER ID
