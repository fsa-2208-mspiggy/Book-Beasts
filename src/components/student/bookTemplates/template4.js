import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentText } from "../../../store/reducers/editorSlice";
import ImageWidget from './uploadWidget';
import rowLimiter from './rowLimiter';

const Template4 = ({ defaultPageArt }) => {
    const page = useSelector(state => state.editor.currentPage);
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const hasImage = page.image && page.image !== defaultPageArt;
    const image = page.image;

    useEffect(() => {
        if (page.id) {
            setText(page.content || "");
        }
    }, [page])

    useEffect(() => {
        dispatch(setCurrentText(text));
    }, [text]);

    return (
        <div className="page-outer-div temp4-outer-div">
            <div className='text-div'>
                <textarea className="full-text-page" defaultValue={text } onChange={(event) => setText(event.target.value)}
                    rows="10" cols="30"
                    spellCheck="true"
                    onKeyPress={rowLimiter(event, 10)}
                ></textarea>
                <div className="small-image-page">
                    <ImageWidget 
                        croppingRatio={1.54444444444}
                        maxHeight={180}
                        maxWidth={278}
                        templateId={4}
                        hasImage={hasImage}
                        image={image}
                        top={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default Template4;
