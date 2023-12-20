import { clearAuth } from '@/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {}

const Logout = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const auth: any = useAppSelector((state) => state.auth.auth);

      useEffect(() => {
        dispatch(clearAuth());
        navigate('/')
    }, []);
      return (
    <div>
    </div>
  )
}

export default Logout