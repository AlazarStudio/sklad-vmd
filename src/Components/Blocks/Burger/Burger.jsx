import { Link, useLocation } from 'react-router-dom'

import styles from './Burger.module.css'

function Burger({ children, ...props }) {
	const location = useLocation()
	return (
		<nav>
			<ul className={styles.nav_list}>
				<li>
					<Link
						to='/warehouse'
						className={
							location.pathname === '/warehouse'
								? styles.active
								: styles.nav_list__item
						}
					>
						СКЛАД
					</Link>
				</li>
				<li>
					<Link
						to='/sales'
						className={
							location.pathname === '/sales' ||
							location.pathname === '/sales/shipments' ||
							location.pathname === '/sales/retails'
								? styles.active
								: styles.nav_list__item
						}
					>
						ПРОДАЖИ
					</Link>
				</li>
				<li>
					<Link
						to='/products'
						className={
							location.pathname === '/' ||
							location.pathname === '/products' ||
							location.pathname === '/products/write-offs'
								? styles.active
								: styles.nav_list__item
						}
					>
						ТОВАРЫ
					</Link>
				</li>
				<li>
					<Link
						to='/contractors'
						className={
							location.pathname === '/contractors'
								? styles.active
								: styles.nav_list__item
						}
					>
						КОНТРАГЕНТЫ
					</Link>
				</li>
				{/* <li>
					<Link to='/reports' className={styles.nav_list__item}>
						ОТЧЕТЫ
					</Link>
				</li> */}
			</ul>
		</nav>
	)
}

export default Burger
