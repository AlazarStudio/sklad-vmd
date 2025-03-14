import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import AddButton from '../../UI/AddButton/AddButton'

import styles from './AddContractors.module.css'

function AddContractors({ ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()
	// console.log(id)

	const [formData, setFormData] = useState({
		name: '',
		number: '',
		email: '',
		adress: ''
	})

	const handleChange = e => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await axios.post(
				`${serverConfig}/contragents`,
				{
					...formData
				},
				{
					headers: { Authorization: `Bearer ${getToken()}` }
				}
			)
			navigate('/contractors')
		} catch (error) {
			console.error('Error creating item:', error)
		}
	}

	const navBack = e => {
		e.preventDefault()
		navigate('/contractors')
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
					<div className={styles.item2}>
						<label htmlFor='name' style={{ fontWeight: '500' }}>
							Наименование контрагента
						</label>
						<input
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className={styles.form_item}>
					<div className={styles.item}>
						<label htmlFor='number'>Телефон</label>
						<input
							type='text'
							name='number'
							value={formData.number}
							onChange={handleChange}
							required
						/>
						<label htmlFor='email'>Email</label>
						<input
							type='text'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<label htmlFor='adress'>Адрес</label>
						<input
							type='text'
							name='adress'
							value={formData.adress}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
			</div>
		</form>
	)
}

export default AddContractors
