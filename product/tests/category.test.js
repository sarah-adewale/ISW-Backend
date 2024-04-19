// Import necessary modules
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js'; 
//import Category from '../src/models/categoryModel.js';

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

// Test CRUD operations for the Category model
describe('Category CRUD operations', () => {
    // Test case for creating a new category
    it('should create a new category', async () => {
        const newCategory = {
            name: 'Test Category'
        };

        const response = await request(app)
            .post('/api/categories')
            .send(newCategory);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(newCategory.name);
        // Add more assertions for other fields if needed
    });

    // Add more test cases for other CRUD operations (Read, Update, Delete)
});
