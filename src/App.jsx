import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AuthContext } from './AuthContext'
import Auth from './Components/Pages/Auth/Auth'
import MainPage from './Components/Pages/MainPage/MainPage'
import NotFoundPage from './Components/Pages/NotFoundPage/NotFoundPage'
import ProductDetailPage from './Components/Pages/ProductDetailPage/ProductDetailPage'
import UpdateContractor from './Components/Pages/UpdateContractor/UpdateContractor'
import UpdateMoto from './Components/Pages/UpdateMoto/UpdateMoto'
import UpdateProduct from './Components/Pages/UpdateProduct/UpdateProduct'
import Layout from './Components/Standart/Layout/Layout'

function App() {
	const { isAuthenticated, user } = useContext(AuthContext)
	// console.log(user);
	
	return (
		<>
			<Routes>
				{isAuthenticated ? (
					<Route path='/' element={<Layout user={user} />}>
						<Route index element={<MainPage user={user} />} />
						<Route path='/:id' element={<MainPage user={user} />} />
						<Route path='/:id/:idType' element={<MainPage user={user} />} />
						<Route path='/product/:linkName' element={<ProductDetailPage user={user} />} />

						<Route path='/update-product/:id' element={<UpdateProduct user={user} />} />
						<Route path='/update-moto/:id' element={<UpdateMoto user={user} />} />
						<Route
							path='/update-contractor/:id'
							element={<UpdateContractor user={user} />}
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
