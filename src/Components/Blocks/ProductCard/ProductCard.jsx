import { useNavigate } from 'react-router-dom'

import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './ProductCard.module.css'

function ProductCard({
	fromWarehouse,
	linkName,
	operation,
	onSelect,
	...props
}) {
	const navigate = useNavigate()

	const goToUpdateProduct = () => {
		navigate(operation, { state: { product: props } })
	}

	const handleCheckBoxChange = event => {
		onSelect(props, event.target.checked)
	}

	const itemCount = fromWarehouse ? props.Warehouse.count : props.Store.count

	return (
		<div
			className={styles.product_wrapper}
			onClick={fromWarehouse ? goToUpdateProduct : null}
		>
			<div className={styles.checkBox_wrapper}>
				{itemCount === 0 ? null : <CheckBox onChange={handleCheckBoxChange} />}
			</div>
			<p className={styles.name}>{props.name}</p>
			{/* <p className={styles.code}>{props.code}</p> */}
			<p className={styles.unit_of_measurement}>{itemCount}</p>
			<p className={styles.cost_price}>
				{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} {' ₽'}
			</p>
			<p className={styles.sale_price}>
				{props.priceForSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
				{' ₽'}
			</p>
			<p className={styles.color}>{props.color}</p>
			<p className={styles.frameGrowth}>
				{props.group.name.toLowerCase() !== 'велосипеды'
					? `${props.saddleHeight} мм`
					: `${props.frameGrouve}"`}
			</p>
			<p className={styles.wheelsSize}>
				{props.group.name.toLowerCase() !== 'велосипеды'
					? `${props.maximumLoad} кг`
					: props.wheelSize}
			</p>
		</div>
	)
}

export default ProductCard
