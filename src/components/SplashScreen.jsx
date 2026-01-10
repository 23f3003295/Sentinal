import { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';
import './SplashScreen.css';

function SplashScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 3 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    // Complete splash screen after 3.5 seconds (including fade animation)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <img src={logoImg} alt="FedEx Logo" className="splash-logo" />
        <h1 className="splash-title">
          <span className="fed-text">Fed</span>
          <span className="ex-text">Ex</span>
          <span className="dca-text"> DCA Platform</span>
        </h1>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default SplashScreen;
