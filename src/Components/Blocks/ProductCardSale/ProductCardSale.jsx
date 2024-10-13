import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './ProductCardSale.module.css'

function ProductCardSale({ fromWarehouse, linkName, onSelect, ...props }) {
	const handleCheckBoxChange = event => {
		onSelect(props, event.target.checked)
	}

	return (
		<div className={styles.product_wrapper}>
			<p className={styles.name}>{props.Item.name}</p>
			<p className={styles.code}>{props.Item.code}</p>
			<p className={styles.unit_of_measurement}>{props.quantity}</p>
			<p className={styles.cost_price}>
				{props.Item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
			<p className={styles.sale_price}>
				{props.Item.priceForSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
			<p className={styles.color}>{props.Item.color}</p>
			<p className={styles.frameGrowth}>{props.Item.frameGrouve}"</p>
			<p className={styles.wheelsSize}>{props.Item.wheelSize}</p>
			<div className={styles.checkBox_wrapper}>
				<img src="/images/delete.png" alt="" />
				{/* <CheckBox onChange={handleCheckBoxChange} /> */}
			</div>
		</div>
	)
}

export default ProductCardSale
