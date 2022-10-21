import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchBook, setCurrentPage } from "../../store/reducers/editorSlice";
// components
import { EditorBookInfo, PublishDeleteButtons, Pageshelf, TemplateContainer } from "./";
// import { Template1, Template2, Template3, Template4, Template5 } from "./bookTemplates";

const BookEditor = () => {
    const bookId = useParams().id;
    const currentBook = useSelector(state => state.editor.currentBook);
    const currentPage = useSelector(state => state.editor.currentPage);
    const dispatch = useDispatch();

    // const templates = [Template1, Template2, Template3, Template4, Template5];

    const [pages, setPages] = useState([]);

    // if creating new book, gets info from state; if navigating directly to page, fetch from db
    // currently a bug where it is updating state twice in a row
    useEffect(() => {
        if (currentBook.pages && !pages.length) {
            setPages(currentBook.pages);
            // only selects 1st page if no page is selected
            if (!currentPage || !currentPage?.id) {
                // console.log(currentBook.pages[0]);
                dispatch(setCurrentPage(currentBook.pages[0]));
            }
        } else if (!currentBook.id) {
            dispatch(fetchBook(bookId));
        }
    }, [currentBook?.pages]);

    // need to fix bug where this will fetch nothing after deleting a book
    useEffect(() => {
        if (currentBook?.id !== bookId) {
            dispatch(fetchBook(bookId));
        }
    }, [bookId]);

    if (currentBook.isPublished) {
        return (
            <h2>Cannot edit published book!</h2>
        )
    } else if (!currentBook.title) {
        return (
            <h3>Loading...</h3>
        )
    } else {
        return (
            <>
                <div className="outer-div-book-view">

                    <EditorBookInfo book={currentBook} />
                    <Pageshelf />

                    <div className="page-editor">
                        <TemplateContainer templateId={currentPage?.templateId} />
                    </div>

                    <PublishDeleteButtons bookId={currentBook?.id} />
                </div>
            </>
        )
    }
}

export default BookEditor;
