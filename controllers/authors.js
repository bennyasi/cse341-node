const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllAuthors = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('authors').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error occurred while retrieving authors.' });
    }
};

const getAuthorById = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid author id.');
        }
        const authorId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('authors').find({ _id: authorId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error occurred while retrieving author.' });
    }
};

const createAuthor = async (req, res) => {
    try {
        if (!req.body.name || !req.body.nationality) {
            return res.status(400).json({ message: 'Name and nationality are required.' });
        }
        const author = {
            name: req.body.name,
            birthYear: req.body.birthYear,
            nationality: req.body.nationality
        };
        const response = await mongodb.getDatabase().db().collection('authors').insertOne(author);
        if (response.acknowledged) {
            res.status(201).json(response.insertedId);
        } else {
            res.status(500).json(response.error || 'Some error occurred.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateAuthor = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid author id.');
        }
        // Added validation for required fields on update as well
        if (!req.body.name || !req.body.nationality) {
            return res.status(400).json({ message: 'Name and nationality are required for update.' });
        }
        const authorId = new ObjectId(req.params.id);
        const author = {
            name: req.body.name,
            birthYear: req.body.birthYear,
            nationality: req.body.nationality
        };
        const updateResult = await mongodb.getDatabase().db().collection('authors').updateOne({ _id: authorId }, { $set: author });
        if (updateResult.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(updateResult.error || 'Some error occurred or no changes were made.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid author id.');
        }
        const authorId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('authors').deleteOne({ _id: authorId });
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred or author not found.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};