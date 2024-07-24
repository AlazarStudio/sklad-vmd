import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './AcceptanceProduct.module.css'

function AcceptanceProduct({ ...props }) {
	return (
		<div className={styles.product_wrapper}>
			<div className={styles.checkBox_wrapper}>
				<CheckBox />
			</div>
			<p className={styles.number}>0001</p>
			<p className={styles.time}>09.07.2024  12:00</p>
			<p className={styles.to_warehouse}>Основной склад</p>
			<p className={styles.contractors}>Контрагент</p>
			<p className={styles.organization}>Вело Мото & Drive</p>
			<p className={styles.sum}>480 000</p>
		</div>
	)
}

export default AcceptanceProduct
