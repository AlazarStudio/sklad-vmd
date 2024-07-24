import { Link, useLocation, useParams } from 'react-router-dom'

import styles from './Contractors.module.css'

function Contractors({ children, ...props }) {
	let { id } = useParams()
	let location = useLocation()
	// console.log(id)

	return (
		<div className={styles.products_header__wrapper}>
			<div className={styles.products_buttons}>
				<Link
					to='/contractors'
					className={
						location.pathname === '/contractors'
							? styles.active
							: ''
					}
				>
					Контрагенты
				</Link>
				<Link
					to='/contractors/contracts'
					className={
						location.pathname === '/contractors/contracts' ? styles.active : ''
					}
				>
					Договоры
				</Link>
			</div>
		</div>
	)
}

export default Contractors
