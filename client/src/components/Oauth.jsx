import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../user/userSlice';

export default function Oauth() {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        dispatch(signInFailure(errData.message || "Google login failed"));
        return;
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
    } catch (error) {
      if (
        error.code === 'auth/popup-closed-by-user' ||
        error.code === 'auth/user-cancelled'
      ) {
        console.warn('User cancelled the sign-in popup');
      } else {
        console.error('Google login error:', error);
        dispatch(signInFailure(error.message || "Google login error"));
      }
    }
  };

  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className='bg-blue-500 text-white rounded-lg p-3 uppercase hover:opacity-95'
    >
      Continue with Google
    </button>
  );
}
