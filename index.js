const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
})
const fs = require('fs');


app.use(express.static(path.join(__dirname, 'uploads')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

app.set('view engine', '.hbs');

app.get('/coolProfile', async (req, res) => {
    let content = fs.readdirSync(__dirname + '/uploads')
    console.log(content)
    res.render('coolProfile', {
        content
    });
})


//  app.get('/images/:spud', (req, res) => {
//      console.log(req.params.spud)
//      res.sendFile(
//     `/Users/codenationstudent/Desktop/fileuploadchallenge/uploads/${req.params.spud}`
//      );
//  });

// app.get('/coolProfile', async(req, res) => {


//     res.render('coolProfile', { name: 'dean' });
// })

app.post('/profile', upload.single('avatar'), (req, res, next) => {
    let userInput = req.file

    res.render('profile', {
        userInput
    })
})

app.get('/profile', async (req, res) => {

    res.render('profile');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
})