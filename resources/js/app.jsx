import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { api } from "./services/api";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Solicitudes from "./pages/Solicitudes";
import "../css/app.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("dashboard");
  const handleNavigate = (to) => setPage(to);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      
      await api.get("/sanctum/csrf-cookie"); 
      await api.post("/logout");
      setUser(null);
    } catch (e) {
      console.error("Error logout", e);
      alert("Error al cerrar sesión");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Cargando...
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  if (page === "profile") {
    return <Profile 
            user={user} 
            onLogout={handleLogout}
            page={page}
            onNavigate={handleNavigate}
            />;
  }

  if (page === "solicitudes") {
  return (
    <Solicitudes
      user={user}
      onLogout={handleLogout}
      page={page}
      onNavigate={handleNavigate}
    />
  );
}

  return (
    <Dashboard
      user={user}
      onLogout={handleLogout}
      page={page}
      onNavigate={handleNavigate}
    />
  );
}

createRoot(document.getElementById("app")).render(<App />);
