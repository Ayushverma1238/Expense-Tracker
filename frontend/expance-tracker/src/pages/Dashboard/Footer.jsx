import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">ExpenseTracker</h2>
          <p className="mt-3 text-sm text-gray-600">
            Track your income, expenses, and savings efficiently. 
            Stay in control of your finances with smart insights.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-gray-600 hover:font-semibold cursor-pointer"><Link to="/dashboard">Dashboard</Link></li>
            <li className="hover:text-gray-600 hover:font-semibold cursor-pointer"><Link to="/income">Income</Link></li>
            <li className="hover:text-gray-600 hover:font-semibold cursor-pointer"><Link to="/expense">Expenses</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-medium text-gray-600 mb-3">Connect</h3>
          <div className="flex gap-4 text-xl">
            <a target="_blank" href={'https://github.com/Ayushverma1238'}> <FaGithub className="cursor-pointer hover:text-gray-600" /></a>
            <a target="_blank" href={'https://www.linkedin.com/in/ayush-verma-0b90bb29a/'}> <FaLinkedin className="cursor-pointer hover:text-gray-600" /></a>
            <a target="_blank" href={'https://www.instagram.com/ayushverma1238/'}> <FaInstagram className="cursor-pointer hover:text-gray-600" /></a>

          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} ExpenseTracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;