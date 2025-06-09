import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateAltitude, saveToStorage } from '../utils/altitudeUtil.js';
import '../styles/input.css';

function InputView() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [pages, setPages] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const pageNum = parseInt(pages);
        if (!title || isNaN(pageNum) || pageNum <= 0) return alert('입력을 확인해 주세요!');

        const record = {
            title,
            pages: pageNum,
            note,
            altitude: calculateAltitude(pageNum),
            date: new Date().toISOString()
        };

        saveToStorage(record);
        navigate('/altitude');
    };

    return (
        <div className="page-container">
            <h2 className="input-title">독서 기록 입력</h2>
            <form className="input-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="책 제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="페이지 수"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                />
                <textarea
                    placeholder="한 줄 감상 (선택)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <button type="submit">▶ 등록</button>
            </form>
        </div>
    );
}

export default InputView;
