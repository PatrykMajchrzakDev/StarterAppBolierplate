To add authorization provide token as a header to backend Authorization url

const userResponse = await fetch('http://localhost:5000/api/users/me', {
headers: { Authorization: `Bearer ${token}` },
});

I probably didn't add this route to backend so it would have to be added before trying to access it.
Check /backend/middleware/Auth/protectedRoutes.md
