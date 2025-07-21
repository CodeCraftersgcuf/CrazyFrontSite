import React, { useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  User,
  AuthError,
  AuthCredential,
  fetchSignInMethodsForEmail,
  linkWithCredential
} from 'firebase/auth';
import { auth } from '../../firebase';

interface SocialLoginProps {
  onLoginSuccess?: (user: User) => void;
  onClose?: () => void;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ onLoginSuccess, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<string>('');
  const [pendingCred, setPendingCred] = useState<AuthCredential | null>(null);
  const [pendingProvider, setPendingProvider] = useState<string>('');

  // Helper for account-exists-with-different-credential
  const handleAccountExistsWithDifferentCredential = async (
    err: any,
    providerName: string
  ) => {
    const email = err.customData?.email;
    const credential = err.credential as AuthCredential;
    setPendingCred(credential);
    setPendingProvider(providerName);

    if (email) {
      try {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        let msg = `This email is already registered with another provider: ${methods.join(', ')}.`;
        if (methods.includes('google.com')) {
          msg += ' Please login with Google first, then you can link your account.';
        } else if (methods.includes('github.com')) {
          msg += ' Please login with GitHub first, then you can link your account.';
        }
        setError(msg);
      } catch (e: any) {
        setError('Failed to fetch sign-in methods: ' + e.message);
      }
    } else {
      setError('This email is already registered with another provider. Please try logging in with that provider first.');
    }
  };

  const handleSocialLogin = async (
    provider: GoogleAuthProvider | GithubAuthProvider,
    providerName: string
  ) => {
    setError('');
    setLoading(providerName);

    try {
      console.log(`Attempting ${providerName} login...`);
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      console.log('Login successful:', {
        uid: loggedInUser.uid,
        email: loggedInUser.email,
        displayName: loggedInUser.displayName
      });
      setUser(loggedInUser);
      onLoginSuccess?.(loggedInUser);
    } catch (err: any) {
      console.error(`${providerName} login error:`, err);
      
      if (err.code === "auth/account-exists-with-different-credential") {
        await handleAccountExistsWithDifferentCredential(err, providerName);
      } else if (err.code === "auth/popup-blocked") {
        setError('Pop-up was blocked by your browser. Please allow pop-ups and try again.');
      } else if (err.code === "auth/popup-closed-by-user") {
        setError('Login cancelled. Please try again.');
      } else if (err.code === "auth/network-request-failed") {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        const error = err as AuthError;
        setError(`${providerName} login failed: ${error.message}`);
      }
    } finally {
      setLoading('');
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    handleSocialLogin(provider, 'Google');
  };

  const handleGitHubLogin = () => {
    const provider = new GithubAuthProvider();
    handleSocialLogin(provider, 'GitHub');
  };

  // Optionally, link the pending credential after successful login with the correct provider
  const handleLinkCredential = async () => {
    if (auth.currentUser && pendingCred) {
      try {
        await linkWithCredential(auth.currentUser, pendingCred);
        setError('');
        setPendingCred(null);
        setPendingProvider('');
        // Optionally, update user info/UI here
        setUser(auth.currentUser);
        onLoginSuccess?.(auth.currentUser!);
      } catch (err: any) {
        setError('Failed to link account: ' + err.message);
      }
    }
  };

  if (user) {
    return (
      <div className="text-center space-y-4">
        <div className="flex flex-col items-center space-y-3">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-white object-cover"
              onError={(e) => {
                console.log('Profile image failed to load in modal:', user.photoURL);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
              onLoad={() => console.log('Profile image loaded in modal:', user.photoURL)}
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Welcome, {user.displayName || user.email?.split('@')[0] || 'User'}!
            </h3>
            <p className="text-sm text-gray-300">{user.email}</p>
          </div>
        </div>
        {pendingCred && (
          <button
            onClick={handleLinkCredential}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
          >
            Link {pendingProvider} to your account
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Continue
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white text-center mb-6">Login to Continue</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handleGoogleLogin}
          disabled={loading === 'Google'}
          className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {loading === 'Google' ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Login with Google</span>
            </>
          )}
        </button>

        <button
          onClick={handleGitHubLogin}
          disabled={loading === 'GitHub'}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {loading === 'GitHub' ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Login with GitHub</span>
            </>
          )}
        </button>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 mt-4"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default SocialLogin;
 