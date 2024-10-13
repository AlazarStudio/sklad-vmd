import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AuthContext } from './AuthContext'
import Auth from './Components/Pages/Auth/Auth'
import MainPage from './Components/Pages/MainPage/MainPage'
import NotFoundPage from './Components/Pages/NotFoundPage/NotFoundPage'
import ProductDetailPage from './Components/Pages/ProductDetailPage/ProductDetailPage'
import UpdateContractor from './Components/Pages/UpdateContractor/UpdateContractor'
import UpdateProduct from './Components/Pages/UpdateProduct/UpdateProduct'
import Layout from './Components/Standart/Layout/Layout'

function App() {
	const { isAuthenticated } = useContext(AuthContext)
	return (
		<>
			<Routes>
				{isAuthenticated ? (
					<Route path='/' element={<Layout />}>
						<Route index element={<MainPage />} />
						<Route path='/:id' element={<MainPage />} />
						<Route path='/:id/:idType' element={<MainPage />} />
						<Route path='/product/:linkName' element={<ProductDetailPage />} />

						<Route path='/update-product/:id' element={<UpdateProduct />} />
						<Route
							path='/update-contractor/:id'
							element={<UpdateContractor />}
						/>

						<Route path='*' element={<NotFoundPage />} />
					</Route>
				) : (
					<>
						<Route path='/auth' element={<Auth />} />
						<Route path='*' element={<Auth />} />
					</>
				)}
			</Routes>
		</>
	)
}

export default App
