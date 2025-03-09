import express from "express";
import { body, validationResult } from "express-validator";
import BookSchema from "../Schema/BookSchema.js";
import authMiddleware from "../middleWare/authMiddleWare.js";

const BooksRoute = express.Router();

BooksRoute.post(
  "/post/books",
  authMiddleware,         //// middleware being used to validate the token here 
 [
    body("Title")             //// express-validator being used to check whether the req.body has required values here
      .isString()
      .withMessage("Title must be a string")
      .notEmpty()
      .withMessage("Title is required"),
    body("Author")
      .isString()
      .withMessage("Author must be a string")
      .notEmpty()
      .withMessage("Author is required"),
  ],
  async (req, res) => {
   
    const errors = validationResult(req);   //// validating the req body here
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { Title, Author } = req.body;
      const book = new BookSchema({      /////schema being used to create new book here
        Title: Title, 
        Author: Author,
        UserId: req.user.userId,
      });

      await book.save();  /// saving to the mongodb

      res.status(200).send({
        message: "Book saved successfully",  /// sending the respposne here with status codes
        status: 200,
        
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: "Error posting book to the db", status: 500 });
    }
  }
);

BooksRoute.get("/get/Books", authMiddleware, async (req, res) => {
  try {
    const listOfBooks = await BookSchema.find();   /// finding all the books
    
    res.status(200).send({
      message: "Books fetched successfully",
      data: listOfBooks,
      status: 200,
    });
  } catch (err) {
   res.status(500).send({ message: "Error fetching books", status: 500 });
  }
});

export default BooksRoute;
