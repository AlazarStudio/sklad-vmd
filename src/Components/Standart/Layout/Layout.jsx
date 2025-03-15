import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '../../Blocks/Footer/Footer'
import Header from '../../Blocks/Header/Header'

function Empty({ children, user, ...props }) {
	return (
		<>
			<Header user={user} />
			<Outlet />
			{/* <Footer /> */}
		</>
	)
}

export default Empty
