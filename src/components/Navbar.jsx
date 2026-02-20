// import React from 'react';
// import {
//     ShieldCheck,
//     Sun,
//     Moon,
//     Search,
//     Bell,
//     Settings,
//     LogOut,
//     ChevronDown
// } from 'lucide-react';

// const Navbar = ({ theme, onToggleTheme, onLogout }) => {
//     return (
//         <nav style={{
//             height: '80px',
//             background: 'var(--bg-sidebar)',
//             borderBottom: '1px solid var(--glass-border)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             padding: '0 40px',
//             position: 'sticky',
//             top: 0,
//             zIndex: 1000,
//             backdropFilter: 'blur(10px)'
//         }}>
//             {/* Logo Section */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                 <div style={{
//                     width: '40px',
//                     height: '40px',
//                     background: 'var(--primary)',
//                     borderRadius: '10px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                 }}>
//                     <ShieldCheck color="#0f172a" size={24} />
//                 </div>
//                 <h2 style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
//                     DC <span className="text-gradient" style={{ fontWeight: '400' }}>Admin</span>
//                 </h2>
//             </div>

//             {/* Center Navigation - Links could go here */}
//             <div style={{ display: 'flex', gap: '32px', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500' }}>
//                 <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Dashboard</span>
//                 <span style={{ cursor: 'pointer' }}>Archives</span>
//                 <span style={{ cursor: 'pointer' }}>Protocols</span>
//                 <span style={{ cursor: 'pointer' }}>Nodes</span>
//             </div>

//             {/* Actions Section */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
//                 {/* Search simulation in Navbar */}
//                 <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//                     <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
//                     <input
//                         type="text"
//                         placeholder="Search telemetry..."
//                         style={{
//                             padding: '10px 12px 10px 40px',
//                             borderRadius: '10px',
//                             background: 'rgba(0,0,0,0.05)',
//                             border: '1px solid var(--glass-border)',
//                             color: 'var(--text-main)',
//                             width: '240px',
//                             outline: 'none',
//                             fontSize: '0.9rem'
//                         }}
//                     />
//                 </div>

//                 <button
//                     onClick={onToggleTheme}
//                     style={{
//                         background: 'rgba(255, 255, 255, 0.05)',
//                         border: 'none',
//                         color: 'var(--text-main)',
//                         cursor: 'pointer',
//                         padding: '8px',
//                         borderRadius: '50%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         transition: 'var(--transition)'
//                     }}>
//                     {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
//                 </button>

//                 <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }} />

//                 {/* Profile Dropdown */}
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
//                     <div style={{
//                         width: '38px',
//                         height: '38px',
//                         borderRadius: '10px',
//                         background: 'linear-gradient(135deg, var(--lime), var(--success))',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         fontWeight: '700',
//                         color: '#0f172a'
//                     }}>
//                         SA
//                     </div>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }} className="hide-mobile">
//                         <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>Swati Ayc</span>
//                         <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Lead Architect</span>
//                     </div>
//                     <ChevronDown size={14} color="var(--text-muted)" />
//                 </div>

//                 <button
//                     onClick={onLogout}
//                     style={{
//                         background: 'rgba(228, 95, 43, 0.08)',
//                         color: 'var(--warning)',
//                         border: '1px solid rgba(228, 95, 43, 0.2)',
//                         padding: '10px',
//                         borderRadius: '10px',
//                         cursor: 'pointer'
//                     }}>
//                     <LogOut size={18} />
//                     Access Login Gate
//                 </button>
//             </div>

//             <style>{`
//         @media (max-width: 768px) {
//           .hide-mobile { display: none; }
//         }
//       `}</style>
//         </nav>
//     );
// };

// export default Navbar;



import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Sun,
  Moon,
  Search,
  Settings,
  LogOut,
  ChevronDown,
  User
} from 'lucide-react';

const Navbar = ({ theme, onToggleTheme, onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav style={{
      height: '80px',
      background: 'var(--bg-sidebar)',
      borderBottom: '1px solid var(--glass-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'var(--primary)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ShieldCheck color="#0f172a" size={24} />
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
          DC <span className="text-gradient" style={{ fontWeight: '400' }}>Admin</span>
        </h2>
      </div>

      {/* Center Links */}
      <div style={{
        display: 'flex',
        gap: '32px',
        color: 'var(--text-muted)',
        fontSize: '0.95rem',
        fontWeight: '500'
      }}>
        <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Dashboard</span>
        <span style={{ cursor: 'pointer' }}>Archives</span>
        <span style={{ cursor: 'pointer' }}>Protocols</span>
        <span style={{ cursor: 'pointer' }}>Nodes</span>
      </div>

      {/* Right Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>

        {/* Search */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search telemetry..."
            style={{
              padding: '10px 12px 10px 40px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.05)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-main)',
              width: '240px',
              outline: 'none',
              fontSize: '0.9rem'
            }}
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }} />

        {/* Profile Dropdown */}
        <div
          ref={dropdownRef}
          style={{ position: 'relative' }}
        >
          <div
            onClick={() => setOpen(!open)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--lime), var(--success))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              color: '#0f172a'
            }}>
              SA
            </div>

            <div className="hide-mobile" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>
                Swati Ayc
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Lead Architect
              </span>
            </div>

            <ChevronDown
              size={14}
              style={{
                color: 'var(--text-muted)',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: '0.3s'
              }}
            />
          </div>

          {/* Dropdown Menu */}
          {open && (
            <div style={{
              position: 'absolute',
              top: '60px',
              right: 0,
              width: '220px',
              background: 'var(--bg-sidebar)',
              border: '1px solid var(--glass-border)',
              borderRadius: '14px',
              padding: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(15px)'
            }}>
              <div style={{
                padding: '12px',
                borderBottom: '1px solid var(--glass-border)',
                marginBottom: '8px'
              }}>
                <p style={{ fontWeight: '700' }}>Swati Ayc</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  swati@email.com
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button style={menuBtnStyle}>
                  <User size={16} /> Profile
                </button>

                <button style={menuBtnStyle}>
                  <Settings size={16} /> Settings
                </button>

                <button
                  onClick={onLogout}
                  style={{
                    ...menuBtnStyle,
                    color: 'var(--warning)'
                  }}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none; }
        }
      `}</style>
    </nav>
  );
};

const menuBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px',
  borderRadius: '8px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--text-main)',
  fontSize: '0.9rem',
  textAlign: 'left'
};

export default Navbar;