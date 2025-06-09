import { useEffect, useState } from 'react';
import { getRecords }        from '../utils/altitudeUtil';
import { useNavigate } from 'react-router-dom';
import { BADGE_DATA, isUnlocked, unlockBadge } from '../utils/badgeUtil';
import BadgeModal from '../components/BadgeModal';

import '../styles/altitude.css';

export default function AltitudeView() {
    /* 상태 */
    const [alt, setAlt] = useState(0);          // 고도
    const [bg , setBg ] = useState('ground');   // 배경 단계 class
    const navigate = useNavigate();   // ← 추가
    const [newBadge,setNewBadge] = useState(null);


    useEffect(() => {
        const last = getRecords().at(-1);
        if (!last) return;

        const target    = last.altitude;  // 도달 고도
        const duration = 4000 + target * 0.05; // 고도 10 000m면 9 000ms
        const startTime = performance.now();

        const tick = (now) => {
            const t = Math.min((now - startTime) / duration, 1); // 0→1
            setAlt(Math.round(target * t));
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, []);

    useEffect(()=> {
        BADGE_DATA.forEach(b=>{
            if(alt >= b.altitude && !isUnlocked(b.id)){
                const unlocked = unlockBadge(b.id);   // 저장
                setNewBadge(unlocked);
            }
        });
    },[alt]);


    /* ── 고도별 배경 단계 class ── */
    useEffect(() => {
        if      (alt >= 40000) setBg('solar');
        else if (alt >= 20000) setBg('space');
        else if (alt >= 10000) setBg('aurora');
        else if (alt >=  5000) setBg('cloud');
        else                    setBg('ground');
    }, [alt]);

    /* ── 장면 요소들 ── */
    const scene = [];

    /* 0-4 999 m : 들판 */
    if (alt < 5000) {
        scene.push(<div key="ground" className="grass-ground" />);
        [
            { cls:'pixel-house'    , left:'20%' },
            { cls:'pixel-tree-big' , left:'50%' },
            { cls:'pixel-flower'   , left:'10%' },
            { cls:'pixel-weed'     , left:'35%' },
            { cls:'pixel-character', left:'70%' },
        ].forEach((e,i)=>
            scene.push(<div key={'g'+i} className={`fadeItem ${alt<5000?'show':''} ${e.cls}`} style={{left:e.left}}/>)
        );
    }

    /* 5 000-14 999 m : 구름 */
    if (alt>=5000 && alt<15000){
        [25,60,80].forEach((p,i)=>
            scene.push(
                <div key={'c'+i}
                     className={`pixel-cloud fadeItem ${alt>=5000?'show':''}`}
                     style={{top:`${80+30*i}px`,left:`${p}%`}}/>)
        );
    }

    /* 20 000 m 이상 : 밤하늘 별 */
    if (alt>=20000){
        for(let i=0;i<25;i++){
            scene.push(
                <div key={'s'+i}
                     className="pixel-star"
                     style={{top:`${Math.random()*100}%`,left:`${Math.random()*100}%`}}/>
            );
        }

        scene.push(<div key="auroraLayer" className="aurora-layer" />);
        scene.push(<div key="polaris"     className="polaris" />);
        scene.push(<div key="beam"        className="beam" />);
    }

    /* 위성/행성 */
    if(alt>=35000 && alt<40000)
        scene.push(<div key="sat" className="pixel-satellite" style={{top:80,left:'50%'}}/>);
    if(alt>=40000)
        scene.push(<div key="pl" className="pixel-planet" style={{top:120,left:'50%'}}/>);

    /* ── 렌더 ── */
    return (
        <div className={`altitude-container ${bg}`}>
            <button
                className="pixel-back"
                onClick={()=> navigate(-1)}   /* -1 = 히스토리 뒤로 / 필요하면 '/' */
            />
            {scene}
            <div className="altitude-box">
                <p className="altitude-label">현재 고도</p>
                <p className="altitude-value">{alt.toLocaleString()} m</p>
            </div>
            <BadgeModal badge={newBadge} onClose={()=>setNewBadge(null)} />
        </div>
    );
}
