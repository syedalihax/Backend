const fs = require('fs')
const folder = 'hello'
const file = 'test.txt'
const FData = 'I am dummy Data.'

// Copy Folder

// fs.cp('hello', './copies/helloi', {recursive: true} , function (err) {
//     if (err) console.log(err)
//     else {
//         console.log('Folder copied')
//     }
// })

// Delete Folder

// fs.rm('jane man', {recursive : true} , function (err) {
//     if (err) console.log(`Error : ${err}`)
//     else {
//         console.log("The Folder has been removed")
//     }
// })

// Rename Folder

// fs.rename('copyfiles', 'copy', function (err) {
//     if (err) {
//         console.log("Error:", err);
//     } else {
//         console.log(`Folder Rename ho gaya`);
//         console.log(`Renamed Folder : copy hay`);
//     }
// })

// Create Folder

// fs.mkdir('copyfiles' , function (err) {
//     if (err) {
//         console.log("Error:", err);
//     } else {
//         console.log(`Folder ban gaya`);
//         console.log(`Folder ka naam: Folder ka naam : copyfiles hay`);
//     }
// })

// Read Folder

// fs.readdir("hello", function (err, filesName) {
//     if (err) {
//         console.log("Error:", err);
//     } else {
//         console.log(`Folder ka Data Mil gaya`);
//         console.log(`Folder me ye files hay :`);
//         console.log(filesName);
//     }
// })

// delete file

// fs.unlink('./copyfiles/textfile ka copy .txt', function (err) {
//     if (err) {
//         console.log("Error:", err);
//     } else {
//         console.log(`File Delete hogaya`);
//     }
// })

// copy file

// fs.copyFile('textFile.txt', './copyfiles/textfile ka copy .txt', function (err) {
//     if (err) {
//         console.log("Error:", err);
//     } else {
//         console.log(`file copy ho gaya`);
//         console.log(`file ka naam: textfile ka copy .txt <-- hay`);
//     }
// })

// Rename file

// fs.rename('test.txt', 'textFile.txt', function (err) {
//     if (err) {
//         console.log("Error:", err);
//     } else {
//         console.log(`File ka file ka naam change hogaya`);
//         console.log(`File ka naam: textFile.txt`);
//     }
// })

// Read file

// fs.readFile(file, 'utf-8', function (err, data) {
//     if (err) {
//         console.log("Error:", err);
//     } else {
//         console.log(`File ka data yeh hai:${data}`);
//     }
// })

// adding data in existing file

// fs.appendFile(file , FData , function (err) {
//     if (err) console.log(err.message)
//     else {
//         console.log(`Data Appended succesfully in this File ${file}`)
//     }
// })

// create file

// fs.writeFile(file, FData, function (err) {
//     if (err) console.log(err.message)
//     else {
//         console.log(`File created succesfully`)
//         console.log(`File Name is ${file}`)
//     }
// })