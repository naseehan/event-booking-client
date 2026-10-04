import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/navbar/ticket-logo.png";
import { UserContext } from "../context/userContext";
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/login");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Noble Events Logo" className="h-9 w-auto object-contain transition-transform group-hover:scale-105" />
            <span className="font-extrabold text-xl tracking-tight text-slate-800">
              Noble<span className="text-emerald-600">Events</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-emerald-600 font-semibold" : "text-slate-600 hover:text-emerald-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`text-sm font-medium transition-colors ${
                isActive("/events") ? "text-emerald-600 font-semibold" : "text-slate-600 hover:text-emerald-600"
              }`}
            >
              Browse Events
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive("/contact") ? "text-emerald-600 font-semibold" : "text-slate-600 hover:text-emerald-600"
              }`}
            >
              Contact Us
            </Link>

            {/* Cart Link with Badge */}
            {user && user.token && (
              <Link
                to="/cart2"
                className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors"
                title="Your Cart"
              >
                <i className="fa-solid fa-cart-shopping text-lg"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Auth / Profile Actions */}
            {user && user.token ? (
              <div className="flex items-center space-x-3 ml-2">
                <Link
                  to="/user"
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    isActive("/user")
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                  title={user.email}
                >
                  <i className="fa-solid fa-circle-user text-emerald-600"></i>
                  <span className="max-w-[120px] truncate">{user.email ? user.email.split('@')[0] : "Account"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-100"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-emerald-600 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 rounded-lg shadow-sm transition-all shadow-emerald-200 hover:shadow-md"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {user && user.token && (
              <Link to="/cart2" className="relative p-2 text-slate-600">
                <i className="fa-solid fa-cart-shopping text-lg"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            to="/events"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Browse Events
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Contact Us
          </Link>

          {user && user.token ? (
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/user"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-emerald-700 bg-emerald-50"
              >
                Dashboard ({user.email})
              </Link>
              <button
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleLogout(e);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-rose-600 hover:bg-rose-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-center rounded-md font-medium text-slate-700 bg-slate-100"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-center rounded-md font-medium text-white bg-emerald-600"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
