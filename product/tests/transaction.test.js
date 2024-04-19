// Import necessary modules
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js'; 
//import Transaction from '../src/models/transactionModel.js';

// Initialize the database connection before running tests
beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
});

// Close the database connection after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
});

// Test CRUD operations for the Transaction model
describe('Transaction CRUD operations', () => {
    // Test case for creating a new transaction
    it('should create a new transaction', async () => {
        const newTransaction = {
            // Define transaction data here
        };

        const response = await request(app)
            .post('/api/transactions')
            .send(newTransaction);

        expect(response.status).toBe(201);
        // Add assertions for checking the response data
    });

    // Add more test cases for other CRUD operations (Read, Update, Delete)
});
