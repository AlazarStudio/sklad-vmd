import { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { Colors, products } from '../../../../data'
import ProductCard from '../../Blocks/ProductCard/ProductCard'
import Scale from '../../Blocks/Scale/Scale'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './ProductDetailPage.module.css'

// Для правильного отображения модального окна, необходимо установить appElement
Modal.setAppElement('#root')

function ProductDetailPage() {
	const { linkName } = useParams()
	const location = useLocation()
	const { fromWarehouse } = location.state || {}
	const navigate = useNavigate()

	const [filteredProducts, setFilteredProducts] = useState([])
	const [selectedProducts, setSelectedProducts] = useState([])
	const [speedRange, setSpeedRange] = useState([1, 27])
	const [wheelSizeRange, setWheelSizeRange] = useState([12, 29])
	const [frameSizeRange, setFrameSizeRange] = useState([13, 23])
	const [selectedColor, setSelectedColor] = useState('')
	const [isSellModalOpen, setIsSellModalOpen] = useState(false)
	const [isWriteOffModalOpen, setIsWriteOffModalOpen] = useState(false)
	const [isMoveToShopModalOpen, setIsMoveToShopModalOpen] = useState(false)
	const [modalQuantities, setModalQuantities] = useState({}) // Данные о количестве для модальных окон
	const [writeOffReason, setWriteOffReason] = useState('')

	const totalQuantity = filteredProducts.reduce(
		(sum, product) => sum + +product.quantity,
		0
	)

	useEffect(() => {
		const initialFilteredProducts = products.filter(
			product => product.linkName === linkName
		)
		setFilteredProducts(initialFilteredProducts)
	}, [linkName])

	useEffect(() => {
		if (selectedProducts.length > 0) {
			const maxQty = selectedProducts.reduce(
				(max, product) => Math.max(max, product.quantity),
				0
			)
			// Удалено: setMaxQuantity(maxQty)
		}
	}, [selectedProducts])

	const handleProductSelect = (product, isChecked) => {
		if (isChecked) {
			setSelectedProducts(prev => [...prev, product])
			setModalQuantities(prev => ({ ...prev, [product.code]: 1 }))
		} else {
			setSelectedProducts(prev => prev.filter(p => p.code !== product.code))
			setModalQuantities(prev => {
				const { [product.code]: _, ...rest } = prev
				return rest
			})
		}
	}

	const handleWheelSizeChange = newRange => setWheelSizeRange(newRange)
	const handleFrameSizeChange = newRange => setFrameSizeRange(newRange)

	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef(null)

	const handleColorClick = color => {
		setSelectedColor(color)
		setIsDropdownOpen(false)
	}

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	useEffect(() => {
		if (!selectedColor) {
			setIsDropdownOpen(false)
		}
	}, [selectedColor])

	const handleClickOutside = event => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsDropdownOpen(false)
		}
	}

	useEffect(() => {
		if (isDropdownOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isDropdownOpen])

	const filterProducts = () => {
		const newFilteredProducts = products.filter(product => {
			const speed = parseInt(product.speed, 10)
			const wheelSize = parseInt(product.wheelsSize, 10)
			const frameSize = parseInt(product.frameGrowth, 10)

			return (
				product.linkName === linkName &&
				speed >= speedRange[0] &&
				speed <= speedRange[1] &&
				wheelSize >= wheelSizeRange[0] &&
				wheelSize <= wheelSizeRange[1] &&
				frameSize >= frameSizeRange[0] &&
				frameSize <= frameSizeRange[1] &&
				(selectedColor === '' ||
					product.color.toLowerCase() === selectedColor.toLowerCase())
			)
		})
		setFilteredProducts(newFilteredProducts)
	}

	useEffect(() => {
		filterProducts()
	}, [speedRange, wheelSizeRange, frameSizeRange, selectedColor])

	const resetFilters = () => {
		setSpeedRange([1, 27])
		setWheelSizeRange([12, 29])
		setFrameSizeRange([13, 23])
		setSelectedColor('')
	}

	const handleSellButtonClick = () => {
		setIsSellModalOpen(true)
	}

	const handleSellToCounterpart = () => {
		console.log(`Продать контрагенту: ${JSON.stringify(modalQuantities)}`)
		setIsSellModalOpen(false)
		navigate('/add-shipment')
	}

	const handleSellToCustomer = () => {
		console.log(`Продать клиенту: ${JSON.stringify(modalQuantities)}`)
		setIsSellModalOpen(false)
		navigate('/add-retails')
	}

	const handleQuantityChange = (code, value) => {
		setModalQuantities(prev => ({
			...prev,
			[code]: Math.min(
				filteredProducts.find(p => p.code === code)?.quantity || 0,
				Math.max(1, Number(value))
			)
		}))
	}
	const handleWriteOffButtonClick = () => {
		setIsWriteOffModalOpen(true)
	}

	const handleWriteOffQuantityChange = (code, value) => {
		setModalQuantities(prev => ({
			...prev,
			[code]: Math.min(
				filteredProducts.find(p => p.code === code)?.quantity || 0,
				Math.max(1, Number(value))
			)
		}))
	}

	const handleWriteOffReasonChange = reason => {
		setWriteOffReason(reason)
	}

	const handleWriteOffConfirm = () => {
		console.log(
			`Списано: ${JSON.stringify(modalQuantities)} по причине ${writeOffReason}`
		)
		setIsWriteOffModalOpen(false)
		navigate('/products/write-offs')
	}

	const handleMoveToShopButtonClick = () => {
		setIsMoveToShopModalOpen(true)
	}

	const handleMoveToWarehouseButtonClick = () => {
		setIsMoveToShopModalOpen(true)
	}

	const handleMoveToShopQuantityChange = (code, value) => {
		setModalQuantities(prev => ({
			...prev,
			[code]: Math.min(
				filteredProducts.find(p => p.code === code)?.quantity || 0,
				Math.max(1, Number(value))
			)
		}))
	}

	const handleMoveToShopConfirm = () => {
		console.log(`Перемещено в магазин: ${JSON.stringify(modalQuantities)}`)
		setIsMoveToShopModalOpen(false)
	}

	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					<div className={styles.scale_wrapper}>
						<div className={styles.filter_item__scale}>
							<Scale
								value={wheelSizeRange}
								onChange={handleWheelSizeChange}
								min={12}
								max={29}
								title={'Диаметр колеса'}
							/>
						</div>
						<div className={styles.filter_item__scale}>
							<Scale
								value={frameSizeRange}
								onChange={handleFrameSizeChange}
								min={13}
								max={23}
								title={'Ростовка рамы'}
							/>
						</div>
						<div className={styles.filter_item__scale}>
							<div className={styles.custom_color_filter} ref={dropdownRef}>
								<div className={styles.color_selected} onClick={toggleDropdown}>
									{selectedColor ? (
										<div
											className={styles.color_preview}
											style={{ backgroundColor: Colors[selectedColor] }}
										></div>
									) : (
										<p className={styles.custom_color_title}>Цвет</p>
									)}
								</div>
								{isDropdownOpen && (
									<div className={styles.color_wrapper}>
										{Object.keys(Colors).map(color => (
											<div
												key={color}
												className={styles.color_item}
												style={{ backgroundColor: Colors[color] }}
												onClick={() => handleColorClick(color)}
											></div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>

					<div className={styles.reset_wrapper}>
						<button className={styles.reset_button} onClick={resetFilters}>
							Сбросить фильтры
						</button>
					</div>
					<div className={styles.detail_header}>
						<div className={styles.detail_name}>
							<img
								style={{ cursor: 'pointer' }}
								onClick={() => navigate(-1)}
								src='/images/back.png'
								alt='Back'
							/>
							<p>Продукты модели {filteredProducts[0]?.name}</p>
						</div>
						<p className={styles.quantity_product}>{totalQuantity} шт.</p>
					</div>
					{filteredProducts.length > 0 ? (
						<section className={styles.margin}>
							<div className={styles.products_wrapper__head}>
								<div className={styles.checkBox_wrapper}>
									<CheckBox onChange={() => {}} />
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
								{filteredProducts.map((product, index) => (
									<ProductCard
										key={index}
										operation={'/update-product'}
										{...product}
										onSelect={handleProductSelect}
									/>
								))}
							</div>
						</section>
					) : (
						<p className={styles.no_results}>
							Нет товаров, соответствующих выбранным фильтрам.
						</p>
					)}

					{selectedProducts.length > 0 && (
						<div className={styles.actions}>
							<div className={styles.actions_width}>
								<p>
									<span style={{ fontWeight: '400' }}>Выбрано товаров:</span>{' '}
									{selectedProducts.length}
								</p>
								<div className={styles.actions_buttons}>
									{!fromWarehouse ? (
										<button onClick={handleMoveToWarehouseButtonClick}>
											Переместить на склад
										</button>
									) : (
										<button onClick={handleMoveToShopButtonClick}>
											Переместить в магазин
										</button>
									)}

									<button onClick={handleWriteOffButtonClick}>Списать</button>
									<button onClick={handleSellButtonClick}>Продать</button>
								</div>
							</div>
						</div>
					)}

					<Modal
						isOpen={isSellModalOpen}
						onRequestClose={() => setIsSellModalOpen(false)}
						className={styles.modal}
						overlayClassName={styles.modal_overlay}
					>
						<p className={styles.title}>Продажа товаров</p>
						{selectedProducts.map(product => (
							<div key={product.code} className={styles.modal_item}>
								<p>
									{product.name} {product.color} {product.frameGrowth}"{' '}
									{product.wheelsSize}
								</p>
								<input
									className={styles.sale_input}
									type='number'
									value={modalQuantities[product.code] || ''}
									onChange={e =>
										handleQuantityChange(product.code, e.target.value)
									}
									max={product.quantity}
								/>
							</div>
						))}
						<div className={styles.modal_buttons}>
							<button onClick={handleSellToCounterpart}>
								Продать контрагенту
							</button>
							<button onClick={handleSellToCustomer}>Продать клиенту</button>
							<button onClick={() => setIsSellModalOpen(false)}>Отмена</button>
						</div>
					</Modal>

					<Modal
						isOpen={isWriteOffModalOpen}
						onRequestClose={() => setIsWriteOffModalOpen(false)}
						className={styles.modal}
						overlayClassName={styles.modal_overlay}
					>
						<p className={styles.title}>Списание товаров</p>
						{selectedProducts.map(product => (
							<div key={product.code} className={styles.modal_item}>
								<p>
									{product.name} {product.color} {product.frameGrowth}"{' '}
									{product.wheelsSize}
								</p>
								<input
									className={styles.sale_input}
									type='number'
									value={modalQuantities[product.code] || ''}
									onChange={e =>
										handleWriteOffQuantityChange(product.code, e.target.value)
									}
									max={product.quantity}
								/>
							</div>
						))}
						<p className={styles.reason}>Выберите причину списания:</p>
						<div className={styles.writeOff_reasons}>
							<label>
								<input
									type='radio'
									name='writeOffReason'
									value='Списано по причине спонсорства'
									checked={writeOffReason === 'Списано по причине спонсорства'}
									onChange={() =>
										handleWriteOffReasonChange('Списано по причине спонсорства')
									}
								/>
								Спонсорство
							</label>
							<label>
								<input
									type='radio'
									name='writeOffReason'
									value='Списано по причине ремонта'
									checked={writeOffReason === 'Списано по причине ремонта'}
									onChange={() =>
										handleWriteOffReasonChange('Списано по причине ремонта')
									}
								/>
								Ремонт
							</label>
							<label>
								<input
									type='radio'
									name='writeOffReason'
									value='Списано по причине дефекта'
									checked={writeOffReason === 'Списано по причине дефекта'}
									onChange={() =>
										handleWriteOffReasonChange('Списано по причине дефекта')
									}
								/>
								Дефект
							</label>
						</div>
						<div className={styles.modal_buttons}>
							<button onClick={handleWriteOffConfirm}>
								Подтвердить списание
							</button>
							<button onClick={() => setIsWriteOffModalOpen(false)}>
								Отмена
							</button>
						</div>
					</Modal>

					<Modal
						isOpen={isMoveToShopModalOpen}
						onRequestClose={() => setIsMoveToShopModalOpen(false)}
						className={styles.modal}
						overlayClassName={styles.modal_overlay}
					>
						<p className={styles.title}>Перемещение товаров</p>
						{selectedProducts.map(product => (
							<div key={product.code} className={styles.modal_item}>
								<p>
									{product.name} {product.color} {product.frameGrowth}"{' '}
									{product.wheelsSize}
								</p>
								<input
									className={styles.sale_input}
									type='number'
									value={modalQuantities[product.code] || ''}
									onChange={e =>
										handleMoveToShopQuantityChange(product.code, e.target.value)
									}
									max={product.quantity}
								/>
							</div>
						))}
						<div className={styles.modal_buttons}>
							<button onClick={handleMoveToShopConfirm}>
								Переместить в магазин
							</button>
							<button onClick={() => setIsMoveToShopModalOpen(false)}>
								Отмена
							</button>
						</div>
					</Modal>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default ProductDetailPage
