import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { products } from '../../../../data'
import serverConfig from '../../../serverConfig'
import ProductCard from '../../Blocks/ProductCard/ProductCard'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './AddShipment.module.css'

const fetchContractors = async () => {
	try {
		const response = await axios.get(`${serverConfig}/contragents`)
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

ReactModal.setAppElement('#root') // Указываем корневой элемент для доступности

function AddShipment({ ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedProducts, setSelectedProducts] = useState([])
	const [prices, setPrices] = useState({})

	const [contractors, setContractors] = useState([])

	useEffect(() => {
		const getContractors = async () => {
			const contractors = await fetchContractors()
			setContractors(contractors)
		}
		getContractors()
	}, [])

	const handleSubmit = e => {
		e.preventDefault()
		// Логика обработки отправки формы
		closeModal()
	}

	const navBack = e => {
		e.preventDefault()
		navigate('/sales')
	}

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const handleProductSelect = (product, isChecked) => {
		if (isChecked) {
			setSelectedProducts(prev => [...prev, product])
		} else {
			setSelectedProducts(prev => prev.filter(p => p.code !== product.code))
		}
	}

	const handleRemoveSelected = () => {
		setSelectedProducts([])
	}

	const handlePriceChange = (productCode, newPrice) => {
		setPrices(prevPrices => ({
			...prevPrices,
			[productCode]: newPrice
		}))
	}

	const totalEnteredPrice = Object.values(prices).reduce(
		(sum, price) => sum + parseFloat(price || 0),
		0
	)

	const totalPrice = products
		.slice(0, 3)
		.reduce((sum, product) => sum + +product.originalPrice, 0)

	return (
		<>
			<form onSubmit={handleSubmit} className={styles.form_product}>
				<div className={styles.form_inputs}>
					<div className={styles.form_item}>
						<div className={styles.item}>
							<label htmlFor=''>Контрагент</label>
							<select name='group' id='' required>
								<option value='' defaultValue>
									Выберите контрагента
								</option>
								{contractors.map(contractor => (
									<option value={contractor.id}>{contractor.name}</option>
								))}
								{/* <option value=''>Контрагент2</option>
								<option value=''>Контрагент3</option>
								<option value=''>Контрагент4</option>
								<option value=''>Контрагент5</option>
								<option value=''>Контрагент6</option> */}
							</select>
							<label htmlFor=''>Организация</label>
							<input type='text' value={'Вело Мото & Drive'} required />
						</div>
					</div>
				</div>
			</form>

			<p className={styles.products_name}>ТОВАРЫ</p>
			<section className={styles.sale_products}>
				<div className={styles.products_wrapper__head}>
					<div className={styles.checkBox_wrapper}>
						<CheckBox />
					</div>
					<p className={styles.name}>Наименование</p>
					<p className={styles.code}>Код</p>
					<p className={styles.unit_of_measurement}>Количество</p>
					<p className={styles.cost_price}>Себестоимость</p>
					<p className={styles.sale_price}>Цена продажи</p>
					<p className={styles.color}>Цвет</p>
					<p className={styles.frameGrowth}>Ростовка рамы</p>
					<p className={styles.wheelsSize}>Диаметр колеса</p>
				</div>
				<div>
					{products.slice(0, 3).map((product, index) => (
						<ProductCard
							key={index}
							{...product}
							onSelect={handleProductSelect}
						/>
					))}
				</div>
			</section>

			<div className={styles.sale}>
				<div className={styles.sale_width}>
					{selectedProducts.length > 0 ? (
						<>
							<p>
								<span style={{ fontWeight: '400' }}>Выбрано товаров:</span>{' '}
								{selectedProducts.length}
							</p>
							<button onClick={handleRemoveSelected}>Удалить</button>
						</>
					) : (
						<>
							<p>
								<span style={{ fontWeight: '400' }}>Сумма:</span>{' '}
								{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
							</p>
							<button onClick={openModal}>Оформить продажу</button>
						</>
					)}
				</div>
			</div>

			<ReactModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				className={styles.modal}
				overlayClassName={styles.overlay}
			>
				<div className={styles.modalContent}>
					<p className={styles.title_sale}>Оформление продажи</p>
					<div className={styles.productRow__wrapper}>
						{products.slice(0, 3).map((product, index) => (
							<div key={index} className={styles.productRow}>
								<span>{product.name}</span>
								<input
									type='number'
									placeholder='Введите цену'
									value={prices[product.code] || ''}
									onChange={e =>
										handlePriceChange(product.code, e.target.value)
									}
								/>
							</div>
						))}
					</div>
					<div className={styles.totalPrice}>
						<p>
							Сумма:{' '}
							{totalEnteredPrice
								.toFixed(2)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
						</p>
					</div>
					<div className={styles.modalButtons}>
						<button onClick={handleSubmit}>Подтвердить</button>
						<div className={styles.close} onClick={closeModal}>
							X
						</div>
					</div>
				</div>
			</ReactModal>
		</>
	)
}

export default AddShipment
