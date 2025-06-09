import { useNavigate } from 'react-router-dom';

export default function GoToAltitudeButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/altitude')}
            className="start-button"
            style={{
                marginTop: '20px',
            }}
        >
            🚀 고도 보기
        </button>
    );
}
