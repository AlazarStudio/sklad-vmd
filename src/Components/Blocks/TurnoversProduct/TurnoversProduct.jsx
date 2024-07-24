import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './TurnoversProduct.module.css'

function TurnoversProduct({ ...props }) {
	return (
		<div className={styles.product_wrapper}>
			<div className={styles.checkBox_wrapper}>
				<CheckBox />
			</div>
			<p className={styles.name}> {props.name} </p>
			<p className={styles.code}>{props.code}</p>
			<div className={styles.quantity_sum}>
				<p className={styles.quantity}>0</p>
				<p className={styles.sum}>0</p>
			</div>
			<div className={styles.quantity_sum}>
				<p className={styles.quantity}>20</p>
				<p className={styles.sum}>480 000</p>
			</div>
			<div className={styles.quantity_sum}>
				<p className={styles.quantity}>10</p>
				<p className={styles.sum}>240 000</p>
			</div>
			<div className={styles.quantity_sum}>
				<p className={styles.quantity}>10</p>
				<p className={styles.sum}>240 000</p>
			</div>
		</div>
	)
}

export default TurnoversProduct
