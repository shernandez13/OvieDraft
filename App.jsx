import { useState } from "react";
import Nav          from "./Nav";
import HomePage     from "./HomePage";
import RegisterPage from "./RegisterPage";
import LoginPage    from "./LoginPage";
import ProfilePage  from "./ProfilePage";
import CalendarPage from "./CalendarPage";
import GroupsPage   from "./GroupsPage";

/**
 * App.jsx — root component
 *
 * Global state:
 *   page       — which page is currently shown
 *   isLoggedIn — whether a user session is active
 *
 * When wiring in a real backend:
 *   - Replace setIsLoggedIn(true) with JWT/session logic
 *   - Replace handleLogout with POST /auth/logout + clear localStorage
 *   - Swap this router for React Router v6
 */
export default function App() {
  const [page,       setPage]       = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = (to) => setPage(to);

  // Called by LoginPage / RegisterPage after successful auth
  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage("calendar");
  };

  // Called by Nav's Log Out button
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage("home");
    // TODO: POST /auth/logout, clear JWT
  };

  // Guard: redirect guests trying to hit protected routes
  const guardedPage = (() => {
    const protectedPages = ["calendar","groups","profile","account"];
    if (!isLoggedIn && protectedPages.includes(page)) return "login";
    const authPages = ["login","register"];
    if (isLoggedIn && authPages.includes(page)) return "calendar";
    return page;
  })();

  return (
    <>
      {/* Global Nav — always visible, switches tabs based on auth */}
      <Nav
        isLoggedIn={isLoggedIn}
        currentPage={guardedPage}
        onNavigate={navigate}
        onLogout={handleLogout}
      />

      {/* Page routing */}
      {guardedPage === "home"     && <HomePage     onNavigate={navigate} isLoggedIn={isLoggedIn} />}
      {guardedPage === "register" && <RegisterPage onNavigate={navigate} onLogin={handleLogin} />}
      {guardedPage === "login"    && <LoginPage    onNavigate={navigate} onLogin={handleLogin} />}
      {guardedPage === "profile"  && <ProfilePage  onNavigate={navigate} />}
      {guardedPage === "calendar" && <CalendarPage onNavigate={navigate} />}
      {guardedPage === "groups"   && <GroupsPage   onNavigate={navigate} />}
      {guardedPage === "account"  && <ProfilePage  onNavigate={navigate} />}
    </>
  );
}
