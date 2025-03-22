// import React, { useContext, createContext, useState, useEffect } from "react";

// // Create context
// export const UserDataContext = createContext();


// export const UserContext = ({ children }) => {
//     const [user, setUser] = useState({
//         email: "",
//         fullName: {
//             firstName: "",
//             lastName: ""
//         }
//     });

//     return (
//         <UserDataContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserDataContext.Provider>
//     );
// };

// import React, { createContext, useState, useEffect } from "react";

// // Create context
// export const UserDataContext = createContext();

// // Context Provider Component
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     // Load user data from localStorage (if available) on initial render
//     const storedUser = localStorage.getItem("user");
//     return storedUser
//       ? JSON.parse(storedUser)
//       : { email: "", fullName: { firstName: "", lastName: "" } };
//   });

//   // Sync user state with localStorage (optional)
//   useEffect(() => {
//     if (user?.email) {
//       localStorage.setItem("user", JSON.stringify(user));
//     }
//   }, [user]);

//   return (
//     <UserDataContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserDataContext.Provider>
//   );
// };


import { useContext, createContext, useState } from "react";
import PropTypes from "prop-types";

// Create User Context
export const UserDataContext = createContext();

// UserContext Provider Component
export const UserContext = ({ children }) => {
  // User State Initialization
  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Validate the props using prop-types
UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom Hook for easier context consumption
export const useUser = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContext Provider");
  }
  return context;
};
