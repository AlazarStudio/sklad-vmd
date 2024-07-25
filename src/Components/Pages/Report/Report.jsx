import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './Report.module.css'

function Report({ ...props }) {
	return (
		<div className={styles.product_wrapper}>
			<div className={styles.checkBox_wrapper}>
				<CheckBox />
			</div>
			<p className={styles.number}>0001</p>
			<p className={styles.time}>09.07.2024 12:00</p>
			<p className={styles.category}>Отгрузки</p>
			<p className={styles.organization}>Вело Мото & Drive</p>
			<p className={styles.period}>09.07.2024 - 20.07.2024 </p>
		</div>
	)
}

export default Report
