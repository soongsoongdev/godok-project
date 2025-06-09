export const calculateAltitude = (pages) => {
    return pages * 10; // 1페이지 = 10m 고도
};


const KEY = 'godok_records';

export function seedDemoRecords() {
    if (localStorage.getItem(KEY)) return;   // 기록이 하나라도 있으면 패스

    const demo = [
        { title:'해리 포터와 마법사의 돌', pages: 120, note:'다시 읽어도 꿀잼!',
            altitude: 1200, date:'2025-01-03T12:00:00Z' },
        { title:'어린 왕자', pages: 95,   note:'사막의 별빛이 떠오른다',
            altitude:  950, date:'2025-01-05T21:00:00Z' },
        { title:'노인과 바다', pages: 82, note:'바다 냄새가 난다',
            altitude:  820, date:'2025-01-07T18:30:00Z' },
        { title:'백범일지', pages: 60, note:'한 획의 붓 힘',
            altitude:  600, date:'2025-01-09T09:10:00Z' },
        { title:'나미야 잡화점의 기적', pages: 2150, note:'편지가 맺어준 인연',
            altitude: 21500, date:'2025-01-11T14:45:00Z' },
    ];
    localStorage.setItem(KEY, JSON.stringify(demo));
}
export const saveToStorage = (record) => {
    const data = JSON.parse(localStorage.getItem('godok_records')) || [];
    data.push(record);
    localStorage.setItem('godok_records', JSON.stringify(data));
};

export const getRecords = () => {
    return JSON.parse(localStorage.getItem('godok_records')) || [];
};

export function deleteRecord(idx) {
    const list = getRecords();
    list.splice(idx, 1);
    localStorage.setItem(KEY, JSON.stringify(list));
}

export function clearAllRecords() {
    localStorage.removeItem(KEY);
}