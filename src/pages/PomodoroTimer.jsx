import { useEffect, useRef, useState } from 'react';
import { useNavigate }                 from 'react-router-dom';
import '../styles/pomodoro.css';

/* ───── 미니 별똥별 스포너 ───── */
const spawnMeteor = () => {
    const m = document.createElement('div');
    m.className = 'meteor';
    m.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(m);
    setTimeout(() => m.remove(), 2000);
};

export default function PomodoroTimer() {
    /* 사용자 설정 시간 */
    const [workMin , setWorkMin ] = useState(25);
    const [breakMin, setBreakMin] = useState(5);

    /* 타이머 상태 */
    const [seconds , setSeconds ] = useState(workMin * 60);
    const [mode    , setMode    ] = useState('WORK');   // 'WORK' | 'BREAK'
    const [running , setRunning ] = useState(false);

    const nav      = useNavigate();
    const bgmRef   = useRef(null);                      // 🔑 오디오 객체 보존

    /* 오디오 객체 준비 */
    useEffect(() => {
        bgmRef.current = new Audio('/space.wav');         // public/space.wav
        bgmRef.current.loop   = true;
        bgmRef.current.volume = 0.25;
        return () => bgmRef.current?.pause();             // 언마운트 시 정지
    }, []);

    /* 시간 변경 시 초기화 */
    useEffect(() => {
        if (!running) setSeconds(workMin * 60);
    }, [workMin, running]);

    /* 러닝/모드 변화 → BGM 재생 제어 */
    useEffect(() => {
        const bgm = bgmRef.current;
        if (!bgm) return;

        if (running && mode === 'WORK') {
            bgm.play().catch(()=>{});                      // 자동재생 차단 무시
        } else {
            bgm.pause();
        }
    }, [running, mode]);

    /* 카운트다운 */
    useEffect(() => {
        if (!running) return;

        /* 유성우 */
        for (let i = 0; i < 15; i++) setTimeout(spawnMeteor, i * 120);

        const id = setInterval(() => {
            setSeconds(prev => {
                if (prev > 1) return prev - 1;

                clearInterval(id);
                const next = mode === 'WORK' ? 'BREAK' : 'WORK';
                setMode(next);
                setSeconds((next === 'WORK' ? workMin : breakMin) * 60);

                if (mode === 'WORK') nav('/input');          // 집중 세션 후 기록
                return prev;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [running, mode, workMin, breakMin, nav]);

    /* 시간 표시 */
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');

    /* 배경 별 */
    const tinyStars = Array.from({ length: 150 }).map((_, i) => (
        <div key={i} className="bg-star"
             style={{
                 top : Math.random()*100+'vh',
                 left: Math.random()*100+'vw',
                 animationDelay:(Math.random()*3).toFixed(2)+'s'}}/>
    ));

    return (
        <div className={`pomo-wrapper ${mode === 'WORK' ? 'work' : 'break'}`}>
            {/* 뒤로가기 */}
            <button className="pixel-back" onClick={()=>nav(-1)} />

            {/* 오로라 + 별 */}
            <div className="aurora-layer" />
            {tinyStars}

            <h2>{mode === 'WORK' ? '📖 집중 시간' : '☕ 휴식 시간'}</h2>

            {/* 시간 선택 – 정지 상태에서만 수정 가능 */}
            {!running && (
                <div className="picker">
                    <label>집중&nbsp;
                        <input type="number" min="1" max="60" value={workMin}
                               onChange={e=>setWorkMin(+e.target.value||1)}/> 분
                    </label>
                    <label>휴식&nbsp;
                        <input type="number" min="1" max="30" value={breakMin}
                               onChange={e=>setBreakMin(+e.target.value||1)}/> 분
                    </label>
                </div>
            )}

            <div className="timer">{mm}:{ss}</div>

            <div className="controls">
                <button onClick={()=>{
                    if (running) setRunning(false);
                    else { setMode('WORK'); setSeconds(workMin*60); setRunning(true); }
                }}>{running ? '⏸ 일시정지' : '▶ 시작'}</button>

                <button onClick={()=>{
                    setRunning(false); setMode('WORK'); setSeconds(workMin*60);
                }}>⏹ 초기화</button>
            </div>
        </div>
    );
}
