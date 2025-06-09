import { useNavigate } from 'react-router-dom';
import '../styles/welcome.css';

function WelcomeView() {
    const navigate = useNavigate();

    function generateStars(count = 100) {
        const stars = [];
        for (let i = 0; i < count; i++) {
            const size = Math.random() * 8 + 4; // ⭐ 4px ~ 12px까지 랜덤
            const style = {
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.5 + 0.5,
                transform: `rotate(${Math.random() * 360}deg)`,
            };
            stars.push(<div key={i} className="star" style={style}></div>);
        }
        return stars;
    }

    const playSound = () => {
        const audio = new Audio('/start.wav');
        audio.volume = 0.3;
        audio.play();
    };


    return (
        <div className="welcome-container">
            {generateStars(40)}
            <h1 className="logo-text">高 獨</h1>
            <p className="subtitle">당신의 독서가 우주를 엽니다</p>
            <div className="button-group">
                <button className="start-button" onClick={() => { playSound(); navigate('/input'); }}>
                    ▶ 시작하기
                </button>
                <button className="view-button" onClick={() => navigate('/journey')}>
                    📘 기록 보기
                </button>
                <button className="view-button" onClick={() => navigate('/universe')}>
                    🌌 책의 우주
                </button>
                <button className="view-button" onClick={()=>navigate('/timer')}>⏲️ 독서 타이머</button>

            </div>
        </div>
    );

}

export default WelcomeView;
