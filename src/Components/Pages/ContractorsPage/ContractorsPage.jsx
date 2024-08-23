import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { products } from '../../../../data'
import serverConfig from '../../../serverConfig'
import ContractorsProduct from '../../Blocks/ContractorsProduct/ContractorsProduct'
import AddButton from '../../UI/AddButton/AddButton'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './ContractorsPage.module.css'

const fetchContractors = async () => {
	try {
		const response = await axios.get(`${serverConfig}/contragents`)
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

const deleteContractors = async ContractorsId => {
	try {
		await Promise.all(
			ContractorsId.map(id => axios.delete(`${serverConfig}/contragents/${id}`))
		)
		return true
	} catch (error) {
		console.error('Catch error: ', error)
		return false
	}
}

function ContractorsPage({ children, ...props }) {
	const [contractors, setContractors] = useState([])
	const [selectedContractors, setSelectedContractors] = useState([])

	useEffect(() => {
		const getContractors = async () => {
			const contractors = await fetchContractors()
			setContractors(contractors)
		}
		getContractors()
	}, [])

	const handleSelectContractor = id => {
		setSelectedContractors(prevState =>
			prevState.includes(id)
				? prevState.filter(contractorId => contractorId !== id)
				: [...prevState, id]
		)
	}

	const handleDeleteSelected = async () => {
		const isSuccess = await deleteContractors(selectedContractors)
		if (isSuccess) {
			setContractors(prevContractors =>
				prevContractors.filter(
					contractor => !selectedContractors.includes(contractor.id)
				)
			)
			setSelectedContractors([]) // очистить выбранные после удаления
		}
	}

	return (
		<>
			<div className={styles.operations}>
				<p className={styles.operations__title}>Контрагенты</p>
				<div className={styles.operation_buttons__wrapper}>
					<Link to='/add-contractors'>
						<img src='/images/green_add.png' alt='' />
						Контрагент
					</Link>
					<AddButton img='/images/print.png' text='Печать' />
				</div>
				<input type='search' placeholder='Поиск...' />
			</div>
			<section className={styles.products_wrapper}>
				<div className={styles.products_wrapper__head}>
					<div className={styles.checkBox_wrapper}>
						{/* <CheckBox
							onChange={() => {
								if (selectedContractors.length === contractors.length) {
									setSelectedContractors([])
								} else {
									setSelectedContractors(
										contractors.map(contractor => contractor.id)
									)
								}
							}}
						/> */}
					</div>
					<p className={styles.name}>Наименование</p>
					{/* <p className={styles.code}>Код</p> */}
					<p className={styles.created}>Создан</p>
					<p className={styles.phone}>Телефон</p>
					<p className={styles.email}>Email</p>
					<p className={styles.address}>Адрес</p>
				</div>
				<div>
					{contractors.map(contractor => (
						<ContractorsProduct
							key={contractor.id}
							operation={`/update-contractor/${contractor.id}`}
							onSelect={() => handleSelectContractor(contractor.id)}
							{...contractor}
						/>
					))}
				</div>
			</section>
			{selectedContractors.length > 0 && (
				<div className={styles.actions}>
					<div className={styles.actions_width}>
						<p>Выбрано: {selectedContractors.length}</p>
						<button onClick={handleDeleteSelected}>Удалить</button>
					</div>
				</div>
			)}
		</>
	)
}

export default ContractorsPage
