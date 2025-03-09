import React, { useContext, useEffect, useRef, useState } from "react";
import BookCard from "../components/Card";
import AddBookForm from "../components/AddBookForm";
import useFetch from "../hooks/useFetch";
import NewContext from "../context/NewContext";
import CircularIndeterminate from "../components/Loader";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { inputElements } from "../data/Data";
import InputElement from "../components/InputElement";

const DashBoard = () => {
  const LIST_OF_BOOKS = process.env.REACT_APP_GET_BOOKS;  ////getBooksApi //// here the endpoints are being hidden by .env
  const POST_BOOK_URL = process.env.REACT_APP_POST_BOOKS; ////postBooksApi //// here the endpoints are being hidden by .env
  const { booksData, setBooksData } = useContext(NewContext);  //// here the context is being used to display and store  the books data instead of making an get api call everytime user posts////
  const [formData, setFormData] = useState({                ///handles the user input for title and author           
    Title: "",
    Author: "",
  });
  const { data, fetchingData, loading } = useFetch(LIST_OF_BOOKS, "GET");   /////here custom hook is being used to make an api call
  const [searchBook, setSearchBook] = useState("");   ///// for searching the books by title name
  const navigate = useNavigate();   
  const timerRef = useRef(null);
  const [filteredBooksData, setFilteredBooksData] = useState([]);  /// to dosplay the user searched matched books 

  const fetchingBooks = async () => {                      /// here the function is called when the user posts the book
    try {
      await fetchingData(formData, "POST", POST_BOOK_URL); /// making post request
      setBooksData([...booksData, formData]);  /// here instead of making an api call which is costly i am storing it in the context
    } catch (err) {
      return err.message;
    }
  };

  const handleInputChange = (e) => {             //// to handle inputs for title and author
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {    
    localStorage.removeItem("token");
    navigate("/signIn");
  };

  const debouncingFunction = () => {  /// here the filter function will get called only when the user stops typing for 500ms insatead of making call everytime
    return function filterBySearch() {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const data = booksData.filter((item) => {
          return item.Title.toLowerCase().includes(searchBook.toLowerCase());
        });

        setFilteredBooksData(data);
      }, 500);
    };
  };

  useEffect(() => {
    if (data.data) {
      setBooksData(data.data);
    }
  }, [data]);

  useEffect(() => {
    const filterFunction = debouncingFunction();
    filterFunction();
  }, [searchBook]);            /// whenever the searchbook variable changes the debouncing function gets called

  return (
    <>
      <Header SubMenu3={"Logout"} handleLogout={handleLogout} />
      <div style={{ textAlign: "center" }}>
        <h3>Books</h3>
      </div>

      <AddBookForm
        inputElements={inputElements}
        formData={formData}
        handleInputChange={handleInputChange}
        onSubmit={fetchingBooks}
      />
      <div style={{ textAlign: "center" }}>
        {" "}
        <InputElement
          onChange={setSearchBook}
          placeholder={"Search By Title"}
        />
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <CircularIndeterminate />
        </div>
      ) : (
        <div className="container mt-4">
          <div className="row">
            {filteredBooksData.length > 0
              ? filteredBooksData.map((item, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <BookCard title={item?.Title} author={item?.Author} />
                  </div>
                ))
              : booksData?.map((item, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <BookCard title={item?.Title} author={item?.Author} />
                  </div>
                ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DashBoard;
