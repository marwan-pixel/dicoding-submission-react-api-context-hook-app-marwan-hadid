import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DetailPage from "./Pages/DetailPage";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import AddNotePage from "./Pages/AddNotePage";
import ArchivedPage from "./Pages/ArchivedPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import Navigation from "./components/Navigation";
import { getUserLogged, putAccessToken } from "./utils/api";
import NoteContext from "./contexts/NoteContext";
import { useNavigate } from "react-router-dom";
function NotesApp() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(localStorage.getItem("local") || "id");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    async function isUserLogged() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }
    isUserLogged();
  }, [theme]);

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);

      return newLocale;
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", theme);
      return newTheme;
    });
  };

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
    navigate("/");
  };

  if (initializing) {
    return null;
  }

  return (
    <NoteContext.Provider value={{ locale, toggleLocale, theme, toggleTheme }}>
      <div className="note-app">
        <header className="note-app__header">
          <h1>{locale === "id" ? "Aplikasi Catatan" : "Notes App"}</h1>
          {authedUser && (
            <Navigation logout={onLogout} name={authedUser.name} />
          )}
        </header>
        <main>
          <Routes>
            {authedUser ? (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/detailnote/:id" element={<DetailPage />} />
                <Route path="/archived" element={<ArchivedPage />} />
                <Route path="/add" element={<AddNotePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </>
            ) : (
              <>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </NoteContext.Provider>
  );
}

export default NotesApp;
