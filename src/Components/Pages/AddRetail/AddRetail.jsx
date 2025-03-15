import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import ProductCardSale from '../../Blocks/ProductCardSale/ProductCardSale'

import styles from './AddRetail.module.css'

const fetchCustomerSales = async () => {
	try {
		const response = await axios.get(`${serverConfig}/cart/Customer`, {
			headers: { Authorization: `Bearer ${getToken()}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

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

ReactModal.setAppElement('#root') // Указываем корневой элемент для доступности

function AddRetail({ ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()

	const WarehouseOrNot = location.state || ' '
	const existingValue = localStorage.getItem('RWarehouseOrNot')

	// Проверяем, что `location.state` не пустое и отличается от текущего значения в `localStorage`
	if (WarehouseOrNot !== ' ' && WarehouseOrNot !== existingValue) {
		localStorage.setItem('RWarehouseOrNot', WarehouseOrNot)
	}

	const fromWhere = localStorage.getItem('RWarehouseOrNot') || ''
	// console.log(fromWhere)

	const [productsDB, setProducts] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [prices, setPrices] = useState({})
	const [groups, setGroups] = useState([])

	useEffect(() => {
		const getGroups = async () => {
			const groups = await fetchGroups()
			setGroups(groups)
		}
		getGroups()
	}, [])

	useEffect(() => {
		const getProducts = async () => {
			const productsDB = await fetchCustomerSales()
			// console.log(productsDB)
			setProducts(productsDB)
		}
		getProducts()
	}, [])

	// console.log(productsDB)

	const removeItemFromCart = async itemId => {
		try {
			await axios.delete(`${serverConfig}/cart/${itemId}`, {
				headers: { Authorization: `Bearer ${getToken()}` }
			})
			// После успешного удаления обновляем список товаров
			setProducts(prevProducts =>
				prevProducts.filter(product => product.id !== itemId)
			)
		} catch (error) {
			console.error('Error removing item:', error)
		}
	}

	const confirmSale = async customPrices => {
		try {
			await axios.post(
				`${serverConfig}/cart/confirm-sale`,
				{
					buyertype: 'customer',
					saleFrom: fromWhere,
					customPrices // Передаем объект customPrices напрямую
				},
				{ headers: { Authorization: `Bearer ${getToken()}` } }
			)
			closeModal()
			setPrices({})
			// navigate(fromWhere === 'warehouse' ? '/warehouse' : '/')
			navigate('/sales/retails')
			localStorage.removeItem('RWarehouseOrNot')
		} catch (error) {
			console.error('Catch error:', error)
		}
	}

	const navBack = e => {
		e.preventDefault()
		navigate('/sales/retails')
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
			setSelectedProducts(prev => prev.filter(p => p.code !== product.id))
		}
	}

	const handleSubmitPrice = () => {
		const customPrices = productsDB.reduce((acc, product) => {
			acc[product.Item.id] = prices[product.id]
				? prices[product.id]
				: product.Item.priceForSale
			return acc
		}, {})

		confirmSale(customPrices)
		// console.log('Received customPrices:', customPrices)
	}

	const handlePriceChange = (productCode, newPrice) => {
		setPrices(prevPrices => ({
			...prevPrices,
			[productCode]: parseFloat(newPrice) || 0 // Преобразуем цену в число
		}))
	}

	const totalEnteredPrice = Object.values(prices).reduce(
		(sum, price) => sum + parseFloat(price || 0),
		0
	)

	const totalPrice = productsDB.reduce((sum, product) => {
		return sum + product.quantity * +product.Item.priceForSale
	}, 0)

	return (
		<>
			<p className={styles.products_name}>
				ТОВАРЫ{' '}
				{fromWhere ? (
					<span
						className={styles.products_name}
						style={{ color: '#f77532', border: 'none' }}
					>
						{fromWhere === 'warehouse' ? 'со склада' : 'с магазина'}
					</span>
				) : null}
			</p>
			<section className={styles.sale_products}>
				<div className={styles.products_wrapper__head}>
					{/* <div className={styles.checkBox_wrapper}>
						<CheckBox />
					</div> */}
					<p className={styles.name}>Наименование</p>
					<p className={styles.code}>Код</p>
					<p className={styles.unit_of_measurement}>Количество</p>
					<p className={styles.cost_price}>Себестоимость</p>
					<p className={styles.sale_price}>Цена продажи</p>
					<p className={styles.color}>Цвет</p>
					<p className={styles.frameGrowth}>
						Ростовка рамы {'\n'} / Высота по седлу{' '}
					</p>
					<p className={styles.wheelsSize}>
						Диаметр колеса {'\n'} / Максимальная нагрузка{' '}
					</p>
				</div>
				<div>
					{productsDB.map(product => (
						<ProductCardSale
							key={product.id}
							{...product}
							onSelect={handleProductSelect}
							onRemove={removeItemFromCart}
						/>
					))}
				</div>
			</section>

			<div className={styles.sale}>
				<div className={styles.sale_width}>
					<p>
						<span style={{ fontWeight: '400' }}>Сумма:</span>{' '}
						{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
						{' ₽'}
					</p>
					<button onClick={openModal}>Оформить продажу</button>
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
						{productsDB.map(product => {
							const group = groups.find(
								group => group.id === product.Item.groupId
							)

							const groupName = group ? group.name : ' '
							return (
								<div key={product.id} className={styles.productRow}>
									<span>
										{product.Item.name} {product.Item.color}{' '}
										{groupName.toLowerCase() !== 'велосипеды'
											? `${product.Item.saddleHeight} мм`
											: `${product.Item.frameGrouve}"`}{' '}
										{groupName.toLowerCase() !== 'велосипеды'
											? `${product.Item.maximumLoad} кг`
											: product.Item.wheelSize}
									</span>
									<input
										type='number'
										placeholder='Введите цену'
										value={prices[product.id] || ''}
										onChange={e =>
											handlePriceChange(product.id, e.target.value)
										}
									/>
								</div>
							)
						})}
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
						<button onClick={handleSubmitPrice}>Подтвердить</button>
						<div className={styles.close} onClick={closeModal}>
							X
						</div>
					</div>
				</div>
			</ReactModal>
		</>
	)
}

export default AddRetail
