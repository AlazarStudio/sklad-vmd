import axios from 'axios'
import { useEffect, useState } from 'react'

import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './ProductCardSale.module.css'

const fetchGroups = async () => {
	try {
		const response = await axios.get(`${serverConfig}/groups`, {
			headers: { Authorization: `Bearer ${getToken()}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching contractors:', error)
		return []
	}
}

function ProductCardSale({
	onRemove,
	fromWarehouse,
	linkName,
	onSelect,
	...props
}) {
	const [groups, setGroups] = useState([])

	useEffect(() => {
		const getGroups = async () => {
			const groups = await fetchGroups()
			setGroups(groups)
		}
		getGroups()
	}, [])

	const handleCheckBoxChange = event => {
		onSelect(props, event.target.checked)
	}

	const handleRemoveClick = event => {
		event.preventDefault()
		onRemove(props.id) // Передаем ID товара для удаления
	}

	const group = groups.find(group => group.id === props.Item.groupId)

	const groupName = group ? group.name : ' '

	return (
		<div className={styles.product_wrapper}>
			<p className={styles.name}>{props.Item.name}</p>
			<p className={styles.code}>{props.Item.code}</p>
			<p className={styles.unit_of_measurement}>{props.quantity}</p>
			<p className={styles.cost_price}>
				{props.Item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
				{' ₽'}
			</p>
			<p className={styles.sale_price}>
				{props.Item.priceForSale
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
				{' ₽'}
			</p>
			<p className={styles.color}>{props.Item.color}</p>
			<p className={styles.frameGrowth}>
				{groupName.toLowerCase() !== 'велосипеды'
					? `${props.Item.saddleHeight} мм`
					: `${props.Item.frameGrouve}"`}
			</p>
			<p className={styles.wheelsSize}>
				{groupName.toLowerCase() !== 'велосипеды'
					? `${props.Item.maximumLoad} кг`
					: props.Item.wheelSize}
			</p>
			<div className={styles.checkBox_wrapper}>
				<img src='/images/delete.png' alt='' onClick={handleRemoveClick} />
				{/* <CheckBox onChange={handleCheckBoxChange} /> */}
			</div>
		</div>
	)
}

export default ProductCardSale
