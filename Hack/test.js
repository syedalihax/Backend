const express = require("express")
const app = express()

app.use(express.json());

app.post("/users", (req, res) => {
    console.log(req.body);

    res.status(201).json({
        message: "User created"
    });
});

app.listen(3000 , ()=>{
    console.log("server is running...")
})