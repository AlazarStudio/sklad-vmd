import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import ProductCardSale from '../../Blocks/ProductCardSale/ProductCardSale'

import styles from './AddShipment.module.css'

const fetchContractors = async () => {
	try {
		const response = await axios.get(`${serverConfig}/contragents`, {
			headers: { Authorization: `Bearer ${getToken()}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

const fetchContractorSales = async () => {
	try {
		const response = await axios.get(`${serverConfig}/cart/Contractor`, {
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

function AddShipment({ ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()

	const WarehouseOrNot = location.state || ' '
	const existingValue = localStorage.getItem('WarehouseOrNot')

	// Проверяем, что `location.state` не пустое и отличается от текущего значения в `localStorage`
	if (WarehouseOrNot !== ' ' && WarehouseOrNot !== existingValue) {
		localStorage.setItem('WarehouseOrNot', WarehouseOrNot)
	}

	const fromWhere = localStorage.getItem('WarehouseOrNot') || ''
	// console.log(fromWhere)

	// console.log('Это выбранные продукты из', WarehouseOrNot)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedProducts, setSelectedProducts] = useState([])
	const [prices, setPrices] = useState({})

	const [productsDB, setProducts] = useState([])
	const [contractors, setContractors] = useState([])
	const [selectedContractorId, setSelectedContractorId] = useState('')

	const [filteredProducts, setFilteredProducts] = useState([])

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
			const productsDB = await fetchContractorSales()
			// console.log(productsDB)
			setProducts(productsDB)
		}
		getProducts()
	}, [])

	// console.log(productsDB)

	useEffect(() => {
		const getContractors = async () => {
			const contractors = await fetchContractors()
			setContractors(contractors)
		}
		getContractors()
	}, [])

	// useEffect(() => {
	// 	if (productsDB.length > 0 && shipmentProducts.length > 0) {
	// 		const productIds = shipmentProducts.map(sp => sp.id)
	// 		const matchedProducts = productsDB.filter(p => productIds.includes(p.id))

	// 		// Create a map for product quantities
	// 		const productQuantities = shipmentProducts.reduce((acc, sp) => {
	// 			acc[sp.id] = sp.quantity
	// 			return acc
	// 		}, {})

	// 		// Add quantity to matched products
	// 		const updatedProducts = matchedProducts.map(product => ({
	// 			...product,
	// 			quantity: productQuantities[product.id] || 0
	// 		}))

	// 		setFilteredProducts(updatedProducts)
	// 	}
	// }, [productsDB, shipmentProducts])

	const handleSubmit = e => {
		e.preventDefault()
		// Логика обработки отправки формы
		openModal()
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
			setSelectedProducts(prev => prev.filter(p => p.code !== product.id))
		}
	}

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
		console.log('Selected Contractor ID:', selectedContractorId)
		try {
			await axios.post(
				`${serverConfig}/cart/confirm-sale`,
				{
					buyertype: 'contractor',
					saleFrom: fromWhere,
					contrAgentId: parseInt(selectedContractorId, 10),
					customPrices
				},
				{ headers: { Authorization: `Bearer ${getToken()}` } }
			)
			closeModal()
			setPrices({})
			// navigate(fromWhere === 'warehouse' ? '/warehouse' : '/')
			navigate('/sales/shipments')
			localStorage.removeItem('WarehouseOrNot')
			// alert('Продажа успешно подтверждена!')
		} catch (error) {
			console.error('Catch error:', error.response?.data || error.message)
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
		console.log('Received customPrices:', customPrices)
	}

	// const confirmSale = async () => {
	// 	try {
	// 		await axios.post(
	// 			`${serverConfig}/cart/confirm-sale`,
	// 			{
	// 				buyertype: 'contractor',
	// 				saleFrom: WarehouseOrNot,
	// 				products: productsDB.map(product => ({
	// 					itemId: product.itemId,
	// 					quantity: product.quantity,
	// 					price: parseFloat(prices[product.code]) || product.Item.priceForSale
	// 				}))
	// 			},
	// 			{ headers: { Authorization: `Bearer ${getToken()}` } }
	// 		)
	// 		closeModal()
	// 		setPrices({})
	// 		alert('Продажа успешно подтверждена!')
	// 	} catch (error) {
	// 		console.error('Catch error:', error.response?.data || error.message)
	// 		alert(error)
	// 	}
	// }

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
			<form onSubmit={handleSubmit} className={styles.form_product}>
				<div className={styles.form_inputs}>
					<div className={styles.form_item}>
						<div className={styles.item}>
							<label htmlFor=''>Контрагент</label>
							<select
								name='group'
								id=''
								required
								value={selectedContractorId}
								onChange={e => setSelectedContractorId(e.target.value)}
							>
								<option value='' defaultValue>
									Выберите контрагента
								</option>
								{contractors.map(contractor => (
									<option key={contractor.id} value={contractor.id}>
										{contractor.name}
									</option>
								))}
							</select>

							<label htmlFor=''>Организация</label>
							<input type='text' value={'Вело Мото & Drive'} required />
						</div>
					</div>
				</div>
			</form>

			<p className={styles.products_name}>
				ТОВАРЫ{' '}
				{fromWhere ? (
					<span className={styles.products_name} style={{ color: '#f77532' }}>
						{fromWhere === 'warehouse' ? 'со склада' : 'с магазина'}
					</span>
				) : null}
			</p>
			<section className={styles.sale_products}>
				<div className={styles.products_wrapper__head}>
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
					<div className={styles.checkBox_wrapper}>{/* <CheckBox /> */}</div>
				</div>
				<div>
					{productsDB.map(product => (
						<ProductCardSale
							key={product.id}
							{...product}
							quantity={product.quantity}
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
					<button onClick={handleSubmit} disabled={!selectedContractorId}>
						{!selectedContractorId
							? 'Выберите контрагента'
							: 'Оформить продажу'}
					</button>
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
							{'₽'}
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

export default AddShipment
