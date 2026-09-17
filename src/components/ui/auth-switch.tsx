import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  ArrowLeft,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemeLanguage } from "../../context/ThemeLanguageContext";
import "./auth-switch.css";

// Google Icon
const GoogleIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

// GitHub Icon
const GitHubIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export interface AuthSwitchProps {
  initialState?: "signIn" | "signUp" | string;
  onSignIn?: (data: any) => void;
  onSignUp?: (data: any) => void;
  className?: string;
}

export function AuthSwitch({
  initialState = "signIn",
  onSignIn,
  onSignUp,
  className
}: AuthSwitchProps) {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  const [isSignUp, setIsSignUp] = useState(initialState === "signUp");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [welcomeToast, setWelcomeToast] = useState<string | null>(null);

  // Form states
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted("signIn");
    const displayName = signInData.email ? signInData.email.split('@')[0] : (isEn ? "Valued Guest" : "زائرنا الكريم");
    setWelcomeToast(
      isEn
        ? `Welcome back, ${displayName}! Delighted to have you with us again.`
        : `مرحباً بك يا ${displayName}! سعداء بتواجدك معنا مجدداً.`
    );
    if (onSignIn) onSignIn(signInData);
    setTimeout(() => setSubmitted(null), 3500);
    setTimeout(() => setWelcomeToast(null), 4500);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted("signUp");
    if (onSignUp) onSignUp(signUpData);
    setTimeout(() => setSubmitted(null), 3500);
  };

  return (
    <div className={cn("auth-switch-root", className)} dir={isEn ? "ltr" : "rtl"}>
      <div className={cn("auth-switch-container", isSignUp ? "is-sign-up" : "is-sign-in")}>
        {/* Mobile tabs switch */}
        <div className="auth-switch-mobile-tabs">
          <button
            type="button"
            className={cn("auth-switch-mobile-tab-btn", !isSignUp && "active")}
            onClick={() => {
              setIsSignUp(false);
              setSubmitted(null);
            }}
          >
            <LogIn size={15} />
            <span>{isEn ? "Sign In" : "تسجيل الدخول"}</span>
          </button>
          <button
            type="button"
            className={cn("auth-switch-mobile-tab-btn", isSignUp && "active")}
            onClick={() => {
              setIsSignUp(true);
              setSubmitted(null);
            }}
          >
            <UserPlus size={15} />
            <span>{isEn ? "Sign Up" : "إنشاء حساب"}</span>
          </button>
        </div>

        {/* Both Form Panels (Sign In & Sign Up) */}
        <div className="auth-switch-forms-wrapper">
          {/* 1. Sign In Half */}
          <div className="auth-switch-form-half sign-in-half">
            <h2 className="auth-switch-form-title">{isEn ? "Sign In" : "تسجيل الدخول"}</h2>
            <p className="auth-switch-form-subtitle">
              {isEn ? "Enter your email and password to access your Techno Enjaz account" : "أدخل بريدك الإلكتروني وكلمة المرور لمتابعة أعمالك في تكنو إنجاز"}
            </p>

            {submitted === "signIn" && (
              <div className="auth-switch-success">
                <CheckCircle2 size={18} />
                <span>{isEn ? "Signed in successfully! Welcome back." : "تم تسجيل الدخول بنجاح! مرحباً بعودتك."}</span>
              </div>
            )}

            <div className="auth-switch-social-row">
              <button
                type="button"
                className="auth-switch-social-btn"
                onClick={() => alert(isEn ? "Google Sign-In is ready for users" : "تسجيل الدخول عبر جوجل متاح للمستخدمين")}
              >
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="auth-switch-social-btn"
                onClick={() => alert(isEn ? "GitHub Sign-In is ready for developers" : "تسجيل الدخول عبر غيت هاب متاح للمطورين")}
              >
                <GitHubIcon />
                <span>GitHub</span>
              </button>
            </div>

            <div className="auth-switch-divider">
              <div className="auth-switch-divider-line" />
              <span className="auth-switch-divider-text">{isEn ? "or with email" : "أو عبر البريد"}</span>
              <div className="auth-switch-divider-line" />
            </div>

            <form onSubmit={handleSignInSubmit}>
              <div className="auth-switch-input-group">
                <label className="auth-switch-label">{isEn ? "Email Address" : "البريد الإلكتروني"}</label>
                <div className="auth-switch-input-wrapper">
                  <span className="auth-switch-input-icon">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={signInData.email}
                    onChange={(e) =>
                      setSignInData({ ...signInData, email: e.target.value })
                    }
                    className="auth-switch-input"
                  />
                </div>
              </div>

              <div className="auth-switch-input-group">
                <label className="auth-switch-label">{isEn ? "Password" : "كلمة المرور"}</label>
                <div className="auth-switch-input-wrapper">
                  <span className="auth-switch-input-icon">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={signInData.password}
                    onChange={(e) =>
                      setSignInData({ ...signInData, password: e.target.value })
                    }
                    className="auth-switch-input"
                  />
                  <button
                    type="button"
                    className="auth-switch-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? (isEn ? "Hide" : "إخفاء") : (isEn ? "Show" : "إظهار")}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="auth-switch-options">
                <label className="auth-switch-remember">
                  <input
                    type="checkbox"
                    checked={signInData.remember}
                    onChange={(e) =>
                      setSignInData({
                        ...signInData,
                        remember: e.target.checked
                      })
                    }
                  />
                  <span>{isEn ? "Remember me" : "تذكرني"}</span>
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(isEn ? "You can reset your password by contacting our support team." : "يمكنك استعادة كلمة المرور عبر التواصل معنا.");
                  }}
                  className="auth-switch-forgot"
                >
                  {isEn ? "Forgot password?" : "نسيت كلمة المرور؟"}
                </a>
              </div>

              <button type="submit" className="auth-switch-submit-btn">
                <LogIn size={16} />
                <span>{isEn ? "Sign In" : "تسجيل الدخول"}</span>
              </button>
            </form>
          </div>

          {/* 2. Sign Up Half */}
          <div className="auth-switch-form-half sign-up-half">
            <h2 className="auth-switch-form-title">{isEn ? "Create New Account" : "إنشاء حساب جديد"}</h2>
            <p className="auth-switch-form-subtitle">
              {isEn ? "Join Techno Enjaz and access our integrated suite of digital solutions" : "انضم إلى منصة تكنو إنجاز واستفد من حلولنا الرقمية المتكاملة"}
            </p>

            {submitted === "signUp" && (
              <div className="auth-switch-success">
                <CheckCircle2 size={18} />
                <span>{isEn ? "Account created successfully! Welcome to Techno Enjaz." : "تم إنشاء الحساب بنجاح! أهلاً بك في تكنو إنجاز."}</span>
              </div>
            )}

            <div className="auth-switch-social-row">
              <button
                type="button"
                className="auth-switch-social-btn"
                onClick={() => alert(isEn ? "Sign up with Google" : "التسجيل عبر جوجل")}
              >
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="auth-switch-social-btn"
                onClick={() => alert(isEn ? "Sign up with GitHub" : "التسجيل عبر غيت هاب")}
              >
                <GitHubIcon />
                <span>GitHub</span>
              </button>
            </div>

            <div className="auth-switch-divider">
              <div className="auth-switch-divider-line" />
              <span className="auth-switch-divider-text">{isEn ? "or direct registration" : "أو التسجيل المباشر"}</span>
              <div className="auth-switch-divider-line" />
            </div>

            <form onSubmit={handleSignUpSubmit}>
              <div className="auth-switch-input-group">
                <label className="auth-switch-label">{isEn ? "Full Name" : "الاسم الكامل"}</label>
                <div className="auth-switch-input-wrapper">
                  <span className="auth-switch-input-icon">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder={isEn ? "John Smith" : "محمد أحمد"}
                    value={signUpData.name}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, name: e.target.value })
                    }
                    className="auth-switch-input"
                  />
                </div>
              </div>

              <div className="auth-switch-input-group">
                <label className="auth-switch-label">{isEn ? "Email Address" : "البريد الإلكتروني"}</label>
                <div className="auth-switch-input-wrapper">
                  <span className="auth-switch-input-icon">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={signUpData.email}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    className="auth-switch-input"
                  />
                </div>
              </div>

              <div className="auth-switch-input-group">
                <label className="auth-switch-label">{isEn ? "Password" : "كلمة المرور"}</label>
                <div className="auth-switch-input-wrapper">
                  <span className="auth-switch-input-icon">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={signUpData.password}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    className="auth-switch-input"
                  />
                  <button
                    type="button"
                    className="auth-switch-eye-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    title={showConfirmPassword ? (isEn ? "Hide" : "إخفاء") : (isEn ? "Show" : "إظهار")}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-switch-submit-btn">
                <UserPlus size={16} />
                <span>{isEn ? "Create Free Account" : "إنشاء حساب مجاني"}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Sliding Overlay Switch */}
        <motion.div
          className="auth-switch-overlay-panel"
          initial={false}
          animate={{
            left: isEn ? (isSignUp ? "0%" : "50%") : (isSignUp ? "50%" : "0%")
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 26
          }}
        >
          <div className="auth-switch-overlay-glow" />

          <AnimatePresence mode="wait">
            {!isSignUp ? (
              <motion.div
                key="to-signup"
                className="auth-switch-overlay-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="auth-switch-overlay-title">{isEn ? "New to Techno Enjaz?" : "جديد في تكنو إنجاز؟"}</h3>
                <p className="auth-switch-overlay-desc">
                  {isEn
                    ? "Create your personal account now and join our cutting-edge engineering community to access all projects and platforms."
                    : "أنشئ حسابك الشخصي الآن وانضم إلى مجتمعنا التقني المتطور للوصول إلى كافة الميزات والمشاريع."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true);
                    setSubmitted(null);
                  }}
                  className="auth-switch-overlay-btn"
                >
                  <span>{isEn ? "Create Account" : "إنشاء حساب جديد"}</span>
                  {isEn ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="to-signin"
                className="auth-switch-overlay-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="auth-switch-overlay-title">{isEn ? "Already have an account?" : "لديك حساب بالفعل؟"}</h3>
                <p className="auth-switch-overlay-desc">
                  {isEn
                    ? "Sign in now to access your projects, explore the control dashboard, and connect with our engineering team."
                    : "سجّل دخولك الآن لمتابعة مشاريعك، الوصول إلى لوحة التحكم، والتواصل المباشر مع فريقنا."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setSubmitted(null);
                  }}
                  className="auth-switch-overlay-btn"
                >
                  <span>{isEn ? "Sign In" : "تسجيل الدخول"}</span>
                  {isEn ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Temporary Welcome Toast */}
      <AnimatePresence>
        {welcomeToast && (
          <motion.div
            className="auth-bottom-toast"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="auth-bottom-toast-content">
              <CheckCircle2 className="auth-toast-icon" size={20} />
              <span>{welcomeToast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const Component = AuthSwitch;
export default AuthSwitch;
