import { useNavigate } from 'react-router-dom'

import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './RemainsProduct.module.css'

function RemainsProduct({
	isVisCheckBox,
	onSelect,
	operation,
	linkName,
	...props
}) {
	const navigate = useNavigate()

	const goToProductDetail = () => {
		navigate(`/product/${linkName}`, {
			state: { fromWarehouse: true }
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
			<p className={styles.remains}>{props.itemCount}</p>
			<p className={styles.cost_price}>
				{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
			<p className={styles.cost_price_sum}>
				{(parseInt(props.price) * parseInt(props.itemCount))
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
			<p className={styles.sale_price}>
				{props.priceForSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
			<p className={styles.sale_price_sum}>
				{(parseInt(props.priceForSale) * parseInt(props.itemCount))
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
		</div>
	)
}

export default RemainsProduct
