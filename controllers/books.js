const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const result = await db.collection("books").find();
    const books = await result.toArray();

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single book
const getSingleBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);

    const db = mongodb.getDatabase();
    const result = await db.collection("books").findOne({ _id: bookId });

    if (!result) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create book
const createBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      isbn: req.body.isbn,
      publishedYear: req.body.publishedYear,
      available: req.body.available,
      pages: req.body.pages
    };

    const db = mongodb.getDatabase();
    const response = await db.collection("books").insertOne(book);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: "Failed to create book." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update book
const updateBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);

    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      isbn: req.body.isbn,
      publishedYear: req.body.publishedYear,
      available: req.body.available,
      pages: req.body.pages
    };

    const db = mongodb.getDatabase();
    const response = await db.collection("books").replaceOne(
      { _id: bookId },
      book
    );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Book not found." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE book
const deleteBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);

    const db = mongodb.getDatabase();
    const response = await db.collection("books").deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Book not found." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
};
