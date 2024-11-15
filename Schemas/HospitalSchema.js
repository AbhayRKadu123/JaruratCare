// getting-started.js
let mongourl='mongodb+srv://abhaykadu2201:kADLJh6vnnYbXsol@cluster0.l4hdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongourl);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const HospitalData = new mongoose.Schema({
    servicename: String,
    description:String,
    price:Number
  });

  const Data = mongoose.model('HospitalData', HospitalData);

  module.exports=Data