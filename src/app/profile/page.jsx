// src/app/profile/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  IoPersonOutline,
  IoMailOutline,
  IoBusinessOutline,
  IoFlaskOutline,
  IoCallOutline,
  IoGlobeOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkCircle,
  IoAlertCircleOutline,
  IoLogOutOutline,
  IoArrowForward,
  IoCartOutline,
  IoDocumentTextOutline,
} from 'react-icons/io5';

export default function ProfilePage() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();

  // Active Tab: 'profile' | 'security' | 'activity'
  const [activeTab, setActiveTab] = useState('profile');

  // Profile Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [role, setRole] = useState('Pharma R&D');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [memberSince, setMemberSince] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);

  // Profile Action States
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  // Password Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/admin/signin?mode=login');
    }
  }, [status, router]);

  // Fetch full user profile on load
  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/user/profile')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setName(data.user.name || '');
            setEmail(data.user.email || '');
            setInstitution(data.user.institution || '');
            setRole(data.user.role || 'Pharma R&D');
            setPhone(data.user.phone || '');
            setCountry(data.user.country || '');
            if (data.user.createdAt) {
              const d = new Date(data.user.createdAt);
              setMemberSince(d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
            }
          } else if (session?.user) {
            setName(session.user.name || '');
            setEmail(session.user.email || '');
          }
        })
        .catch((err) => {
          console.error('Failed to load profile:', err);
          if (session?.user) {
            setName(session.user.name || '');
            setEmail(session.user.email || '');
          }
        })
        .finally(() => {
          setInitialLoading(false);
        });
    }
  }, [status, session]);

  // Handle Profile Update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess('');
    setProfileError('');

    if (!name.trim()) {
      setProfileError('Please enter your name.');
      setProfileSaving(false);
      return;
    }

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          institution: institution.trim(),
          role,
          phone: phone.trim(),
          country: country.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProfileSuccess('Profile updated successfully! All changes have been saved.');
        // Update client session so header reflects any name changes
        if (updateSession) {
          updateSession({ name: name.trim() });
        }
        setTimeout(() => setProfileSuccess(''), 4000);
      } else {
        setProfileError(data.error || 'Failed to update profile.');
      }
    } catch {
      setProfileError('A network error occurred. Please try again.');
    } finally {
      setProfileSaving(false);
    }
  };

  // Handle Password Update
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordSaving(true);
    setPasswordSuccess('');
    setPasswordError('');

    if (!currentPassword || !newPassword) {
      setPasswordError('Please fill in both current and new password.');
      setPasswordSaving(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      setPasswordSaving(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      setPasswordSaving(false);
      return;
    }

    try {
      const res = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPasswordSuccess('Password changed successfully! Keep your new password secure.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPasswordSuccess(''), 5000);
      } else {
        setPasswordError(data.error || 'Failed to update password.');
      }
    } catch {
      setPasswordError('A network error occurred. Please try again.');
    } finally {
      setPasswordSaving(false);
    }
  };

  // User Initials Helper
  const getInitials = (n) => {
    if (!n) return 'PV';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  if (status === 'loading' || initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FBF8] via-[#F8FCFB] to-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-3 border-[#00A389] border-t-transparent animate-spin" />
          <p className="text-xs font-mono text-slate-500">Loading Researcher Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FBF8] via-[#F8FCFB] to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#00A389] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0E2358] font-medium">Researcher Profile</span>
          </div>
          {session?.user?.isAdmin && (
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1 text-[#00A389] hover:text-[#0B3B3C] font-semibold"
            >
              <span>Admin Dashboard</span>
              <IoArrowForward size={13} />
            </Link>
          )}
        </div>

        {/* Master Identity Header Card */}
        <div className="bg-gradient-to-br from-[#072B28] via-[#0E443F] to-[#125B54] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A389]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Initials Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#00A389] to-[#2DD4BF] text-white flex items-center justify-center font-mono font-bold text-xl sm:text-2xl shadow-lg shrink-0 border-2 border-white/20">
                {getInitials(name || session?.user?.name)}
              </div>

              {/* Identity Details */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {name || 'Researcher Profile'}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-400/20 text-[#2DD4BF] border border-[#2DD4BF]/30">
                    <IoShieldCheckmarkOutline size={12} />
                    <span>Verified</span>
                  </span>
                  {session?.user?.isAdmin && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-400/20 text-amber-200 border border-amber-300/30">
                      Admin
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-emerald-100/80 flex items-center gap-1.5 font-mono">
                  <IoMailOutline size={14} className="text-[#2DD4BF]" />
                  <span>{email || session?.user?.email}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 self-stretch sm:self-center">
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/15 transition-colors cursor-pointer"
              >
                <IoLogOutOutline size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 border-b border-[#D5EFEA] pb-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#00A389] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-[#00A389] border border-slate-200'
            }`}
          >
            <IoPersonOutline size={15} />
            <span>Profile &amp; Institution</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-[#00A389] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-[#00A389] border border-slate-200'
            }`}
          >
            <IoLockClosedOutline size={15} />
            <span>Security &amp; Password</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('activity')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'activity'
                ? 'bg-[#00A389] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-[#00A389] border border-slate-200'
            }`}
          >
            <IoCartOutline size={15} />
            <span>Quick Workflows</span>
          </button>
        </div>

        {/* ================================================================
            TAB 1: PROFILE & INSTITUTION DETAILS
            ================================================================ */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl border border-[#D5EFEA] p-6 sm:p-8 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-lg font-bold text-[#0E2358]">Personal &amp; Organizational Profile</h2>
              <p className="text-xs text-slate-500">
                Update your researcher name, institutional affiliation, and contact details used for certificates and RFQs.
              </p>
            </div>

            {profileSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in">
                <IoCheckmarkCircle size={18} className="text-[#00A389] shrink-0" />
                <span>{profileSuccess}</span>
              </div>
            )}

            {profileError && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-in fade-in">
                <IoAlertCircleOutline size={18} className="shrink-0" />
                <span>{profileError}</span>
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="profile-name" className="block text-xs font-bold text-[#0E2358] uppercase tracking-wider">
                    Full Name *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <IoPersonOutline size={17} />
                    </span>
                    <input
                      id="profile-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Jane Smith"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-2 focus:ring-[#00A389]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Email (Read Only) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="profile-email" className="block text-xs font-bold text-[#0E2358] uppercase tracking-wider">
                      Work Email
                    </label>
                    <span className="text-[10.5px] font-mono text-slate-400">Primary Account ID</span>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <IoMailOutline size={17} />
                    </span>
                    <input
                      id="profile-email"
                      type="email"
                      value={email}
                      disabled
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs sm:text-sm text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Institution / Company */}
                <div className="space-y-1.5">
                  <label htmlFor="profile-inst" className="block text-xs font-bold text-[#0E2358] uppercase tracking-wider">
                    Institution / Company
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <IoBusinessOutline size={17} />
                    </span>
                    <input
                      id="profile-inst"
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Novartis / Oxford University"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-2 focus:ring-[#00A389]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Primary Role / Domain */}
                <div className="space-y-1.5">
                  <label htmlFor="profile-role" className="block text-xs font-bold text-[#0E2358] uppercase tracking-wider">
                    Primary Domain / Role
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <IoFlaskOutline size={17} />
                    </span>
                    <select
                      id="profile-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-2 focus:ring-[#00A389]/15 transition-all"
                    >
                      <option value="Pharma R&D">Pharma R&amp;D</option>
                      <option value="Academic Research">Academic Research</option>
                      <option value="CRO / CDMO">CRO / CDMO</option>
                      <option value="Quality Assurance / QC">Quality Assurance / QC</option>
                      <option value="Formulation Scientist">Formulation Scientist</option>
                      <option value="Procurement / Sourcing">Procurement / Sourcing</option>
                      <option value="Customer">General Researcher / Customer</option>
                    </select>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="profile-phone" className="block text-xs font-bold text-[#0E2358] uppercase tracking-wider">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <IoCallOutline size={17} />
                    </span>
                    <input
                      id="profile-phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-2 focus:ring-[#00A389]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-1.5">
                  <label htmlFor="profile-country" className="block text-xs font-bold text-[#0E2358] uppercase tracking-wider">
                    Country / Region
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <IoGlobeOutline size={17} />
                    </span>
                    <input
                      id="profile-country"
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. India, United States, Switzerland"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-2 focus:ring-[#00A389]/15 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#00A389] hover:bg-[#0B3B3C] text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {profileSaving ? 'Saving Changes...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================================================================
            TAB 2: SECURITY & PASSWORD
            ================================================================ */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-3xl border border-[#D5EFEA] p-6 sm:p-8 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-lg font-bold text-[#0E2358]">Security &amp; Password</h2>
              <p className="text-xs text-slate-500">
                Update your account password to protect access to analytical dossiers and RFQ records.
              </p>
            </div>

            {passwordSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in">
                <IoCheckmarkCircle size={18} className="text-[#00A389] shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            {passwordError && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-in fade-in">
                <IoAlertCircleOutline size={18} className="shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-5 max-w-lg">
              {/* Current Password */}
              <div className="space-y-1.5">
                <label htmlFor="current-pass" className="block text-xs font-bold text-[#0E2358] uppercase tracking-wider">
                  Current Password *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <IoLockClosedOutline size={17} />
                  </span>
                  <input
                    id="current-pass"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-2 focus:ring-[#00A389]/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                    aria-label="Toggle current password visibility"
                  >
                    {showCurrentPassword ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label htmlFor="new-pass" className="block text-xs font-bold text-[#0E2358] uppercase tracking-wider">
                  New Password (6+ chars) *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <IoLockClosedOutline size={17} />
                  </span>
                  <input
                    id="new-pass"
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-2 focus:ring-[#00A389]/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                    aria-label="Toggle new password visibility"
                  >
                    {showNewPassword ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label htmlFor="confirm-pass" className="block text-xs font-bold text-[#0E2358] uppercase tracking-wider">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <IoLockClosedOutline size={17} />
                  </span>
                  <input
                    id="confirm-pass"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5EFEA] bg-[#F8FCFB] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#00A389] focus:bg-white focus:ring-2 focus:ring-[#00A389]/15 transition-all"
                  />
                </div>
              </div>

              {/* Password Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={passwordSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#0B3B3C] hover:bg-[#00A389] text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {passwordSaving ? 'Updating Password...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================================================================
            TAB 3: QUICK WORKFLOWS & SCIENTIFIC SERVICES
            ================================================================ */}
        {activeTab === 'activity' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Enquiry Cart */}
            <div className="bg-white rounded-3xl border border-[#D5EFEA] p-6 space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00A389] flex items-center justify-center">
                  <IoCartOutline size={22} />
                </div>
                <h3 className="font-bold text-sm text-[#0E2358]">Chemical RFQ Cart</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Review selected reference standards, impurities, and custom quantities ready for quote dispatch.
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A389] hover:text-[#0B3B3C]"
              >
                <span>Browse Products</span>
                <IoArrowForward size={14} />
              </Link>
            </div>

            {/* Custom Synthesis */}
            <div className="bg-white rounded-3xl border border-[#D5EFEA] p-6 space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f3d3a] flex items-center justify-center">
                  <IoFlaskOutline size={22} />
                </div>
                <h3 className="font-bold text-sm text-[#0E2358]">Custom Synthesis CDMO</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Request custom milligrams to kilogram synthesis for novel building blocks and reagents.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f3d3a] hover:text-[#00A389]"
              >
                <span>Explore Services</span>
                <IoArrowForward size={14} />
              </Link>
            </div>

            {/* Analytical Support */}
            <div className="bg-white rounded-3xl border border-[#D5EFEA] p-6 space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-800 flex items-center justify-center">
                  <IoDocumentTextOutline size={22} />
                </div>
                <h3 className="font-bold text-sm text-[#0E2358]">Analytical Dossiers &amp; CoA</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Access 1H/13C NMR spectra, mass spectrometry data, and HPLC chromatographic purity dossiers.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-800 hover:text-[#00A389]"
              >
                <span>Contact Analysts</span>
                <IoArrowForward size={14} />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
