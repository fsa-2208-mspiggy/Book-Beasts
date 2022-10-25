import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookData } from '../../../store/reducers/instructorSlice';
import { InstructorHeader } from '../instructorTabs';

const ViewSingleBook = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const book = useSelector((state) => state.instructorList.currentBook);
    const pages = book && book.pages ? filterPages(book.pages) : undefined;
    const [currentPage, setCurrentPage] = useState(0);

    function filterPages(pages){
        let orderedPages = [];
        let currentPage = pages.filter((page) => page.isFirstPage);
        orderedPages.push({pageNumber: 1, page : currentPage[0]});

        let counter = 0;
        while(orderedPages.length < pages.length){
            let nextPage = pages.filter((page) => page.id == orderedPages[counter].page.nextPage);
            orderedPages.push({pageNumber: (counter + 2), page : nextPage[0]});
            counter++;
        }
        return orderedPages;
    }

    useEffect(() => {
        dispatch(fetchBookData(params.id, params.studentId, params.bookId));
    }, []);

  return pages ? (
    <div>
        <InstructorHeader/>
        <div className="outer-div-book-view" id="instructor-book-view">
            <div className="page-selector-shelf">
                {pages.map(page =>
                    <div className="page-selector" id={currentPage === page.pageNumber - 1 ? "selected" : ""} key={page.page.id} onClick={()=>setCurrentPage(page.pageNumber - 1)}>{page.pageNumber}</div>
                )}
            </div>
            <div className="page">
                <p id="page-content">{pages[currentPage].page.content}</p>
                <p id="page-number-on-page">page {pages[currentPage].pageNumber}</p>
            </div>
        </div>
        </div>
    ) : (
        <div>
        no book data
        </div>
    )   
}

export default ViewSingleBook;