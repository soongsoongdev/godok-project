import { useEffect, useState } from 'react';
import { getRecords, deleteRecord, clearAllRecords } from '../utils/altitudeUtil';
import GoToAltitudeButton from '../components/GoToAltitudeButton';
import { useNavigate } from 'react-router-dom';
import '../styles/journey.css';

export default function JourneyView() {
    const [records, setRecords] = useState([]);
    const nav = useNavigate();

    /* 초기 로딩 */
    useEffect(() => setRecords(getRecords().sort(
        (a,b)=>new Date(b.date)-new Date(a.date))), []);

    /* 개별 삭제 */
    const handleDelete = (idx) => {
        if (!window.confirm('이 기록을 삭제할까요?')) return;
        deleteRecord(idx);
        setRecords(getRecords().sort((a,b)=>new Date(b.date)-new Date(a.date)));
    };

    /* 전체 삭제 */
    const handleClear = () => {
        if (!window.confirm('전체 기록을 모두 삭제할까요?')) return;
        clearAllRecords();
        setRecords([]);
    };

    return (
        <div className="page-container">
            <button className="pixel-back" onClick={()=>nav(-1)} />

            <h2 className="journey-title">📚 나의 독서 여정</h2>
            <div className="bookshelf">
                {records.map((r, i) => {
                    const palette = ['#c62828','#ad1457','#6a1b9a','#283593','#1565c0','#00838f'];
                    const color   = palette[i % palette.length];

                    /* ① 6글자 이상이면 '앞5글자…' 로 변환 */
                    const short   = r.title.length > 5 ? r.title.slice(0, 5) + '…' : r.title;

                    return (
                        <div key={i}
                             className="book-spine"
                             style={{ background: color }}
                             title={`${r.title} · ${r.pages}p`}>
                            {/* ② 세로 스파인에 짧아진 제목 표시 */}
                            <span className="spine-text">{short}</span>
                        </div>
                    );
                })}
            </div>



            {/* 전체 삭제 버튼 */}
            {records.length>0 && (
                <button className="clear-btn" onClick={handleClear}>🗑️ 전체 삭제</button>
            )}

            <div className="record-list">
                {records.length===0 && <p className="empty">기록이 없습니다.</p>}

                {records.map((r,i)=>(
                    <div key={i} className="record-item">
                        <p className="title">📖 {r.title}</p>
                        <p className="info">페이지: {r.pages}p / 고도: {r.altitude}m</p>
                        {r.note && <p className="note">💬 {r.note}</p>}
                        <p className="date">{new Date(r.date).toLocaleDateString()}</p>

                        {/* 개별 삭제 버튼 */}
                        <button className="del-btn" onClick={()=>handleDelete(i)}>삭제</button>
                    </div>
                ))}
            </div>

            <GoToAltitudeButton />
        </div>
    );
}
