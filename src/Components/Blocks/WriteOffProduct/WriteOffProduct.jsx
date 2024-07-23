import CheckBox from '../../UI/CheckBox/CheckBox'
import styles from './WriteOffProduct.module.css'

function WriteOffProduct({ children, ...props }) {
	return (
		<div className={styles.product_wrapper}>
			<div className={styles.checkBox_wrapper}>
				<CheckBox />
			</div>
			<p className={styles.number}> {props.code} </p>
			<p className={styles.time}> {props.additionalDetails.disposalDate} {props.additionalDetails.disposalTime} </p>
			<p className={styles.warehouse}> {props.additionalDetails.fromWarehouse} </p>
			<p className={styles.org}> {props.additionalDetails.organization} </p>
			<p className={styles.sum}>
				{props.currentPrice
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
			</p>
		</div>
	)
}

export default WriteOffProduct
