import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");

const initialState = {
    currentBook: {},
    currentPage: {},
    currentText: "",
    uploadedImg: "",
};

const editorSlice = createSlice({
    name: "editorSlice",
    initialState: initialState,
    reducers: {
        setBook: (state, action) => {
            return {
                ...state,
                currentBook: action.payload
            };
        },
        _updateBook: (state, action) => {
            return {
                ...state,
                currentBook: {
                    ...state.currentBook,
                    ...action.payload,
                }
            };
        },
        _updatePages: (state, action) => {
            return {
                ...state,
                currentBook: {
                    ...state.currentBook,
                    pages: action.payload
                },
            };
        },
        setCurrentPage: (state, action) => {
            return {
                ...state,
                currentPage: action.payload
            };
        },
        setUploadImg: (state, action) => {
            return {
                ...state,
                uploadedImg: action.payload
            }
        },
        clearUploadImg: (state, action) => {
            return {
                ...state,
                uploadedImg: ""
            }
        },
        setCurrentText: (state, action) => {
            return {
                ...state,
                currentText: action.payload
            }
        },
        clearCurrentBook: (state, action) => {
            return initialState;
        },
    },
});

export default editorSlice.reducer;
export const { 
    setBook,
    _updateBook,
    _updatePages,
    setCurrentPage,
    setUploadImg,
    clearUploadImg,
    setCurrentText,
    clearCurrentBook
} = editorSlice.actions;

// gets book structured for editing
export const fetchBook = (bookId) => async (dispatch) => {
    const { data: book } = await axios.get(`/api/editor/${bookId}`);
    if (book) {
        dispatch(setBook(book));
    } else {
        // alert("Unable to find that book");
    }
}

export const createNewBook = (book) => async (dispatch) => {
    // "book" should be === { studentId: 5, genre: "racecar" };
    const { data: newBook } = await axios.post("/api/editor", book);
    if (!newBook || newBook === {}) {
        alert("Unable to create book");
        return false;
    } else {
        dispatch(setBook(newBook));
        return newBook;
    }
}

export const updateBook = (book) => async (dispatch) => {
    const { data: updatedBook } = await axios.put(`/api/editor/${book.id}`, book);
    if (!updatedBook || updatedBook === {}) {
        alert("Unable to edit book");
    } else {
        dispatch(_updateBook(updatedBook));
        return true;
    }
}

export const deleteBook = (bookId) => async (dispatch) => {
    const { data } = await axios.delete(`/api/editor/${bookId}`);
    if (data) {
        dispatch(setBook({}));
        return true;
    }
}

export const addNewPage = (bookId, templateId=1) => async (dispatch) => {
    const { data: book } = await axios.post(`/api/editor/${bookId}/pages`, { templateId });
    if (book) {
        dispatch(setBook(book));
        return book;
    }
}

export const updatePage = (page) => async (dispatch) => {
    const { data: pages } = await axios.put(`/api/editor/${page.bookId}/pages/${page.id}`, page);
    if (pages) {
        dispatch(_updatePages(pages));
        const updatedPage = pages.find(p => p.id==page.id);
        dispatch(setCurrentPage(updatedPage));
        return true;
    } else {
        return false;
    }
}

export const updateOtherPage = (page) => async (dispatch) => {
    const { data: pages } = await axios.put(`/api/editor/${page.bookId}/pages/${page.id}`, page);
    if (pages) {
        dispatch(_updatePages(pages));
        return true;
    } else {
        return false;
    }
}

export const deletePage = (page) => async (dispatch) => {
    const { data: book } = await axios.delete(`/api/editor/${page.bookId}/pages/${page.id}`);
    if (book) {
        dispatch(_updateBook(book));
        dispatch(setCurrentPage(book.pages[0]));
        return true;
    } else {
        return false;
    }
}

export const updateCoverArt = (bookId, url) => async (dispatch) => {
    console.log("here REDUCER")
    const { data: book } = await axios.put(`/api/editor/${bookId}`, {
        coverArt: url,
    });
    if (book) {
        dispatch(_updateBook(book));
        return true;
    } else {
        return false;
    }
}
