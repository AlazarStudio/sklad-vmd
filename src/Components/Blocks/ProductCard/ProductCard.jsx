import { useNavigate } from 'react-router-dom'

import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './ProductCard.module.css'

function ProductCard({ linkName, operation, onSelect, ...props }) {
	const navigate = useNavigate()

	const goToUpdateProduct = () => {
		navigate(operation, { state: { product: props } })
	}

	const handleCheckBoxChange = event => {
		onSelect(props, event.target.checked)
	}

	return (
		<div className={styles.product_wrapper} onClick={goToUpdateProduct}>
			<div className={styles.checkBox_wrapper}>
				<CheckBox onChange={handleCheckBoxChange} />
			</div>
			<p className={styles.name}>{props.name}</p>
			<p className={styles.code}>{props.code}</p>
			<p className={styles.unit_of_measurement}>{props.quantity}</p>
			<p className={styles.cost_price}>
				{props.costPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
			<p className={styles.sale_price}>
				{props.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
			<p className={styles.color}>{props.color}</p>
			<p className={styles.frameGrowth}>{props.frameGrowth}"</p>
			<p className={styles.wheelsSize}>{props.wheelsSize}</p>
		</div>
	)
}

export default ProductCard
