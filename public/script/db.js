import { MongoClient } from 'mongodb';
import * as oauth from 'oauth4webapi'; // Make sure to use the correct OAuth library
import dotenv from 'dotenv';
import app from "express-session/session/memory.js";

dotenv.config(); // Load environment variables

const url = process.env.MONGODB_URL; // Use environment variable for MongoDB URL

const form = document.getElementById('contactForm');

async function createDatabase(name, email, message) {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected successfully to server");

        const db = client.db('myNewDatabase');
        const collection = db.collection('myCollection');
        await collection.insertOne({ name, email, message }); // Insert form data into the collection
        console.log("Document inserted and database updated!");

        await client.close();
    } catch (err) {
        console.error(err);
    }
}
export createdatabase = createDatabase();
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // try {
    //     // Check if user is authenticated (you need to implement your own check)
    //     const isAuthenticated = /* logic to check if user is authenticated */;
    //     if (isAuthenticated) {
    //         await createDatabase(name, email, message);
    //     } else {
    //         await authenticateUser(); // Redirect to OAuth provider
    //     }
    // } catch (err) {
    //     console.error('Error handling form submission:', err);
    // }
});