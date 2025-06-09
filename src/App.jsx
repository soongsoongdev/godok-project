import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeView from './pages/WelcomeView';
import InputView from './pages/InputView.jsx';
import AltitudeView from './pages/AltitudeView.jsx';
import JourneyView from './pages/JourneyView.jsx';
import BookUniverse from './pages/BookUniverse.jsx';
import PomodoroTimer from './pages/PomodoroTimer.jsx';
import {seedDemoRecords} from './utils/altitudeUtil.js';
import {useEffect} from 'react';

function App() {
    useEffect(seedDemoRecords, []);

    return (
        <BrowserRouter basename="/web2025/project">
            <Routes>
                <Route path="/" element={<WelcomeView />} />
                <Route path="/input" element={<InputView />} />
                <Route path="/altitude" element={<AltitudeView />} />
                <Route path="/journey" element={<JourneyView />} />
                <Route path="/universe" element={<BookUniverse />} />
                <Route path="/timer" element={<PomodoroTimer />} />


            </Routes>
        </BrowserRouter>
    );
}

export default App;
