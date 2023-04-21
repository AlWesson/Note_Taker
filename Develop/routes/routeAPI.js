//Dependencies for API route
const router = require('express').Router();
const fs = require('fs');
//creates unique id's based on the current time, process and machine name.
const uniqid = require('uniqid');

router.get('/api/notes', (req, res) => {
    fs.readFile('../db/db.json', (err, data) => {
        if(err){
            return res.status(500).json({err});
        }
        res.send(data);
    });
});
// post request to /api/notes 
router.post('/api/notes', (req, res) => {
    // create new note/object containing id, title, and text. Id genenrated with uniqid, and title and text are gotten through req.body. 
    let nextNote = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text,
    }
    fs.readFile('../db/db.json', (err, data) => {
        if(err){
            return res.status(500).json({err});
        }
        else{
        // create new variable for parsed data.
        let nextData = JSON.parse(data);
        // push parsed data into nextNote
        nextData.push(nextNote);
        }
        fs.writeFile('../db/db.json', JSON.stringify(nextData), (err) =>{
            if(err){
                return res.status(500).json({err});
            }
            
        });
    });
});

/*router.delete('/api/notes/:id', (req, res) => {

});*/
module.exports = router;