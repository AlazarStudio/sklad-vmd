import { Link, useLocation } from 'react-router-dom'

import styles from './Sales.module.css'

function Sales({ children, ...props }) {
	let location = useLocation()

	return (
		<div className={styles.products_header__wrapper}>
			<div className={styles.products_buttons}>
				<Link
					to='/sales/shipments'
					className={
						location.pathname === '/sales/shipments' ||
						location.pathname === '/sales'
							? styles.active
							: ''
					}
				>
					Оптовые
				</Link>
				<Link
					to='/sales/retails'
					className={
						location.pathname === '/sales/retails' ? styles.active : ''
					}
				>
					Розничные
				</Link>
			</div>
		</div>
	)
}

export default Sales
