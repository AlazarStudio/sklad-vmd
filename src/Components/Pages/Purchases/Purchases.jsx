import { Link, useLocation, useParams } from 'react-router-dom'

import styles from './Purchases.module.css'

function Purchases({ children, ...props }) {
	let { id } = useParams()
	let location = useLocation()
	// console.log(id)

	return (
		<div className={styles.products_header__wrapper}>
			<div className={styles.products_buttons}>
				<Link
					to='/purchases/acceptance'
					className={
						location.pathname === '/purchases/acceptance' ||
						location.pathname === '/purchases'
							? styles.active
							: ''
					}
				>
					Приемки
				</Link>
				<Link
					to='/purchases/invoices-received'
					className={
						location.pathname === '/purchases/invoices-received'
							? styles.active
							: ''
					}
				>
					Счета-фактуры полученные
				</Link>
			</div>
		</div>
	)
}

export default Purchases
