import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../context/store'
import style from './loginForm.module.css'

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { signIn } = useStore()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('') // Clear error when user types
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })

            const data = await response.json()

            if (response.ok && data.token) {
                // Sign in with the token (will be stored in cookies)
                signIn(data.token)
                
                // Navigate to shop page
                navigate('/shop')
            } else {
                setError('Invalid username or password')
            }
        } catch (err) {
            setError('Login failed. Please try again.')
            console.error('Login error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className={style.container}>
            <div className={style.formWrapper}>
                <h1 className={style.title}>Login</h1>
                <p className={style.subtitle}>Sign in to your account</p>

                <form onSubmit={handleSubmit} className={style.form}>
                    {error && (
                        <div className={style.error}>
                            {error}
                        </div>
                    )}

                    <div className={style.formGroup}>
                        <label htmlFor="username" className={style.label}>
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={style.input}
                            placeholder="Enter your username"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="password" className={style.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={style.input}
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={style.submitBtn}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className={style.hint}>
                        Demo credentials: username: <strong>mor_2314</strong>, password: <strong>83r5^_</strong>
                    </p>

                    <p className={style.footer}>
                        Don't have an account? <a href="/sign-up">Sign up</a>
                    </p>
                </form>
            </div>
        </main>
    )
}

export default LoginForm
