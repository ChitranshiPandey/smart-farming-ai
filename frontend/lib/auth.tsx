// frontend/lib/auth.tsx
// Drop-in auth context — wraps your whole app in _app.tsx or layout.tsx

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// ── Types ────────────────────────────────────────────────────────────────
interface User {
  name:  string;
  email: string;
}

interface AuthCtx {
  user:     User | null;
  token:    string | null;
  loading:  boolean;
  login:    (email: string, password: string) => Promise<void>;
  signup:   (name: string, email: string, password: string) => Promise<void>;
  logout:   () => void;
}

// ── Context ───────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthCtx | null>(null);

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ── Provider ──────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null);
  const [token,   setToken]   = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("agri_token");
    if (stored) {
      setToken(stored);
      fetchMe(stored).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const fetchMe = async (t: string) => {
    try {
      const res = await fetch(`${API}/api/me`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setUser(data);
    } catch {
      // Token invalid / expired — clear it
      localStorage.removeItem("agri_token");
      setToken(null);
      setUser(null);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API}/api/login`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail ?? "Login failed");
    }
    const { token: t, user: u } = await res.json();
    localStorage.setItem("agri_token", t);
    setToken(t);
    setUser(u);
    router.push("/dashboard");
  }, [router]);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const res = await fetch(`${API}/api/signup`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail ?? "Signup failed");
    }
    const { token: t, user: u } = await res.json();
    localStorage.setItem("agri_token", t);
    setToken(t);
    setUser(u);
    router.push("/dashboard");
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("agri_token");
    setToken(null);
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────
export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside <AuthProvider>");
  return ctx;
}

// ── Protected route HOC ───────────────────────────────────────────────────
// Wrap any page component:  export default withAuth(DashboardPage)
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function ProtectedPage(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) router.replace("/login");
    }, [user, loading, router]);

    if (loading) return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1a]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading AgriSmart...</p>
        </div>
      </div>
    );

    if (!user) return null;

    return <Component {...props} />;
  };
}

// ── Authenticated fetch helper ────────────────────────────────────────────
// Usage: const data = await authFetch("/predict", token, { method: "POST", body: ... })
export async function authFetch(
  path: string,
  token: string,
  init: RequestInit = {}
): Promise<Response> {
  return fetch(`${API}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization:  `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });
}