import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Contractors from './Components/Pages/Contractors/Contractors'
import MainPage from './Components/Pages/MainPage/MainPage'
import NotFoundPage from './Components/Pages/NotFoundPage/NotFoundPage'
import ProductDetailPage from './Components/Pages/ProductDetailPage/ProductDetailPage'
import Products from './Components/Pages/Products/Products'
import Purchases from './Components/Pages/Purchases/Purchases'
import Sales from './Components/Pages/Sales/Sales'
import Layout from './Components/Standart/Layout/Layout'
import UpdateProduct from './Components/Pages/UpdateProduct/UpdateProduct'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route path='/:id' element={<MainPage />} />
					<Route path='/:id/:idType' element={<MainPage />} />
					<Route path='/product/:linkName' element={<ProductDetailPage />} />

					<Route path='/update-product/:id' element={<UpdateProduct />} />

					{/* <Route path='/purchases' element={<Purchases />} />
					<Route path='/sales' element={<Sales />} />
					<Route path='/products' element={<Products />} />
					<Route path='/contractors' element={<Contractors />} /> */}
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
