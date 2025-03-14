import { Link, useLocation, useParams } from 'react-router-dom'

import styles from './Products.module.css'

function Products({ children, user, ...props }) {
	let { id } = useParams()
	let location = useLocation()
	// console.log(user)

	return (
		<>
			{user?.role !== 'ADMIN' ? null : (
				<div className={styles.products_header__wrapper}>
					<div className={styles.products_buttons}>
						<Link
							to='/products'
							className={
								location.pathname === '/products' || location.pathname === '/'
									? styles.active
									: ''
							}
						>
							Магазин
						</Link>
						<Link
							to='/products/write-offs'
							className={
								location.pathname === '/products/write-offs'
									? styles.active
									: ''
							}
						>
							Списания
						</Link>
						{/* <Link
					to='/products/remains'
					className={
						location.pathname === '/products/remains' ? styles.active : ''
					}
				>
					Остатки
				</Link> */}
						{/* <Link
					to='/products/turnovers'
					className={
						location.pathname === '/products/turnovers' ? styles.active : ''
					}
				>
					Обороты
				</Link> */}
					</div>
				</div>
			)}
		</>
	)
}

export default Products
