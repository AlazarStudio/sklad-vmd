import { Link } from 'react-router-dom'

import styles from './Burger.module.css'

function Burger({ children, ...props }) {
	return (
		<nav>
			<ul className={styles.nav_list}>
				<li>
					<Link to='/warehouse' className={styles.nav_list__item}>
						СКЛАД
					</Link>
				</li>
				<li>
					<Link to='/sales' className={styles.nav_list__item}>
						ПРОДАЖИ
					</Link>
				</li>
				<li>
					<Link to='/products' className={styles.nav_list__item}>
						ТОВАРЫ
					</Link>
				</li>
				<li>
					<Link to='/contractors' className={styles.nav_list__item}>
						КОНТРАГЕНТЫ
					</Link>
				</li>
				<li>
					<Link to='/reports' className={styles.nav_list__item}>
						ОТЧЕТЫ
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Burger
