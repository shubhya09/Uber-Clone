import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { UserDataContext } from '../Context/UserContext';
import axios from 'axios';

function UserSignup() {
  // Destructure only setUser since user is not used
  const { setUser } = useContext(UserDataContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email,
        password,
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser);

      if (response.status === 201) {
        const data = response?.data;
        console.log(data);
        setUser(data.newUser);
        localStorage.setItem('usertoken', JSON.stringify(data.token));
        nav('/home');

        // Clear form
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
      }
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      alert('Error during signup. Please try again!');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 dark:bg-gray-900 pt-4">
        <form className="max-w-sm w-full p-4 mt-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
            Create a new Account
          </h2>

          <div className="grid md:grid-cols-2 md:gap-6 mb-3">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            {/* <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-style"
            /> */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              autoComplete="email"
            />

          </div>

          <div className="mb-5 relative">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            {/* <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-style pr-10"
            /> */}
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              autoComplete="new-password" // Use "new-password" for sign-up forms
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 pt-7 flex items-center text-gray-100"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          <button type="submit" className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4">
            Create Account
          </button>

          <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
            <Link to="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserSignup;
