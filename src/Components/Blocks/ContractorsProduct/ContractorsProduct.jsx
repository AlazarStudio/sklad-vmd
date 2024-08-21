import { useNavigate } from 'react-router-dom'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './ContractorsProduct.module.css'

function ContractorsProduct({ operation, ...props }) {
	const navigate = useNavigate()

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

	const goToUpdateContractor = () => {
		navigate(operation, {state:{contractor: props}})
	}


	return (
		<div className={styles.product_wrapper} onClick={goToUpdateContractor}>
			<div className={styles.checkBox_wrapper}>
				<CheckBox />
			</div>
			<p className={styles.name}> {props.name} </p>
			{/* <p className={styles.code}> {props.code} </p> */}
			<p className={styles.created}>{formatDate(props.createdAt)}</p>
			<p className={styles.phone}>{props.number}</p>
			<p className={styles.email}>{props.email}</p>
			<p className={styles.address}>{props.adress}</p>
		</div>
	)
}

export default ContractorsProduct
