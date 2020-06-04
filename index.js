const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();
const multer = require('multer');
const upload = multer({dest:'uploads/'})


app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

app.set('view engine', '.hbs');

// app.get('/coolProfile', async(req, res) => {
//     let uploadedImage = await req.file.path
//     console.log(uploadedImage);
    
//     res.render('coolProfile', {uploadedImage})
// })


 app.get('/images/:spud', (req, res) => {
     console.log(req.params.spud)
     res.sendFile(
         `/Users/codenationstudent/Desktop/fileuploadchallenge/uploads/${req.params.spud}`
     );
 });

app.get('/coolProfile', async(req, res) => {
    

    res.render('coolProfile', { name: 'dean' });
})

app.post('/profile', upload.single('avatar'), (req, res, next) => {
    let userInput = req.file
    console.log(userInput);

    res.render('profile', {userInput})
})

app.get('/profile', async(req, res) => {
    
    res.render('profile' );
});

app.listen(3000, () =>{
    console.log('listening on port 3000');
})