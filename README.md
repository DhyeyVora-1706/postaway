Node.js RESTful API with User Authentication, Post Management, Comments, Likes, Friendships, and Profile Updates.
This project implements a comprehensive RESTful API built with Node.js (backend server), ExpressJS (web framework), and MongoDB (NoSQL database). It offers a rich set of functionalities for user management, data interaction, and social networking capabilities.

Core Functionalities

    1. User Authentication:
        Secure user signup, login, and logout for platform access control.
    
    2. Post Management:
        CRUD (Create, Read, Update, Delete) operations for posts, empowering users to:

            Create posts with captions and image URLs.
            Edit and delete posts, with ownership checks for security.

    3. Comment System:
        Allows users to add, update, and delete comments on posts.
        Implements access control for comment editing/deletion (post owner or commenter).

    4. Like Functionality:
        Creates a like system for posts, seamlessly integrating with MongoDB.
        Populates documents and displays like counts to enhance user engagement.

    5. Friendship Features:
        Users can send, accept, reject, and cancel friend requests.
        Enables management of friend lists and pending requests.

    6. User Profile Updates:
        Users can modify their profiles with essential fields for personalization (e.g., name, gender).

    7. OTP-Based Password Reset:
        Strengthens security by enabling password resets using One-Time Passwords (OTPs) sent via email.
