import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [user, setUser] = useState(null)
	const navigate = useNavigate()
	const token = Cookies.get('token')

	useEffect(() => {
		if (token) {
			try {
				const decodeUser = jwtDecode(token)
				setUser(decodeUser)
				setIsAuthenticated(!!token)
			} catch (error) {
				console.error('Ошибка декодирования токена:', error)
				Cookies.remove('token')
				setIsAuthenticated(false)
				setUser(null)
			}
		}
		// setIsAuthenticated(!!token)
	}, [isAuthenticated])

	// console.log(isAuthenticated);
	// console.log(user);
	
	

	const login = token => {
		try {
			const decodedUser = jwtDecode(token)
			Cookies.set('token', token, { expires: 10 })
			setIsAuthenticated(true)
			setUser(decodedUser)
		} catch (error) {
			console.error('Ошибка декодирования токена при логине:', error)
		}
	}

	const logout = () => {
		Cookies.remove('token')
		setIsAuthenticated(false)
		setUser(null)
		navigate('/auth')
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
