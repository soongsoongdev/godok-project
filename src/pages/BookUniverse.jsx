import { useEffect, useState } from 'react';
import { getRecords } from '../utils/altitudeUtil';
import '../styles/universe.css';
import {useNavigate} from 'react-router-dom';

export default function BookUniverse() {
    const [records, setRecords] = useState([]);
    const [active, setActive]   = useState(null);     // 클릭/휠로 확대될 별 index
    const navigate = useNavigate();   // ← 추가

    /* 로컬 저장 기록 불러오기 */
    useEffect(() => setRecords(getRecords()), []);

    /* 마우스 휠로 다음/이전 별 확대 */
    const handleWheel = (e) => {
        if (active === null) return;                    // 아직 아무것도 안 열렸으면 무시
        e.preventDefault();
        const dir = e.deltaY > 0 ? 1 : -1;
        const next = active + dir;
        if (next >= 0 && next < records.length) setActive(next);
    };


    const tinyStars = Array.from({ length: 150 }).map((_, i) => (
        <div
            key={'tiny-' + i}
            className="bg-star"
            style={{
                top : Math.random() * 100 + 'vh',
                left: Math.random() * 100 + 'vw',
                animationDelay: (Math.random() * 3).toFixed(2) + 's',
            }}
        />
    ));

    return (
        <div className="universe-noscroll" onWheel={handleWheel}>

            <button
                className="pixel-back"
                onClick={()=> navigate(-1)}   /* -1 = 히스토리 뒤로 / 필요하면 '/' */
            />
            {tinyStars}
            {records.map((rec, idx) => (
                <div
                    key={idx}
                    className={`star-box ${active === idx ? 'active' : ''}`}
                    style={{
                        top : `${20 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 80}%`,
                    }}
                    onClick={() => setActive(idx)}
                >
                    <div
                        className="star-shape"
                        style={{
                            fontSize: 30 + Math.min(rec.pages * 0.06, 50), // 기본별 크기
                        }}
                    >
                        ★
                    </div>

                    {/* 정보 카드 – active일 때만 보임 */}
                    {active === idx && (
                        <div className="card">
                            <h3>{rec.title}</h3>
                            <p>{rec.pages} 페이지</p>
                            {rec.note && <p>💬 {rec.note}</p>}
                            <p className="date">
                                {new Date(rec.date).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
