import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './RemainsProduct.module.css'

function RemainsProduct({ ...props }) {
	return (
		<div className={styles.product_wrapper}>
			<div className={styles.checkBox_wrapper}>
				<CheckBox />
			</div>
			<p className={styles.name}> {props.name} </p>
			<p className={styles.code}>{props.code}</p>
			<p className={styles.remains}>{props.remains}</p>
			<p className={styles.cost_price}>
				{props.costPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
			<p className={styles.cost_price_sum}>
				{(parseInt(props.costPrice) * parseInt(props.remains))
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
			<p className={styles.sale_price}>
				{props.currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
			<p className={styles.sale_price_sum}>
				{(parseInt(props.currentPrice) * parseInt(props.remains))
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
		</div>
	)
}

export default RemainsProduct
