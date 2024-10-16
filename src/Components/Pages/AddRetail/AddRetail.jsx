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
			headers: { Authorization: `Bearer ${getToken}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

ReactModal.setAppElement('#root') // Указываем корневой элемент для доступности

function AddRetail({ ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()

	const WarehouseOrNot = location.state || ' '

	const [productsDB, setProducts] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [prices, setPrices] = useState({})

	useEffect(() => {
		const getProducts = async () => {
			const productsDB = await fetchCustomerSales()
			// console.log(productsDB)
			setProducts(productsDB)
		}
		getProducts()
	}, [])

	const confirmSale = async price => {
		try {
			await axios.post(
				`${serverConfig}/cart/confirm-sale`,
				{
					buyertype: 'customer',
					saleFrom: WarehouseOrNot,
					price: price
				},
				{ headers: { Authorization: `Bearer ${getToken}` } }
			)
			closeModal()
			setPrices({})
			navigate(WarehouseOrNot === 'warehouse' ? '/warehouse' : '/')
			// alert('Продажа успешно подтверждена!')
		} catch (error) {
			console.error('Catch error:', error.response?.data || error.message)
			// alert(error)
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
		productsDB.map(product => {
			confirmSale(
				prices[product.id] ? prices[product.id] : product.Item.priceForSale
			)
		})
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
			<p className={styles.products_name}>ТОВАРЫ</p>
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
					<p className={styles.frameGrowth}>Ростовка рамы</p>
					<p className={styles.wheelsSize}>Диаметр колеса</p>
				</div>
				<div>
					{productsDB.map(product => (
						<ProductCardSale
							key={product.id}
							{...product}
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
						{productsDB.map((product, index) => (
							<div key={index} className={styles.productRow}>
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

export default AddRetail
