import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import serverConfig from '../../../serverConfig'

import styles from './AddGroup.module.css'

function AddGroup({ children, ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()
	// console.log(id)

	const [groupName, setGroupName] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await axios.post(`${serverConfig}/groups`, {
				name: groupName
			})
			navigate('/warehouse') // Перенаправление после успешного создания группы
		} catch (error) {
			console.error('Error creating group:', error)
		}
	}
	const navBack = e => {
		e.preventDefault()
		navigate('/warehouse')
	}
	return (
		<form onSubmit={handleSubmit} className={styles.form_product}>
			<div className={styles.products_header__wrapper}>
				<div className={styles.products_buttons}>
					<button>Сохранить</button>
					<button type='button' onClick={navBack}>
						Закрыть
					</button>
				</div>
			</div>
			<div className={styles.form_inputs}>
				<div className={styles.form_item}>
					<div className={styles.item}>
						<label htmlFor=''>Наименование группы</label>
						<input
							type='text'
							id='groupName'
							name='groupName'
							value={groupName}
							onChange={e => setGroupName(e.target.value)}
							required
						/>
					</div>
				</div>
			</div>
		</form>
	)
}

export default AddGroup
