// src/app/admin/signin/page.js
'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoPersonOutline,
  IoBusinessOutline,
  IoFlaskOutline,
  IoCheckmarkCircle,
  IoShieldCheckmarkOutline,
  IoDocumentTextOutline,
  IoAlertCircleOutline,
  IoArrowForward,
  IoCheckmarkOutline
} from 'react-icons/io5';
import MovingGlowButton from '@/Components/UI/MovingGlowButton';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  // Mode: 'login' or 'signup'
  const initialMode = searchParams?.get('mode') === 'signup' ? 'signup' : 'login';
  const [mode, setMode] = useState(initialMode);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Sign Up Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupInstitution, setSignupInstitution] = useState('');
  const [signupRole, setSignupRole] = useState('Pharma R&D');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupAgree, setSignupAgree] = useState(true);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  // If already authenticated as admin, redirect to admin dashboard
  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.isAdmin) {
        router.push('/admin/dashboard');
      }
    }
  }, [status, session, router]);

  // Handle Log In Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    setLoginSuccess(false);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: loginEmail.trim(),
        password: loginPassword,
      });

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          setLoginError('Invalid email or password. Please verify your credentials or create an account.');
        } else {
          setLoginError(result.error || 'Invalid credentials. Please verify your email and password.');
        }
        setLoginLoading(false);
      } else {
        setLoginSuccess(true);
        try {
          const sessionRes = await fetch('/api/auth/session');
          const sessionData = await sessionRes.json();
          setTimeout(() => {
            if (sessionData?.user?.isAdmin) {
              router.push('/admin/dashboard');
            } else {
              router.push('/');
            }
          }, 600);
        } catch {
          setTimeout(() => {
            router.push('/');
          }, 600);
        }
      }
    } catch {
      setLoginError('An unexpected network error occurred. Please try again.');
      setLoginLoading(false);
    }
  };

  // Handle Sign Up Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError('');

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      setSignupError('Please fill in all required fields.');
      setSignupLoading(false);
      return;
    }

    if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters long.');
      setSignupLoading(false);
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Passwords do not match. Please recheck.');
      setSignupLoading(false);
      return;
    }

    if (!signupAgree) {
      setSignupError('Please agree to the Terms of Service & Privacy Policy.');
      setSignupLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupName.trim(),
          email: signupEmail.trim(),
          institution: signupInstitution.trim(),
          role: signupRole,
          password: signupPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSignupSuccess(true);
        setLoginEmail(signupEmail.trim());
        setLoginPassword(signupPassword);
      } else {
        setSignupError(data.error || 'Registration failed. Please try again.');
      }
    } catch {
      setSignupError('Network connection error. Please try again.');
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FBF8] via-[#F8FCFB] to-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D8F3EC]/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#00A389]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Master Dual-Column Card */}
      <div className="max-w-5xl w-full bg-white rounded-[32px] border border-[#D5EFEA] shadow-[0_24px_70px_-15px_rgba(0,163,137,0.18)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">

        {/* ================================================================
            LEFT COLUMN: SCIENTIFIC BRAND & TRUST SHOWCASE (5 Cols on Desktop)
            ================================================================ */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#063E3A] via-[#0B3B3C] to-[#0E2358] text-white p-8 sm:p-10 flex-col justify-between relative overflow-hidden">
          {/* Translucent Skeletal Watermark */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full text-emerald-300">
              <polygon points="100,20 160,55 160,125 100,160 40,125 40,55" />
              <polygon points="100,45 140,68 140,112 100,135 60,112 60,68" strokeDasharray="4 4" />
              <line x1="160" y1="55" x2="190" y2="38" />
              <circle cx="190" cy="38" r="6" fill="currentColor" />
              <line x1="100" y1="160" x2="100" y2="190" />
              <circle cx="100" cy="190" r="6" fill="currentColor" />
              <line x1="40" y1="55" x2="10" y2="38" />
              <circle cx="10" cy="38" r="6" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10 space-y-6">
            {/* Logo and Tag */}
            <div className="space-y-3">
              <Link href="/" className="inline-block group" aria-label="Pharmavive Home">
                <div className="relative h-10 w-44">
                  <Image
                    src="/pharmavive_logo_dark.png"
                    alt="Pharmavive - Bringing Science To Life"
                    fill
                    sizes="176px"
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[11px] font-mono text-[#2DD4BF] font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
                <span>Precision Chemical Synthesis</span>
              </div>
            </div>

            {/* Headline & Value Statement */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Accelerating Discovery with Verified Purity.
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Connect directly to Pharmavive&apos;s digital catalog, analytical dossiers, and custom synthesis CDMO workflows.
              </p>
            </div>

            {/* 3 Scientific Pillar Badges */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-[#00A389]/20 text-[#2DD4BF] flex items-center justify-center shrink-0 mt-0.5">
                  <IoDocumentTextOutline size={18} />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">Instant CoA &amp; NMR Access</span>
                  <span className="text-emerald-100/70 text-[11.5px] leading-snug">
                    Download authentic 1H/13C NMR spectra, mass spec, and HPLC purity dossiers.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-[#00A389]/20 text-[#2DD4BF] flex items-center justify-center shrink-0 mt-0.5">
                  <IoFlaskOutline size={18} />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">RFQ &amp; Batch Scale-Up</span>
                  <span className="text-emerald-100/70 text-[11.5px] leading-snug">
                    Track custom synthesis quotes from milligram samples to multi-kilogram production.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-[#00A389]/20 text-[#2DD4BF] flex items-center justify-center shrink-0 mt-0.5">
                  <IoShieldCheckmarkOutline size={18} />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">Cold-Chain Assurance</span>
                  <span className="text-emerald-100/70 text-[11.5px] leading-snug">
                    Desiccated packaging for moisture-sensitive reference standards and isotopes.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Accreditation Quote */}
          <div className="relative z-10 pt-6 mt-6 border-t border-emerald-500/20 text-[11.5px] text-emerald-200/70 flex items-center justify-between">
            <span>ISO 9001:2015 Verified Laboratory</span>
            <span className="font-mono text-[10.5px] text-[#2DD4BF]">2–4h RFQ SLA</span>
          </div>
        </div>

        {/* ================================================================
            RIGHT COLUMN: INTERACTIVE AUTHENTICATION WORKBENCH (7 Cols)
            ================================================================ */}
        <div className="col-span-1 lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">

          {/* Mobile-Only Header Brand Logo */}
          <div className="lg:hidden flex justify-center mb-5">
            <Link href="/" className="inline-block" aria-label="Pharmavive Home">
              <div className="relative h-9 w-40">
                <Image
                  src="/logo.png"
                  alt="Pharmavive"
                  fill
                  sizes="160px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Top Segmented Pill Toggle with Moving Glow Line */}
          <div className="flex items-center justify-center mb-8">
            <div className="p-1 rounded-full bg-[#EBF7F4] border border-[#D5EFEA] inline-flex items-center gap-1">
              {mode === 'login' ? (
                <MovingGlowButton
                  type="button"
                  variant="teal"
                  onClick={() => {
                    setMode('login');
                    setLoginError('');
                  }}
                  innerClassName="px-6 py-2 text-xs font-bold"
                >
                  Log In
                </MovingGlowButton>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setLoginError('');
                  }}
                  className="px-6 py-2 rounded-full text-xs font-bold text-slate-600 hover:text-[#0B3B3C] transition-all cursor-pointer"
                >
                  Log In
                </button>
              )}

              {mode === 'signup' ? (
                <MovingGlowButton
                  type="button"
                  variant="teal"
                  onClick={() => {
                    setMode('signup');
                    setSignupError('');
                  }}
                  innerClassName="px-6 py-2 text-xs font-bold"
                >
                  Sign Up
                </MovingGlowButton>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setSignupError('');
                  }}
                  className="px-6 py-2 rounded-full text-xs font-bold text-slate-600 hover:text-[#0B3B3C] transition-all cursor-pointer"
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>

          {/* ================================================================
              VIEW A: LOG IN FORM
              ================================================================ */}
          {mode === 'login' && (
            <div className="space-y-6">
              <div className="text-center space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0E2358] tracking-tight">
                  Welcome to Pharmavive
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Enter your credentials to access the researcher portal or admin dashboard.
                </p>
              </div>

              {loginError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                  <IoAlertCircleOutline size={18} className="shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {loginSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                  <IoCheckmarkCircle size={18} className="shrink-0 text-[#00A389]" />
                  <span>Authentication verified. Redirecting to dashboard...</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email / Username */}
                <div className="space-y-1.5">
                  <label htmlFor="login-email" className="block text-xs font-bold text-[#0E2358] uppercase tracking-wider">
                    Work Email / Username
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <IoMailOutline size={18} />
                    </span>
                    <input
                      id="login-email"
                      type="text"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="scientist@institution.com or admin@pharmavive.com"
                      required
                      disabled={loginLoading}
                      autoComplete="username"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-3 focus:ring-[#00A389]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="login-password" className="block text-xs font-bold text-[#0E2358] uppercase tracking-wider">
                      Password
                    </label>
                    <a
                      href="mailto:support@pharmavive.com?subject=Password%20Reset%20Request"
                      className="text-xs font-semibold text-[#00A389] hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <IoLockClosedOutline size={18} />
                    </span>
                    <input
                      id="login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={loginLoading}
                      autoComplete="current-password"
                      className="w-full pl-10 pr-11 py-3 rounded-2xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-3 focus:ring-[#00A389]/15 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                    >
                      {showLoginPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Help */}
                <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-[#D5EFEA] text-[#00A389] focus:ring-[#00A389]"
                    />
                    <span>Remember this device</span>
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">SSL Encrypted</span>
                </div>

                {/* Submit Action with Moving Glow Line */}
                <div className="pt-2">
                  <MovingGlowButton
                    type="submit"
                    disabled={loginLoading}
                    variant="teal"
                    className="w-full"
                    innerClassName="w-full py-3.5 px-6 font-bold text-sm flex items-center justify-center gap-2"
                  >
                    {loginLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>Log In to Account</span>
                        <IoArrowForward size={16} />
                      </>
                    )}
                  </MovingGlowButton>
                </div>
              </form>

              {/* Admin Note Badge */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center text-xs text-slate-400 gap-1.5">
                <span>Need an account?</span>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-[#00A389] hover:underline cursor-pointer"
                >
                  Create one here
                </button>
              </div>
            </div>
          )}

          {/* ================================================================
              VIEW B: SIGN UP FORM
              ================================================================ */}
          {mode === 'signup' && (
            <div className="space-y-6">
              <div className="text-center space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0E2358] tracking-tight">
                  Join the Scientific Network
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Register for instant RFQ submissions, analytical CoA dossiers, and synthesis tracking.
                </p>
              </div>

              {signupError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                  <IoAlertCircleOutline size={18} className="shrink-0" />
                  <span>{signupError}</span>
                </div>
              )}

              {signupSuccess ? (
                <div className="p-6 rounded-3xl bg-[#E8FAF6] border border-[#B3E7E2] text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#00A389] text-white flex items-center justify-center shadow-md">
                    <IoCheckmarkOutline size={30} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-extrabold text-[#0E2358]">Account Created Successfully!</h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Welcome to Pharmavive. Your researcher profile has been registered. You can now log in to request official quotations and download analytical data.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSignupSuccess(false);
                        setMode('login');
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#0B3B3C] text-white text-xs font-bold hover:bg-[#072B2C] shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Proceed to Log In</span>
                      <IoArrowForward size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                  {/* Name & Institution Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label htmlFor="signup-name" className="block text-[11px] font-bold text-[#0E2358] uppercase tracking-wider">
                        Full Name *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <IoPersonOutline size={16} />
                        </span>
                        <input
                          id="signup-name"
                          type="text"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          placeholder="Dr. Elena Rostova"
                          required
                          disabled={signupLoading}
                          className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-3 focus:ring-[#00A389]/15 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="signup-institution" className="block text-[11px] font-bold text-[#0E2358] uppercase tracking-wider">
                        Institution / Company
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <IoBusinessOutline size={16} />
                        </span>
                        <input
                          id="signup-institution"
                          type="text"
                          value={signupInstitution}
                          onChange={(e) => setSignupInstitution(e.target.value)}
                          placeholder="Novartis / Oxford Univ"
                          disabled={signupLoading}
                          className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-3 focus:ring-[#00A389]/15 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Work Email & Research Domain */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label htmlFor="signup-email" className="block text-[11px] font-bold text-[#0E2358] uppercase tracking-wider">
                        Work Email *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <IoMailOutline size={16} />
                        </span>
                        <input
                          id="signup-email"
                          type="email"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          placeholder="elena@novartis.com"
                          required
                          disabled={signupLoading}
                          className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-3 focus:ring-[#00A389]/15 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="signup-role" className="block text-[11px] font-bold text-[#0E2358] uppercase tracking-wider">
                        Primary Domain
                      </label>
                      <select
                        id="signup-role"
                        value={signupRole}
                        onChange={(e) => setSignupRole(e.target.value)}
                        disabled={signupLoading}
                        className="w-full px-3 py-2.5 rounded-2xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs text-slate-800 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-3 focus:ring-[#00A389]/15 transition-all cursor-pointer"
                      >
                        <option value="Pharma R&D">Pharma R&amp;D</option>
                        <option value="Quality Control (QC/QA)">Quality Control (QC/QA)</option>
                        <option value="Procurement & Sourcing">Procurement &amp; Sourcing</option>
                        <option value="Academic Research">Academic Research</option>
                        <option value="CDMO / Synthesis">CDMO / Synthesis</option>
                      </select>
                    </div>
                  </div>

                  {/* Password & Confirm Password */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label htmlFor="signup-password" className="block text-[11px] font-bold text-[#0E2358] uppercase tracking-wider">
                        Password (6+ chars) *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <IoLockClosedOutline size={16} />
                        </span>
                        <input
                          id="signup-password"
                          type={showSignupPassword ? 'text' : 'password'}
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          disabled={signupLoading}
                          className="w-full pl-9 pr-9 py-2.5 rounded-2xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-3 focus:ring-[#00A389]/15 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showSignupPassword ? <IoEyeOffOutline size={15} /> : <IoEyeOutline size={15} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="signup-confirm-password" className="block text-[11px] font-bold text-[#0E2358] uppercase tracking-wider">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <IoLockClosedOutline size={16} />
                        </span>
                        <input
                          id="signup-confirm-password"
                          type={showSignupPassword ? 'text' : 'password'}
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          disabled={signupLoading}
                          className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-3 focus:ring-[#00A389]/15 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2 text-xs text-slate-500 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={signupAgree}
                        onChange={(e) => setSignupAgree(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-[#D5EFEA] text-[#00A389] focus:ring-[#00A389]"
                      />
                      <span>
                        I agree to Pharmavive&apos;s Terms of Service and Privacy Policy for scientific research access.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button with Moving Glow Line */}
                  <div className="pt-2">
                    <MovingGlowButton
                      type="submit"
                      disabled={signupLoading}
                      variant="teal"
                      className="w-full"
                      innerClassName="w-full py-3.5 px-6 font-bold text-sm flex items-center justify-center gap-2"
                    >
                      {signupLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Registering Profile...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Researcher Account</span>
                          <IoArrowForward size={16} />
                        </>
                      )}
                    </MovingGlowButton>
                  </div>
                </form>
              )}

              {/* Toggle to Login */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-center text-xs text-slate-400 gap-1.5">
                <span>Already registered?</span>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-[#00A389] hover:underline cursor-pointer"
                >
                  Log in here
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function AdminSignIn() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-[#F2FBF8] via-[#F8FCFB] to-white flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#00A389] border-t-transparent animate-spin" />
            <p className="text-xs font-mono text-slate-500">Loading Scientific Portal...</p>
          </div>
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
