const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res, next) => {
  try {
    const result = await mongodb.getDatabase().db().collection('books').find();
    const books = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while retrieving books.' });
  }
};

const getBookById = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid book id to find a book.');
    }
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('books').find({ _id: bookId });
    const books = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error occurred while retrieving the book.' });
  }
};

const createBook = async (req, res, next) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      genre: req.body.genre
    };
    const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the book.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error occurred while creating the book.' });
  }
};

const updateBook = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid book id to update a book.');
    }
    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      genre: req.body.genre
    };
    const response = await mongodb.getDatabase().db().collection('books').replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error occurred while updating the book.' });
  }
};

const deleteBook = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid book id to delete a book.');
    }
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the book.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error occurred while deleting the book.' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};