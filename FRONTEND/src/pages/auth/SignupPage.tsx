import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtp) { setShowOtp(true); return; }
    setLoading(true);
    const success = await signup(name, email, phone, password);
    setLoading(false);
    if (success) {
      toast({ title: "Account created!", description: "Welcome to ZOVO." });
      navigate('/profile');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-3xl font-display font-bold text-foreground">ZOVO</h1>
          </Link>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Create account</h2>
          <p className="text-muted-foreground">Join ZOVO for a premium shopping experience</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Mobile Number</Label>
            <Input id="phone" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {showOtp && (
            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="otp">OTP (sent to your mobile)</Label>
              <Input id="otp" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
            </div>
          )}
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? 'Creating account...' : showOtp ? 'Verify & Create Account' : 'Send OTP'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
