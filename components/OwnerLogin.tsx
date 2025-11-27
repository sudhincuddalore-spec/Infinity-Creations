import React, { useState } from 'react';
import Modal from './ui/Modal';
import { KeyRound } from 'lucide-react';

interface OwnerLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const OwnerLogin: React.FC<OwnerLoginProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "infinity123") {
        localStorage.setItem('ownerLoggedIn', 'true');
        window.location.reload(); // Simple reload to refresh permission state in components
    } else {
        setError("Invalid Password");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Owner Access" className="max-w-sm">
        <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex justify-center mb-4">
                <div className="bg-primary-gold/10 p-4 rounded-full text-primary-gold">
                    <KeyRound size={32} />
                </div>
            </div>
            <input 
                type="password" 
                placeholder="Enter Password" 
                className="w-full p-3 border rounded-lg"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button className="w-full bg-navy-blue text-white py-3 rounded-lg font-bold">Login</button>
            <p className="text-xs text-center text-gray-400">Default: infinity123</p>
        </form>
    </Modal>
  );
};

export default OwnerLogin;