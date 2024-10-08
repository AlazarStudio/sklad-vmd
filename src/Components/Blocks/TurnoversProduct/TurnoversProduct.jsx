import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './TurnoversProduct.module.css'

function TurnoversProduct({ ...props }) {
	const formatDate = dateString => {
		const [year, month, day] = dateString.split('-')
		return `${day}.${month}.${year}`
	}

	return (
		<div className={styles.product_wrapper}>
			<div className={styles.checkBox_wrapper}>
				<CheckBox />
			</div>
			<p className={styles.name}> {props.name} </p>
			<p className={styles.code}>{props.code}</p>
			<p className={styles.date_sale}>{formatDate(props.dateSale)}</p>
			<div className={styles.quantity_sum}>
				<p className={styles.quantity}>20</p>
				<p className={styles.sum}>480 000</p>
			</div>
			<div className={styles.quantity_sum}>
				<p className={styles.quantity}>10</p>
				<p className={styles.sum}>240 000</p>
			</div>
			<div className={styles.quantity_sum}>
				<p className={styles.income}>120 000</p>
			</div>
		</div>
	)
}

export default TurnoversProduct
