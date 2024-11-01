// src/Components/Blocks/Product/Product.jsx
import { useNavigate } from 'react-router-dom'

import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './Product.module.css'

function Product({
	isVisCheckBox,
	onSelect,
	operation,
	linkName,
	itemCount,
	...props
}) {
	const navigate = useNavigate()

	const goToProductDetail = () => {
		navigate(`/product/${linkName}`, {
			state: { fromWarehouse: false, group: props.group.name }
		})
	}

	const handleCheckBoxChange = event => {
		onSelect(props, event.target.checked)
	}

	return (
		<div
			className={styles.product_wrapper}
			onClick={operation ? goToProductDetail : null}
		>
			{isVisCheckBox ? (
				<div className={styles.checkBox_wrapper}>
					<CheckBox onChange={handleCheckBoxChange} />
				</div>
			) : null}
			<p className={styles.name}>{props.name}</p>
			<p className={styles.code}>{props.code}</p>
			<p className={styles.unit_of_measurement}>{props.Store.count}</p>
			<p className={styles.cost_price}>
				{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} {' ₽'}
			</p>
			<p className={styles.sale_price}>
				{props.priceForSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} {' ₽'}
			</p>
		</div>
	)
}

export default Product
