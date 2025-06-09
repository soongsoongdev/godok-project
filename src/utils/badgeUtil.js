const BADGE_KEY = 'badges';

/* 기본 뱃지 목록 */
export const BADGE_DATA = [
    { id: 'cloud' , name: '구름 탐험가'      , altitude:  1000, icon: '☁️' },
    { id: 'sky'   , name: '대기권 도전자'    , altitude:  5000, icon: '🏔️' },
    { id: 'aurora', name: '오로라 감상가'    , altitude: 10000, icon: '🌌' },
    { id: 'station',name: '우주 정거장 승객' , altitude: 20000, icon: '🛰️' },
    { id: 'strato', name: '성층권 여행자'    , altitude: 30000, icon: '🚀' },
    { id: 'solar' , name: '태양계 탐험가'    , altitude: 40000, icon: '🪐' },
    { id: 'inter' , name: '성간 항해자'      , altitude: 50000, icon: '✨' },
];

export function getBadges() {
    return JSON.parse(localStorage.getItem(BADGE_KEY) || '[]');  // ['cloud']
}

export function isUnlocked(id) {
    return getBadges().includes(id);
}

export function unlockBadge(id) {
    const list = getBadges();
    if (list.includes(id)) return;
    localStorage.setItem(BADGE_KEY, JSON.stringify([...list, id]));
    return BADGE_DATA.find(b => b.id === id);
}
