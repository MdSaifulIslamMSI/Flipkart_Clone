import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/slices/userSlice'; // We will create this action
import MetaData from '../components/MetaData';
import { Avatar, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        gender: "male",
    });

    const { name, email, password, gender } = user;

    const [avatar, setAvatar] = useState("/profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/profile.png");

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("gender", gender);
        myForm.set("avatar", avatar);

        // Dispatch register action
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (error) {
            // Toast would go here
        }

        if (isAuthenticated) {
            navigate('/');
        }
    }, [dispatch, error, isAuthenticated, navigate]);

    return (
        <>
            <MetaData title="Register - Lumina" />
            <div className="bg-[#f1f3f6] min-h-screen flex items-center justify-center py-10 px-4">
                <div className="bg-white w-full max-w-lg shadow-xl rounded-xl overflow-hidden animate-fade-in-up">

                    {/* Header */}
                    <div className="bg-primary p-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-2">Join Lumina</h2>
                        <p className="text-purple-100">Create your account to start shopping</p>
                    </div>

                    {/* Form Container */}
                    <div className="p-8">
                        <form className="flex flex-col gap-6" encType="multipart/form-data" onSubmit={registerSubmit}>

                            {/* Avatar Upload */}
                            <div className="flex justify-center">
                                <div className="relative group cursor-pointer">
                                    <Avatar
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        sx={{ width: 100, height: 100, border: '4px solid white', boxShadow: 3 }}
                                    />
                                    <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer hover:bg-purple-700 transition">
                                        <AddPhotoAlternate sx={{ fontSize: 20 }} />
                                    </label>
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={registerDataChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            <TextField
                                label="Full Name"
                                variant="outlined"
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                                fullWidth
                                required
                                size="small"
                            />

                            <TextField
                                label="Email"
                                variant="outlined"
                                type="email"
                                name="email"
                                value={email}
                                onChange={registerDataChange}
                                fullWidth
                                required
                                size="small"
                            />

                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                                fullWidth
                                required
                                size="small"
                            />

                            {/* Gender Selection */}
                            <FormControl component="fieldset">
                                <FormLabel component="legend" className="text-xs">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="gender"
                                    value={gender}
                                    onChange={registerDataChange}
                                >
                                    <FormControlLabel value="male" control={<Radio size="small" sx={{ color: '#7c3aed', '&.Mui-checked': { color: '#7c3aed' } }} />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio size="small" sx={{ color: '#7c3aed', '&.Mui-checked': { color: '#7c3aed' } }} />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio size="small" sx={{ color: '#7c3aed', '&.Mui-checked': { color: '#7c3aed' } }} />} label="Other" />
                                </RadioGroup>
                            </FormControl>

                            {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`bg-primary text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Creating Account...' : 'Register'}
                            </button>

                            <div className="text-center mt-2 text-sm text-gray-600">
                                Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
