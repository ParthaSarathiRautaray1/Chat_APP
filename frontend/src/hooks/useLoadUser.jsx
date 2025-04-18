import { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';

const useLoadUser = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                setLoading(true);
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:8000/api/v1/user/me`);
                
                if (res.data) {
                    dispatch(setAuthUser(res.data));
                }
            } catch (error) {
                console.log("Authentication error:", error);
                // Clear auth user if there's an error
                dispatch(setAuthUser(null));
            } finally {
                setLoading(false);
            }
        };
        
        loadUser();
    }, [dispatch]);

    return loading;
};

export default useLoadUser;