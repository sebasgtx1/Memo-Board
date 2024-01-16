import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotesPage from "./pages/NotesPage.jsx";
import NotesForm from "./pages/NotesForm.jsx";
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/Navbar.jsx";
import LoginForm from "./pages/LoginFrom.jsx";
import { NoteContextProvider } from "./context/NoteProvider.jsx";
import { useEffect, useState } from "react";
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const token = window.localStorage.getItem("user_id");
        setAuthenticated(!!token);

        console.log(token);
        if (!token) {
          navigate("/");
        }
      } catch (error) {
        setAuthenticated(false);
      }
    };
    checkAuthentication();

    window.addEventListener("storage", checkAuthentication);

    return () => {
      window.removeEventListener("storage", checkAuthentication);
    };
  }, [navigate]);

  return (
    <div className="bg-zinc-900 h-screen">
      <div className="container mx-auto p-x-20">
        <NoteContextProvider>
          {authenticated && location.pathname !== "/" && <Navbar />}
          <Routes>
            <Route path="/" element={<LoginForm />} />
            {/* <Route path="/register" element={<LoginForm />} /> */}
            {/* <Route path="/profile" element={<UserProfile />} /> */}

            <Route path="/notes" element={<NotesPage />} />
            <Route path="/new" element={<NotesForm />} />
            <Route path="/edit/:id" element={<NotesForm />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </NoteContextProvider>
      </div>
    </div>
  );
}

export default App;
