import React, { Fragment, useContext, useEffect, useState } from "react";

import { AuthContext } from "./auth/Auth";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";

function SnapshotFirebaseAdvanced() {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [genre, setGenre] = useState("");
  const [cover, setCover] = useState("");

  const ref = firebase.firestore().collection("Books");

  //REALTIME GET FUNCTION
  function getBooks() {
    setLoading(true);
    ref
      //.where('owner', '==', currentUserId)
      //.where('title', '==', 'Book1') // does not need index
      //.where('score', '<=', 10)    // needs index
      //.orderBy('owner', 'asc')
      //.limit(3)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setBooks(items);
        setLoading(false);
      });
  }

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, []);

  // ADD FUNCTION
  function addBook() {
    const owner = currentUser ? currentUser.uid : "unknown";
    const ownerEmail = currentUser ? currentUser.email : "unknown";
    const newBookT = {
      title,
      author,
      genre,
      desc,
      cover,
      id: title,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const newBook = {
      name: title,
      state: author,
      country: genre,
      audio: [
        {
          chapter: title + "Chapter 1",
          url: cover + "url1",
        },
      ],
      id: title,
    };

    ref
      .doc(newBook.id)
      .set(newBook)
      .catch((err) => {
        console.error(err);
      });
  }

  //DELETE FUNCTION
  function deleteBook(book) {
    ref
      .doc(book.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  // EDIT FUNCTION
  function editBook(book) {
    const updatedBook = {
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    setLoading();
    ref
      .doc(book.id)
      .update(updatedBook)
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Fragment>
      <h1>Add Books </h1>
      <div className="inputBox">
        <h3>Add New</h3>
        <h6>Title</h6>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h6>Author</h6>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <h6>Categorie</h6>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <h6>Description</h6>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <h6>Image</h6>
        <textarea value={cover} onChange={(e) => setCover(e.target.value)} />
        <button onClick={() => addBook()}>Submit</button>
      </div>
      <hr />
      <h2>Db books</h2>
      {loading ? <h1>Loading...</h1> : null}
      {books.map((book) => (
        <div className="book" key={book.id}>
          <h2>Title: {book.title}</h2>
          <h3>Author: {book.author}</h3>
          {book.genre ? (
            <h3>Category: {book.genre}</h3>
          ) : (
            <h5 className="noField">Nu exista categorie</h5>
          )}
          <p>Description: {book.desc}</p>

          <img className="bookCover" src={book.cover} alt={book.title} />
          <div>
            <button onClick={() => deleteBook(book)}>X</button>
            <button onClick={() => editBook(book)}>Edit Score</button>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default SnapshotFirebaseAdvanced;
