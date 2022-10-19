import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Popup from 'reactjs-popup';
import { updateBook } from "../../store/reducers/editorSlice";

// need to separate popup forms into separate component at some point
const EditorBookInfo = ({ book }) => {
    const titleRef = useRef();
    const genreRef = useRef();
    const dispatch = useDispatch();

    const handleSubmit = async (e, close) => {
        e.preventDefault();
        console.log(book.id);

        if (titleRef.current?.value) {
            dispatch(updateBook({
                id: book.id,
                title: titleRef.current.value
            }));
        } else if (genreRef.current?.value) {
            dispatch(updateBook({
                id: book.id,
                genre: genreRef.current.value
            }))
        }
        // handle image uploading here
    };

    if (!book?.id) {
        return("Loading...");
    } else {
        return(
            <div id="basicInfoContainer">
                <div className="attribute">
                    <h2>{`"${book.title}"`}</h2>
                    <Popup modal className="edit-book-attribute" trigger={<button>✏️</button>}>
                        {close => (
                            <div className="edit-book-popup-form">
                                <h3>Update your book title:</h3>
                                <form id="title">
                                    <input type="text"
                                        name="title"
                                        ref={titleRef}
                                        defaultValue={book.title}>
                                    </input>
                                    <button id="new-book-btn" type="submit" onClick={(e)=>handleSubmit(e,close)}>Submit</button>
                                </form>
                                <p onClick={close} id="close-popup">Cancel</p>
                            </div>
                        )}
                    </Popup>
                </div>

                <div className="attribute">
                    <p>{`Genre: ${book.genre}`}</p>
                    <Popup modal className="edit-book-attribute" trigger={<button>✏️</button>}>
                        {close => (
                            <div className="edit-book-popup-form">
                                <h3>Change your book's genre:</h3>
                                <form>
                                    <select name="genre" ref={genreRef}>
                                        <option value="">Select</option>
                                        <option value="racecar">Racecar</option>
                                        <option value="spooky">Spooky</option>
                                    </select>
                                    <button id="new-book-btn" type="submit" onClick={(e)=>handleSubmit(e,close)}>Submit</button>
                                </form>
                                <p onClick={close} id="close-popup">Cancel</p>
                            </div>
                        )}
                    </Popup>
                </div>

                <div className="attribute">
                    <p>{`Update cover art: `}</p>
                    <Popup modal className="edit-book-attribute" trigger={<button>✏️</button>}>
                        {close => (
                            <div className="edit-book-popup-form">
                                <h3>Upload cover art:</h3>
                                <form>
                                    <p>Cloudinary placeholder</p>
                                    <button id="new-book-btn" type="submit" onClick={() => console.log("Placeholder")}>Submit</button>
                                </form>
                                <p onClick={close} id="close-popup">Cancel</p>
                            </div>
                        )}
                    </Popup>
                </div>

                <p>{`${book.totalPages} pages`}</p>
                {/* publish button here */}
            </div>
        )
    }
};

export default EditorBookInfo;
