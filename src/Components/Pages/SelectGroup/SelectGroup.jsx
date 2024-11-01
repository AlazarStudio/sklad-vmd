import { Link, useNavigate } from 'react-router-dom'

import styles from './SelectGroup.module.css'

function SelectGroup({ children, ...props }) {
	const navigate = useNavigate()

	return (
		<div className={styles.wrapper}>
			<div className={styles.back_wrapper}>
				<img
					style={{ cursor: 'pointer' }}
					src='/images/back.png'
					alt=''
					onClick={() => navigate('/warehouse')}
				/>
				<p onClick={() => navigate('/warehouse')}>Вернуться назад</p>
			</div>
			<p className={styles.select}>Выберите группу товара, который хотите добавить:</p>
			<div className={styles.links}>
				<Link to='/add-product-bike'>Велосипеды</Link>
				<Link to='/add-product-motorcycle'>Мотоциклы</Link>
				<Link to='/add-product-atvs'>Квадроциклы</Link>
				<Link to='/add-product-moped'>Мопеды</Link>
				{/* <Link to=''>Самокаты</Link> */}
			</div>
		</div>
	)
}

export default SelectGroup
