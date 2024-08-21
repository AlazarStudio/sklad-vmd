import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './WriteOffProduct.module.css'

function WriteOffProduct({ quantity, reason, ...props }) {
	const formatDate = dateString => {
		const options = {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}

		return new Date(dateString).toLocaleString('ru-RU', options)
	}

	return (
		<div className={styles.product_wrapper}>
			<div className={styles.checkBox_wrapper}>{/* <CheckBox /> */}</div>
			<p className={styles.name}>{props.name}</p>
			<p className={styles.code}>{props.code}</p>
			<p className={styles.sale_price}>
				{/* {props.priceForSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} */}
				{formatDate(props.createdAt)}
			</p>
			<p className={styles.unit_of_measurement}>{quantity}</p>
			<p className={styles.reason}>{reason}</p>
			<p className={styles.cost_price}>
				{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
		</div>
	)
}

export default WriteOffProduct
