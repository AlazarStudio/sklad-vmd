import { useNavigate } from 'react-router-dom'

import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './ProductQ.module.css'

function ProductQ({ ...props }) {
	const navigate = useNavigate()

	const updateProduct = () => {
		navigate(props.operation, { state: { product: props } })
	}

	return (
		<div
			className={
				props.operation ? styles.name_operation : styles.product_wrapper
			}
			onClick={props.operation ? updateProduct : null}
		>
			<div className={styles.checkBox_wrapper}>
				<CheckBox />
			</div>
			<p
				className={styles.name}
				onClick={props.operation ? updateProduct : null}
			>
				{props.name}
			</p>
			<p className={styles.code}> {props.code} </p>
			<p className={styles.unit_of_measurement}> {props.quantity} </p>
			<p className={styles.cost_price}>
				{props.costPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
			<p className={styles.sale_price}>
				{props.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
			</p>
		</div>
	)
}

export default ProductQ
