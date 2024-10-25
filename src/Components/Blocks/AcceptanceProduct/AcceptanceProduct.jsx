import axios from 'axios'
import { useEffect, useState } from 'react'

import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './AcceptanceProduct.module.css'

const fetchContractors = async () => {
	try {
		const response = await axios.get(`${serverConfig}/contragents`, {
			headers: { Authorization: `Bearer ${getToken}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching contractors:', error)
		return []
	}
}

function AcceptanceProduct({ ...props }) {
	const [contractors, setContractors] = useState([])

	useEffect(() => {
		const getContractors = async () => {
			const contractors = await fetchContractors()
			setContractors(contractors)
		}
		getContractors()
	}, [])

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

	const contractor = contractors.find(
		contractor => contractor.id === props.contrAgentId
	)

	const contractorName = contractor ? contractor.name : 'Частное лицо'

	return (
		<div className={styles.product_wrapper}>
			<div className={styles.checkBox_wrapper}>{/* <CheckBox /> */}</div>
			{/* <p className={styles.number}>0001</p> */}
			<p className={styles.time}>{formatDate(props.createdAt)}</p>
			<p className={styles.name}>
				{props.name} {' '} {props.color} {' '}
				 {props.frameGrouve}{'"  '} {props.wheelSize}
			</p>
			<p className={styles.to_warehouse}>
				{props.source === 'warehouse' ? 'Склад' : 'Магазин'}
			</p>
			<p className={styles.contractors}>{contractorName}</p>
			<p className={styles.organization}>{props.quantity}</p>
			<p className={styles.sum}>{props.price}</p>
		</div>
	)
}

export default AcceptanceProduct
