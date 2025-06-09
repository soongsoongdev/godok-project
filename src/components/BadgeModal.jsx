import './badge-modal.css';

export default function BadgeModal({ badge, onClose }) {
    if (!badge) return null;
    return (
        <div className="badge-overlay" onClick={onClose}>
            <div className="badge-window" onClick={e=>e.stopPropagation()}>
                <span className="badge-icon">{badge.icon}</span>
                <h3>{badge.name} 획득!</h3>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}
