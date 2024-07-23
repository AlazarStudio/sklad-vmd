import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './Product.module.css'

function Product({ ...props }) {
	return (
		<div className={styles.product_wrapper}>
			<div className={styles.checkBox_wrapper}>
				<CheckBox />
			</div>
			<p className={styles.name}> {props.name} </p>
			<p className={styles.code}> {props.code} </p>
			<p className={styles.unit_of_measurement}> {props.unitOfMeasurement} </p>
			<p className={styles.sale_price}> {props.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} </p>
		</div>
	)
}

export default Product
