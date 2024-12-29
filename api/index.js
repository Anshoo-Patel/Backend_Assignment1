const express = require('express');
const app = express();


// Middleware for parsing JSON bodies
app.use(express.json());


// In-memory data store
let users = [
    { id: '1', firstName: 'Anshika', lastName: 'Agarwal', hobby: 'Teaching' },
    { id: "2", firstName: "Jane", lastName: "Smith", hobby: "Painting" }
];


// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${res.statusCode}`);
    next();
});


// Validation middleware
function validateUser(req, res, next) {
    const { firstName, lastName, hobby } = req.body;
    if (!firstName || !lastName || !hobby) {
        return res.status(400).json({
            error: 'All fields are required.'
        });
    }
    next();
}


// GET method to fetch all the users data
app.get("/users", (req, res) => {
    res.status(200).send(users);
})


//GET method to fetch user data by ID
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === id);
    if(!user){
        return res.status(404).json({
            error: 'User Not Found'
        })
    }
    res.status(200).send(user);
})


// POST method to create new user
app.post("/user", validateUser, (req, res) => {
    const { firstName, lastName, hobby } = req.body;
    let newUser = {
        id: (users.length + 1).toString(),
        firstName: firstName,
        lastName: lastName,
        hobby: hobby
    }

    users.push(newUser);
    res.status(201).send(users);
})


//PUT method to edit user data by ID
app.put("/user/:id", validateUser, (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({
            error: "User Not Found."
        })
    }
    const keys = Object.keys(req.body);
    keys.forEach((key) => {
        user[key] = req.body[key];
    })
    res.status(200).send(user);
})


//DELETE method to remove user by ID
app.delete("/user/:id", (req, res) => {
    const id = req.params.id;
    const deleteUser = users.find((user) => user.id === id);
    if (!deleteUser) {
        return res.status(404).json({
          error: "User Not Found."
        })
    }
    users.splice(deleteUser-1,1);
    res.status(200).send(users);
})


// Start the server
const PORT = //write the port here
app.listen(PORT, () => {
    console.log(`Server is started at ${PORT}.`);
});
