// Import necessary modules
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js'; 
//import Product from '../src/models/productModel.js';

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

// Test CRUD operations for the Product model
describe('Product CRUD operations', () => {
    // Test case for creating a new product
    it('should create a new product', async () => {
        const newProduct = {
            name: 'Test Product',
            description: 'This is a test product',
            price: 10,
            category: 'Test Category',
            quantity: 100,
            batchNumber: '123456',
            dateSold: new Date()
        };

        const response = await request(app)
            .post('/api/products')
            .send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(newProduct.name);
        expect(response.body.description).toBe(newProduct.description);
        // Add more assertions for other fields
    });

    // Add more test cases for other CRUD operations (Read, Update, Delete)
});
