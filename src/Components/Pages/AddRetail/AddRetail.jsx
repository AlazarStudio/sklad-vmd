import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { products } from '../../../../data'
import ProductCard from '../../Blocks/ProductCard/ProductCard'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './AddRetail.module.css'

ReactModal.setAppElement('#root') // Указываем корневой элемент для доступности

function AddRetail({ ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedProducts, setSelectedProducts] = useState([])
	const [prices, setPrices] = useState({})

	const handleSubmit = e => {
		e.preventDefault()
		// Логика обработки отправки формы
		closeModal()
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
		.slice(0, 1)
		.reduce((sum, product) => sum + +product.originalPrice, 0)

	return (
		<>
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
					{products.slice(0, 1).map((product, index) => (
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
						{products.slice(0, 1).map((product, index) => (
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
						<p>Сумма: {totalEnteredPrice.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</p>
					</div>
					<div className={styles.modalButtons}>
						<button onClick={handleSubmit}>Подтвердить</button>
						<div className={styles.close} onClick={closeModal}>X</div>
					</div>
				</div>
			</ReactModal>
		</>
	)
}

export default AddRetail
