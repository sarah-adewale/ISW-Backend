// services/transactionService.js

import Transaction from '../models/transaction.js';

// Create a new transaction
export const createTransaction = async (data) => {
    return await Transaction.create(data);
};

// Read a transaction by ID
export const getTransactionById = async (transactionId) => {
    return await Transaction.findById(transactionId);
};


// Update a transaction by ID
export const updateTransaction = async (transactionId, newData) => {
    return await Transaction.findByIdAndUpdate(transactionId, newData, { new: true });
};

// Read all transactions
export const getAllTransactions = async () => {
    return await Transaction.find();
};

// Delete a transaction by ID
export const deleteTransaction = async (transactionId) => {
    return await Transaction.findByIdAndDelete(transactionId);
};
