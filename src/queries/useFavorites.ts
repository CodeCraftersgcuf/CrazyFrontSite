import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { Game } from '../data/types';

export const useFavorites = (user?: User | null) => {
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(user || null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Listen to network status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      enableNetwork(db).catch(console.error);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      disableNetwork(db).catch(console.error);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed in useFavorites:', user?.uid);
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Load favorites on mount and when user changes
  useEffect(() => {
    loadFavorites();
  }, [currentUser]);

  const loadFavorites = async () => {
    try {
      if (currentUser && isOnline) {
        // Load from Firestore for logged-in user
        console.log('Loading favorites from Firestore for user:', currentUser.uid);
        await loadFromFirestore();
      } else {
        // Load from localStorage for non-logged-in user or when offline
        console.log('Loading favorites from localStorage');
        loadFromLocalStorage();
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      // Always fallback to localStorage on any error
      loadFromLocalStorage();
    }
  };

  const loadFromFirestore = async () => {
    if (!currentUser) return;
    
    try {
      const favoritesRef = collection(db, 'users', currentUser.uid, 'favorites');
      const querySnapshot = await getDocs(query(favoritesRef));
      const firestoreFavorites: Game[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && data.id) {
          firestoreFavorites.push(data as Game);
        }
      });

      console.log('Loaded favorites from Firestore:', firestoreFavorites.length);
      setFavorites(firestoreFavorites);
      
      // Also sync to localStorage as backup
      try {
        localStorage.setItem('favorites', JSON.stringify(firestoreFavorites));
      } catch (e) {
        console.warn('Failed to sync favorites to localStorage:', e);
      }
    } catch (error) {
      console.error('Error loading favorites from Firestore:', error);
      // Fallback to localStorage
      loadFromLocalStorage();
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        const parsed = JSON.parse(storedFavorites);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
          console.log('Loaded favorites from localStorage:', parsed.length);
        } else {
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      setFavorites([]);
    }
  };

  const addFavorite = async (game: Game) => {
    // Prevent duplicate favorites
    if (favorites.some((fav) => fav.id === game.id)) {
      console.log('Game already in favorites:', game.title);
      return;
    }

    const newFavorites = [...favorites, game];
    setFavorites(newFavorites);
    console.log('Adding favorite:', game.title);

    // Always save to localStorage first
    try {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorite to localStorage:', error);
    }

    // Save to Firestore if user is logged in and online
    if (currentUser && isOnline) {
      try {
        const favoriteDocRef = doc(db, 'users', currentUser.uid, 'favorites', game.id);
        await setDoc(favoriteDocRef, {
          ...game,
          addedAt: new Date().toISOString()
        });
        console.log('Saved favorite to Firestore:', game.title);
      } catch (error) {
        console.error('Error adding favorite to Firestore:', error);
        // Don't revert state since localStorage save succeeded
      }
    }
  };

  const removeFavorite = async (gameId: string) => {
    const gameToRemove = favorites.find(fav => fav.id === gameId);
    const newFavorites = favorites.filter((game) => game.id !== gameId);
    setFavorites(newFavorites);
    console.log('Removing favorite:', gameToRemove?.title);

    // Always save to localStorage first
    try {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error removing favorite from localStorage:', error);
    }

    // Remove from Firestore if user is logged in and online
    if (currentUser && isOnline) {
      try {
        const favoriteDocRef = doc(db, 'users', currentUser.uid, 'favorites', gameId);
        await deleteDoc(favoriteDocRef);
        console.log('Removed favorite from Firestore:', gameToRemove?.title);
      } catch (error) {
        console.error('Error removing favorite from Firestore:', error);
        // Don't revert state since localStorage save succeeded
      }
    }
  };

  const removeAllFavorites = async () => {
    const previousFavorites = [...favorites];
    setFavorites([]);
    console.log('Removing all favorites');

    // Always clear localStorage first
    try {
      localStorage.removeItem('favorites');
    } catch (error) {
      console.error('Error removing favorites from localStorage:', error);
    }

    // Remove from Firestore if user is logged in and online
    if (currentUser && isOnline) {
      try {
        const favoritesRef = collection(db, 'users', currentUser.uid, 'favorites');
        const querySnapshot = await getDocs(query(favoritesRef));

        const deletePromises = querySnapshot.docs.map((docSnap) =>
          deleteDoc(doc(db, 'users', currentUser.uid, 'favorites', docSnap.id))
        );

        await Promise.all(deletePromises);
        console.log('Removed all favorites from Firestore');
      } catch (error) {
        console.error('Error removing all favorites from Firestore:', error);
        // Don't revert state since localStorage clear succeeded
      }
    }
  };

  const isFavorite = (gameId: string) => {
    return favorites.some((game) => game.id === gameId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    removeAllFavorites,
    isFavorite,
    isOnline,
  };
};