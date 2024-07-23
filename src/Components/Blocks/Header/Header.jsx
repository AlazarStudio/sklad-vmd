import { Link } from 'react-router-dom'

import Burger from '../Burger/Burger'

import styles from './Header.module.css'

function Header({ children, ...props }) {
	return (
		<header className={styles.header}>
			<div className={styles.widthBlock}>
				<img src='/images/header_logo.png' alt='' />
				<Burger />
				<img src="/images/search_header.png" alt="" />
			</div>
		</header>
	)
}

export default Header
