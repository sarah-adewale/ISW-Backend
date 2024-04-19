import * as transactionService from '../services/transactionService.js';

// Create a new transaction
export const createTransaction = async (req, res) => {
    try {
        const transaction = await transactionService.createTransaction(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a transaction by ID
export const getTransactionById = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const transaction = await transactionService.getTransactionById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a transaction by ID
export const updateTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const newData = req.body;
        const updatedTransaction = await transactionService.updateTransaction(transactionId, newData);
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a transaction by ID
export const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const deletedTransaction = await transactionService.deleteTransaction(transactionId);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all transactions
export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
