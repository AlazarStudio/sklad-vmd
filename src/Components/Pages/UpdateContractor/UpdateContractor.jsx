import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import serverConfig from '../../../serverConfig'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import AddButton from '../../UI/AddButton/AddButton'

import styles from './UpdateContractor.module.css'

function UpdateContractor({ ...props }) {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [contractor, setContractor] = useState(location.state?.contractor || {})
	const token = Cookies.get('token')

	useEffect(() => {
		if (!location.state?.contractor) {
			const fetchContractor = async () => {
				try {
					const response = await axios.get(
						`${serverConfig}/contragents/${id}`,
						{
							headers: { Authorization: `Bearer ${token}` }
						}
					)
					setContractor(response.data)
				} catch (error) {
					console.error('Error fetching product:', error)
				}
			}
			fetchContractor()
		}
	}, [id, location.state])

	// console.log(contractor);
	

	const handleChange = e => {
		const { name, value } = e.target
		setContractor({
			...contractor,
			[name]: value
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await axios.put(
				`${serverConfig}/contragents/${id}`,
				{
					...contractor,
					inn: parseFloat(contractor.inn)
				},
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			)
			navigate('/contractors')
		} catch (error) {
			console.error('Error fetching product:', error)
		}
	}

	const navBack = e => {
		e.preventDefault()
		navigate('/contractors')
	}
	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					<form onSubmit={handleSubmit} className={styles.form_product}>
						<div className={styles.products_header__wrapper}>
							<div className={styles.products_buttons}>
								<button>Изменить</button>
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
										value={contractor.name || ''}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
							<div className={styles.form_item}>
								<div className={styles.item}>
									<label htmlFor='inn'>ИНН</label>
									<input
										type='text'
										name='inn'
										value={contractor.inn || ''}
										onChange={handleChange}
										required
									/>
									<label htmlFor='number'>Телефон</label>
									<input
										type='text'
										name='number'
										value={contractor.number || ''}
										onChange={handleChange}
										required
									/>
									<label htmlFor='email'>Email</label>
									<input
										type='text'
										name='email'
										value={contractor.email || ''}
										onChange={handleChange}
										required
									/>
									<label htmlFor='adress'>Адрес</label>
									<input
										type='text'
										name='adress'
										value={contractor.adress || ''}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
						</div>
					</form>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default UpdateContractor
