//Dependencies for API route
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
//creates unique id's based on the current time, process and machine name.
const db = path.join(__dirname, '../db/db.json');
const uniqid = require('uniqid');

router.get('/api/notes', (req, res) => {
    fs.readFile(db, (err, data) => {
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
    fs.readFile(db, (err, data) => {
        if(err){
            return res.status(500).json({err});
        }
        
        // create new variable for parsed data.
        let nextData = JSON.parse(data);
        // push parsed data into nextNote
        nextData.push(nextNote);
        
        fs.writeFile(db, JSON.stringify(nextData), (err) => {
            if(err){
                return res.status(500).json({err});
            }
            
        });
        res.json(nextNote);
    });
    
});

/*router.delete('/api/notes/:id', (req, res) => {

});*/
module.exports = router;