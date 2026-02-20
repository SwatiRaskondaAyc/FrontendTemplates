import React, { useState } from 'react';
import { Database, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            onLogin();
        }, 1500);
    };

    return (
        <div className="login-page" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at top right, #1e293b 0%, #0f172a 100%)'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-card"
                style={{ padding: '40px', width: '90%', maxWidth: '450px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'var(--primary)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 0 20px rgba(154, 193, 240, 0.4)'
                    }}>
                        <Database color="#0f172a" size={32} />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>
                        Data<span className="text-gradient">Core</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Advanced Big Data Analytics Portal</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Username"
                            className="input-field"
                            style={{ paddingLeft: '48px' }}
                            defaultValue="admin@datacore.io"
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input-field"
                            style={{ paddingLeft: '48px' }}
                            defaultValue="admin123"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ marginTop: '12px', justifyContent: 'center' }}
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : 'Access Neural Core'}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    By entering, you agree to our <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Security Protocols</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
