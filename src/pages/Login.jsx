import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import heroCake from '../assets/heroCake.png'; // Adjust the path as necessary
import { ShopContext } from '../context/ShopContext'

const Login = () => {
    const navigate = useNavigate();
    const [currentState, setCurrentState] = useState('Login');
    const [errorMessage, setErrorMessage] = useState('');

    // State for Login form
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // State for Sign Up form
    const [signUpName, setSignUpName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');


    // Placeholder API function using axios
    const apiPlaceholder = async (url, data) => {
        try {
            const response = await axios.post(url, data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Something went wrong');
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (currentState === 'Login') {
            try {
               /* const response = await apiPlaceholder('https.//jsonplaceholder.typicode.com/posts', {
                    email: loginEmail,
                    password: loginPassword,
                });
                console.log('Login Response:', response);*/

                // Check for admin credentials
                const adminEmail = 'admin@example.com';
                const adminPassword = 'admin123';

            if (loginEmail === adminEmail && loginPassword === adminPassword) {
                alert('Admin Login Successful');
                setErrorMessage('');
                setLoginEmail('');
                setLoginPassword('');
                navigate('/admin'); // Redirect to admin dashboard
            } else {
                alert('Login Successful');
                setErrorMessage('');
                setLoginEmail('');
                setLoginPassword('');
                navigate('/'); // Redirect to home page
            } 
        } catch (error) {
                console.error('Login Error:', error.message);
                setErrorMessage('Invalid email or password');
            }
         } else {
            try {
                const response = await apiPlaceholder('https://jsonplaceholder.typicode.com/posts', {
                    name: signUpName,
                    email: signUpEmail,
                    password: signUpPassword
                });
            console.log('Sign Up Response:', response);
            alert('Sign Up Successful');
            setSignUpName('');
            setSignUpEmail('');
            setSignUpPassword('');
            } catch (error) {
            console.error('Sign Up Error:', error.message);
            setErrorMessage('Failed to sign up. Please try again');
             }
          }
     };

    return (
        <div>
            {/* Horizontal Line */}
            <hr className='page-divider'/>
        <div className="split-layout">
            {/* Left Section for Image */}
            <div className="left-section">
                <img src={heroCake} alt="heroCake" className="background-image" />
            </div>

            {/* Right Section for Form */}
            <div className="right-section">
                <form onSubmit={onSubmitHandler} className="form-container">
                    <div className="inline-flex items-center gap-2 mb-2 mt-10">
                        <p className="prata-regular text-3xl">{currentState}</p>
                        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
                    </div>

                    {/* Sign Up Form */}
                    {currentState === 'Sign Up' && (
                        <>
                            <input
                                className="w-full px-3 py-2 border border-gray-800"
                                type="text"
                                placeholder="Full Name"
                                value={signUpName}
                                onChange={(e) => setSignUpName(e.target.value)}
                                required
                            />
                            <input
                                className="w-full px-3 py-2 border border-gray-800"
                                type="email"
                                placeholder="Enter your Email"
                                value={signUpEmail}
                                onChange={(e) => setSignUpEmail(e.target.value)}
                                required
                            />
                            <input
                                className="w-full px-3 py-2 border border-gray-800"
                                type="password"
                                placeholder="Enter your Password"
                                value={signUpPassword}
                                onChange={(e) => setSignUpPassword(e.target.value)}
                                required
                            />
                        </>
                    )}

                    {/* Login Form */}
                    {currentState === 'Login' && (
                        <>
                            <input
                                className="w-full px-3 py-2 border border-gray-800"
                                type="email"
                                placeholder="Enter your Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                            />
                            <input
                                className="w-full px-3 py-2 border border-gray-800"
                                type="password"
                                placeholder="Enter your Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                        </>
                    )}

                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                    <div className="w-full flex justify-between text-sm mt-[-8px]">
                        <p className="cursor-pointer">Forgot your password?</p>
                        {currentState === 'Login' ? (
                            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
                                Create account
                            </p>
                        ) : (
                            <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
                                Login here
                            </p>
                        )}
                    </div>

                    <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
                        {currentState === 'Login' ? 'Sign in' : 'Sign up'}
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Login;