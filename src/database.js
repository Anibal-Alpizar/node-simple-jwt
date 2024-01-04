import { connect } from 'mongoose'

connect('mongodb://localhost/simplejwt')
    .then(db => console.log('DB is connected'))