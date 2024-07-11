const express = require('express');
// const bodyParser = require('body-parser');
//design API for patient
const app = express();

// app.use(bodyParser.json());
// app=express.Router();
app.get('/patient', (req, res) => {
    const patient = [];
    // code to patient a patient...
    res.json(patient);
});

app.post('/patient', (req, res) => {
    // code to add a new patient...
    res.json(req.body);
});

app.put('/patient/:id', (req, res) => {
    const { id } = req.params;
    // code to update a patient...
    res.json(req.body);
});

app.delete('/patient/:id', (req, res) => {
    const { id } = req.params;
    // code to delete a patient...
    res.json({ deleted: id });
});

app.listen(3000, () => console.log('server started'));