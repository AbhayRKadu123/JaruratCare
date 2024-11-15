const { urlencoded } = require('body-parser');
const express = require('express');
const Data = require('./Schemas/HospitalSchema');
const JoiSchema = require('./JOI');

const app = express();

app.use(urlencoded({ extended: true }));

// Wrapper function to handle async errors
function WrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

app.listen(8080, () => {
  console.log('app is listening');
});

// Get all hospital services
app.get("/Hospital/allservices", WrapAsync(async (req, res) => {
  const result = await Data.find({});
  res.send(result);
}));

// Add new hospital service
app.post("/Hospital/addnewservices", WrapAsync(async (req, res, next) => {
  const { error, value } = JoiSchema.validate(req.body);
  if (!error) {
    const HospitalData = new Data(value);
    const result = await HospitalData.save();
    res.send(result);
  } else {
    next(new Error('Invalid input data'));
  }
}));

// Delete hospital service by ID
app.delete("/Hospital/delete/:id", WrapAsync(async (req, res) => {
  const id = req.params.id;
  const result = await Data.findByIdAndDelete(id);
  res.send(result);
}));

// Edit hospital service by ID
app.patch("/Hospital/edit/:id", WrapAsync(async (req, res) => {
  const id = req.params.id;
  const result = await Data.findByIdAndUpdate(id, req.body, { new: true });
  res.send(result);
}));

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});
