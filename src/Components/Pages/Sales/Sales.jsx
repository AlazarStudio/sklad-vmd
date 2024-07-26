import { Link, useLocation } from 'react-router-dom'

import styles from './Sales.module.css'

function Sales({ children, ...props }) {

	let location = useLocation()
	
	return (
		<div className={styles.products_header__wrapper}>
			<div className={styles.products_buttons}>
				{/* <Link
					to='/sales/shipments'
					className={
						location.pathname === '/sales/shipments' ||
						location.pathname === '/sales'
							? styles.active
							: ''
					}
				>
					Отгрузки
				</Link>
				<Link
					to='/sales/invoices-issued'
					className={
						location.pathname === '/sales/invoices-issued' ? styles.active : ''
					}
				>
					Счета-фактуры выданные
				</Link> */}
			</div>
		</div>
	)
}

export default Sales
