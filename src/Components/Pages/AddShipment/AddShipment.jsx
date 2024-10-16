import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { products } from '../../../../data'
import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import ProductCardSale from '../../Blocks/ProductCardSale/ProductCardSale'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './AddShipment.module.css'

const fetchContractors = async () => {
	try {
		const response = await axios.get(`${serverConfig}/contragents`, {
			headers: { Authorization: `Bearer ${getToken}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

const fetchProducts = async () => {
	try {
		const response = await axios.get(`${serverConfig}/items`)
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

const fetchContractorSales = async () => {
	try {
		const response = await axios.get(`${serverConfig}/cart/Contractor`, {
			headers: { Authorization: `Bearer ${getToken}` }
		})
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

	const WarehouseOrNot = location.state || ' '

	console.log('Это выбранные продукты из', WarehouseOrNot)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedProducts, setSelectedProducts] = useState([])
	const [prices, setPrices] = useState({})

	const [productsDB, setProducts] = useState([])
	const [contractors, setContractors] = useState([])
	const [selectedContractorId, setSelectedContractorId] = useState('')

	const [filteredProducts, setFilteredProducts] = useState([])

	useEffect(() => {
		const getProducts = async () => {
			const productsDB = await fetchContractorSales()
			// console.log(productsDB)
			setProducts(productsDB)
		}
		getProducts()
	}, [])

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

	const confirmSale = async price => {
		try {
			await axios.post(
				`${serverConfig}/cart/confirm-sale`,
				{
					buyertype: 'contractor',
					saleFrom: WarehouseOrNot,
					contrAgentId: parseInt(selectedContractorId, 10),
					price: price
				},
				{ headers: { Authorization: `Bearer ${getToken}` } }
			)
			closeModal()
			setPrices({})
			alert('Продажа успешно подтверждена!')
		} catch (error) {
			console.error('Catch error:', error.response?.data || error.message)
			alert(error)
		}
	}

	const handleSubmitPrice = () => {
		productsDB.map(product => {
			confirmSale(
				prices[product.id] ? prices[product.id] : product.Item.priceForSale
			)
		})
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
	// 			{ headers: { Authorization: `Bearer ${getToken}` } }
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

			<p className={styles.products_name}>ТОВАРЫ</p>
			<section className={styles.sale_products}>
				<div className={styles.products_wrapper__head}>
					<p className={styles.name}>Наименование</p>
					<p className={styles.code}>Код</p>
					<p className={styles.unit_of_measurement}>Количество</p>
					<p className={styles.cost_price}>Себестоимость</p>
					<p className={styles.sale_price}>Цена продажи</p>
					<p className={styles.color}>Цвет</p>
					<p className={styles.frameGrowth}>Ростовка рамы</p>
					<p className={styles.wheelsSize}>Диаметр колеса</p>
					<div className={styles.checkBox_wrapper}>{/* <CheckBox /> */}</div>
				</div>
				<div>
					{productsDB.map((product, index) => (
						<ProductCardSale
							key={product.id}
							{...product}
							quantity={product.quantity}
							onSelect={handleProductSelect}
						/>
					))}
				</div>
			</section>

			<div className={styles.sale}>
				<div className={styles.sale_width}>
					<p>
						<span style={{ fontWeight: '400' }}>Сумма:</span>{' '}
						{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
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
						{productsDB.map(product => (
							<div key={product.id} className={styles.productRow}>
								<span>
									{product.Item.name} {product.Item.color}{' '}
									{product.Item.frameGrouve}
									{'" '}
									{product.Item.wheelSize}
								</span>
								<input
									type='number'
									placeholder='Введите цену'
									value={prices[product.id] || ''}
									onChange={e => handlePriceChange(product.id, e.target.value)}
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
