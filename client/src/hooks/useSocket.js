import { useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { updateGigInList, fetchMyBids } from '../store/gigSlice';
import { addBid } from '../store/bidSlice';

export const useSocket = () => {
  const socketRef = useRef(null);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io({
        withCredentials: true
      });
    }

    const socket = socketRef.current;

    if (isAuthenticated && user) {
      //join user's personal room for notifications
      socket.emit('joinUserRoom', user._id);

      socket.on('hired', (data) => {
        toast.success(data.message, {
          duration: 5000,
        });
        dispatch(fetchMyBids());
      });

      socket.on('bidRejected', (data) => {
        toast(data.message, {
          duration: 4000,
        });
        dispatch(fetchMyBids());
      });

      socket.on('gigUpdated', (gig) => {
        dispatch(updateGigInList(gig));
      });

      socket.on('newBid', (bid) => {
        dispatch(addBid(bid));
        toast.success('New bid received!', { duration: 3000 });
      });
    }

    return () => {
      if (socket) {
        socket.off('hired');
        socket.off('bidRejected');
        socket.off('gigUpdated');
        socket.off('newBid');
      }
    };
  }, [isAuthenticated, user, dispatch]);

  const joinGigRoom = useCallback((gigId) => {
    if (socketRef.current) {
      socketRef.current.emit('joinGigRoom', gigId);
    }
  }, []);

  const leaveGigRoom = useCallback((gigId) => {
    if (socketRef.current) {
      socketRef.current.emit('leaveGigRoom', gigId);
    }
  }, []);

  return { socket: socketRef.current, joinGigRoom, leaveGigRoom };
};
