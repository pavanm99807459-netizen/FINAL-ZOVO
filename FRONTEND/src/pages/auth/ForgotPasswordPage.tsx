import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-3xl font-display font-bold text-foreground">ZOVO</h1>
          </Link>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Reset password</h2>
          <p className="text-muted-foreground">Enter your email to receive a reset link</p>
        </div>
        <form className="bg-card rounded-2xl border border-border p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <Button type="submit" className="w-full" size="lg">Send Reset Link</Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Remember your password? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
