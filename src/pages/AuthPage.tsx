import { FormEvent, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function AuthPage() {
  const { signIn, signUp } = useAuth()

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setMessage('')

    if (!isLogin && password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setMessage('Password must contain at least 6 characters.')
      return
    }

    setLoading(true)

    const result = isLogin
      ? await signIn(email, password)
      : await signUp(email, password)

    if (result.error) {
      setMessage(result.error.message)
    } else if (isLogin) {
      setMessage('Login successful.')
    } else {
      setMessage(
        'Account created. Check your email if confirmation is required.'
      )
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Fiscora
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {isLogin
              ? 'Sign in to manage your financial life.'
              : 'Create your Fiscora account.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="Confirm your password"
              />
            </div>
          )}

          {message && (
            <div className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? 'Please wait...'
              : isLogin
                ? 'Sign In'
                : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setMessage('')
            }}
            className="font-medium text-slate-900 underline dark:text-white"
          >
            {isLogin
              ? 'New to Fiscora? Create an account'
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}