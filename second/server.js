const express = require("express")
const dotenv = require("dotenv")
const multer = require("multer")
const cors = require("cors")
const connectDB = require("./config/db.js")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

let port = process.env.port
if (!port) {
    port = 3000
}

connectDB()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/webp") {
        cb(null, true)
    }
    else {
        cb(new Error("Only PNG, JPEG and WEBP files are allowed"))
    }
}

const upload = multer({
    storage, fileFilter, limits: {
        fileSize: 2 * 1024 * 1024
    }
})
app.post("/upload", (req, res) => {

    upload.single("productImage")(req, res, (err) => {

        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }


        console.log(req.file)

        res.json({
            message: "File uploaded successfully",
            file: req.file
        })


    })

})

app.post("/upload-multiple", (req, res) => {


    upload.array("productImages", 5)(req,res,(err)=>{
        if(err){
            return res.status(400).json({
                success:false,
                message:err.message
            })
        }
        console.log(req.files)
        res.status(200).json({
            success:true,
            message:"files uploaded successfully",
            files:req.files
        })
    })
    

})
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes)
app.listen(port, () => {
    console.log(` -- server is running on port ${port} -- `)
})