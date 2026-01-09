'use client';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './settings.css';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

export default function SettingsPage() {
    const { themeName, toggleTheme } = useTheme();

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const saveSettings = () => {
        alert("Settings saved! ");
    };

    return (
        <div className="admin-layout">
            <Header />

            <div className="admin-body">
                <Sidebar />

                <main className="admin-content settings-page">

                    <h2>User Settings</h2>
                    <p className="settings-subtitle">Manage your profile and preferences.</p>

                    <div className="settings-section">
                        <h3>Profile Information</h3>

                        <div className="settings-grid">

                            <div className="setting-row">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter full name"
                                    value={profile.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="setting-row">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@mail.com"
                                    value={profile.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="setting-row">
                                <label>Mobile Number</label>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    name="phone"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={profile.phone}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="settings-section">
                        <h3>Preferences</h3>

                        <div className="settings-grid">

                            <div className="setting-row">
                                <label>Appearance (Theme)</label>
                                <button className="theme-toggle-btn" onClick={toggleTheme}>
                                    Switch to {themeName === 'primary' ? 'Secondary Theme' : 'Primary Theme'}
                                </button>
                            </div>

                            <div className="setting-row">
                                <label>Language</label>
                                <select>
                                    <option>English</option>
                                    <option>Hindi</option>
                                    <option>Telugu</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    <div className="settings-section">
                        <h3>Change Password</h3>

                        <div className="settings-grid">

                            <div className="setting-row">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter current password"
                                />
                            </div>

                            <div className="setting-row">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div className="setting-row">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    placeholder="Re-enter new password"
                                />
                            </div>

                        </div>

                        <button className="save-password-btn">
                            Update Password
                        </button>
                    </div>


                    <div className="settings-section">
                        <h3>Account</h3>

                        <div className="settings-grid">

                            <button className="logout-btn" onClick={() => {
                                localStorage.removeItem("isLoggedIn");
                                window.location.href = '/login';
                            }}>
                                Logout
                            </button>

                            <button className="delete-btn">
                                Delete Account
                            </button>

                        </div>
                    </div>

                    <button className="save-btn" onClick={saveSettings}>
                        Save Settings
                    </button>

                </main>
            </div>
        </div>
    );
}



