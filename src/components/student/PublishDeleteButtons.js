import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBook, deleteBook } from "../../store/reducers/editorSlice";

const PublishDeleteButtons = ({ bookId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();

        if (e.target.name==="publish") {
            const res = await dispatch(updateBook({
                id: bookId,
                isPublished: true,
            }));
            if (res) {
                alert("Book successfully published!");
                navigate(`/books/${bookId}`);
            }
        } else if (e.target.name==="delete") {
            if (confirm("Are you sure you want to delete this book?")) {
                const res = await dispatch(deleteBook(bookId));
                if (res) {
                    alert("Book successfully deleted!");
                    navigate(`/student`);
                }
            }
        } else {
            // console.log("Unable to process request");
            return;
        }

        // notifications/redirect here
    }
    
    return(
        <div id="publish-delete-container">
            <button id="delete-button" onClick={handleClick} name="delete">Delete Book</button>

            <button id="publish-button" onClick={handleClick} name="publish">Publish Book</button>
        </div>
    )
};

export default PublishDeleteButtons;
