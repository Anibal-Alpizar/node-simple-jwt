import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/simplejwt')
    .then(db => console.log('DB is connected'))