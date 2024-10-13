import { useNavigate } from 'react-router-dom'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './GroupItem.module.css'

function GroupItem({ operation, onSelect, ...props }) {
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
		navigate(operation, {state:{group: props}})
	}


	return (
		<div className={styles.product_wrapper} onClick={goToUpdateContractor}>
			<div className={styles.checkBox_wrapper}>
				<CheckBox onChange={onSelect} />
			</div>
			<p className={styles.name}> {props.name} </p>
			{/* <p className={styles.code}> {props.code} </p> */}
		</div>
	)
}

export default GroupItem
