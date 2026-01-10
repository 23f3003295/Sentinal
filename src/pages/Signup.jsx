import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import loginPageImg from '../assets/loginPage.png';
import verifyImg from '../assets/verify.png';
import noImg from '../assets/no.png';
import logoImg from '../assets/logo.png';
import './Login.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationType, setOrganizationType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!organizationType.trim()) {
      setError('Please enter your organization type');
      return;
    }

    setLoading(true);

    try {
      // Sign up the user with organization type
      const { data, error: signUpError } = await signUp(email, password, organizationType);

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Check if email confirmation is required
      if (data?.user && !data?.session) {
        // Email confirmation is enabled - user needs to check email
        setSuccess('Account created! Please check your email to confirm your account. The confirmation link will redirect you to the dashboard.');
        setLoading(false);
      } else if (data?.session) {
        // Email confirmation is disabled - user is automatically logged in
        setSuccess('Account created successfully! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left Side - Purple Gradient with Illustration */}
      <div className="login-left">
        <div className="brand-section">
          <div className="brand-logo">
            <img src={logoImg} alt="Debts Recovery Logo" className="logo-image" />
            <div className="brand-text">
              <div className="brand-name">Debts</div>
              <div className="brand-tagline">Recovery</div>
            </div>
          </div>
        </div>

        <div className="illustration-container">
          <img src={loginPageImg} alt="Debt Recovery Illustration" className="login-illustration" />
          <img src={verifyImg} alt="Verify" className="verify-overlay" />
          <img src={noImg} alt="No" className="no-overlay" />
        </div>

        <div className="platform-info">
          <h1 className="platform-title">Debt Collection Management</h1>
          <h2 className="platform-subtitle"><span className="platform-highlight">Platform</span> with AI-Powered.</h2>
        </div>
      </div>

      {/* Right Side - White Form Section */}
      <div className="login-right">
        <div className="login-form-container">
          <h2 className="form-title">Create your account</h2>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password (min 6 characters)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="organizationType">Organization Type</label>
              <input
                id="organizationType"
                type="text"
                value={organizationType}
                onChange={(e) => setOrganizationType(e.target.value)}
                required
                placeholder="Enter your organization type"
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" disabled={loading} className="btn-login">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="signup-link">
            Already have an account? <a href="/login">Login</a>
          </p>

          <div className="form-footer">
            <a href="#">Contact</a>
            <span>|</span>
            <a href="#">Terms of Service</a>
            <span>|</span>
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Disclaimer</a>
          </div>
          <div className="copyright">
            Copyright© 2026 Debts Recovery All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}
