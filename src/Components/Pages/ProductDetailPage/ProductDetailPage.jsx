import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { Colors, products } from '../../../../data'
import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import ProductCard from '../../Blocks/ProductCard/ProductCard'
import Scale from '../../Blocks/Scale/Scale'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './ProductDetailPage.module.css'

// Для правильного отображения модального окна, необходимо установить appElement
Modal.setAppElement('#root')

const fetchProducts = async () => {
	try {
		const response = await axios.get(`${serverConfig}/items`)
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function ProductDetailPage() {
	const { linkName } = useParams()
	const location = useLocation()
	const { fromWarehouse } = location.state || {}
	// console.log(fromWarehouse)
	const { group } = location.state || {}
	// console.log(group)
	const navigate = useNavigate()
	// console.log(linkName)

	const [filteredProducts, setFilteredProducts] = useState([])
	const [selectedProducts, setSelectedProducts] = useState([])
	// const [speedRange, setSpeedRange] = useState([1, 27])
	const [wheelSizeRange, setWheelSizeRange] = useState([12, 29])
	const [frameSizeRange, setFrameSizeRange] = useState([13, 23])
	const [selectedColor, setSelectedColor] = useState('')
	const [isSellModalOpen, setIsSellModalOpen] = useState(false)
	const [isWriteOffModalOpen, setIsWriteOffModalOpen] = useState(false)
	const [isMoveToShopModalOpen, setIsMoveToShopModalOpen] = useState(false)
	const [modalQuantities, setModalQuantities] = useState({}) // Данные о количестве для модальных окон
	const [writeOffReason, setWriteOffReason] = useState('')

	const [productsDB, setProducts] = useState([])

	useEffect(() => {
		const getProducts = async () => {
			const productsDB = await fetchProducts()
			// console.log(productsDB)
			setProducts(productsDB)
		}
		getProducts()
	}, [])

	const transliterate = text => {
		if (!text || typeof text !== 'string') {
			return ''
		}

		const map = {
			А: 'A',
			Б: 'B',
			В: 'V',
			Г: 'G',
			Д: 'D',
			Е: 'E',
			Ё: 'Yo',
			Ж: 'Zh',
			З: 'Z',
			И: 'I',
			Й: 'J',
			К: 'K',
			Л: 'L',
			М: 'M',
			Н: 'N',
			О: 'O',
			П: 'P',
			Р: 'R',
			С: 'S',
			Т: 'T',
			У: 'U',
			Ф: 'F',
			Х: 'Kh',
			Ц: 'Ts',
			Ч: 'Ch',
			Ш: 'Sh',
			Щ: 'Shch',
			Ъ: '',
			Ы: 'Y',
			Ь: '',
			Э: 'E',
			Ю: 'Yu',
			Я: 'Ya',
			а: 'a',
			б: 'b',
			в: 'v',
			г: 'g',
			д: 'd',
			е: 'e',
			ё: 'yo',
			ж: 'zh',
			з: 'z',
			и: 'i',
			й: 'j',
			к: 'k',
			л: 'l',
			м: 'm',
			н: 'n',
			о: 'o',
			п: 'p',
			р: 'r',
			с: 's',
			т: 't',
			у: 'u',
			ф: 'f',
			х: 'kh',
			ц: 'ts',
			ч: 'ch',
			ш: 'sh',
			щ: 'shch',
			ъ: '',
			ы: 'y',
			ь: '',
			э: 'e',
			ю: 'yu',
			я: 'ya'
		}

		return text
			.toLowerCase()
			.split('')
			.map(char => map[char] || char)
			.join('')
			.replace(/ /g, '_')
	}

	useEffect(() => {
		const initialFilteredProducts = productsDB.filter(
			product => transliterate(product.name) === linkName
		)
		setFilteredProducts(initialFilteredProducts)
	}, [linkName])

	useEffect(() => {
		if (selectedProducts.length > 0) {
			const maxQty = selectedProducts.reduce(
				(max, product) => Math.max(max, product.itemCount),
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

	const totalQuantity = filteredProducts.reduce(
		(sum, product) =>
			fromWarehouse
				? sum + +product.Warehouse.count
				: sum + +product.Store.count,
		0
	)
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
		const newFilteredProducts = productsDB.filter(product => {
			const wheelSize = parseInt(product.wheelSize, 10)
			const frameSize = parseInt(product.frameGrouve, 10)

			return (
				transliterate(product.name) === linkName &&
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
	}, [wheelSizeRange, frameSizeRange, selectedColor, productsDB])

	const resetFilters = () => {
		setWheelSizeRange([12, 29])
		setFrameSizeRange([13, 23])
		setSelectedColor('')
		filterProducts()
	}

	const handleSellButtonClick = () => {
		setIsSellModalOpen(true)
	}

	const handleQuantityChange = (code, value) => {
		setModalQuantities(prev => ({
			...prev,
			[code]: Math.min(
				fromWarehouse
					? filteredProducts.find(p => p.code === code)?.Warehouse.count || 0
					: filteredProducts.find(p => p.code === code)?.Store.count || 0,
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
				fromWarehouse
					? filteredProducts.find(p => p.code === code)?.Warehouse.count || 0
					: filteredProducts.find(p => p.code === code)?.Store.count || 0,
				Math.max(1, Number(value))
			)
		}))
	}

	const handleWriteOffReasonChange = reason => {
		setWriteOffReason(reason)
	}

	const handleWriteOffConfirm = async () => {
		try {
			for (const product of selectedProducts) {
				const response = await axios.post(
					`${serverConfig}/writeoffs`,
					{
						itemId: product.id,
						quantity: modalQuantities[product.code],
						reason: writeOffReason,
						source: fromWarehouse ? 'warehouse' : 'store'
					},
					{
						headers: { Authorization: `Bearer ${getToken}` }
					}
				)

				if (response.status === 200) {
					console.log(
						`Списано: ${modalQuantities[product.code]} шт. ${product.name}`
					)
				} else {
					console.error('Error by write off: ', response.data)
				}
			}
		} catch (error) {
			console.error('Catch error: ', error)
		}

		// console.log(
		// 	`Списано: ${JSON.stringify(modalQuantities)} по причине ${writeOffReason}`
		// )
		setIsWriteOffModalOpen(false)
		navigate('/products/write-offs')
	}

	const transfer = async () => {
		try {
			for (const product of selectedProducts) {
				const response = await axios.post(
					`${serverConfig}/transfer`,
					{
						itemId: product.id,
						quantity: modalQuantities[product.code],
						from: fromWarehouse ? 'warehouse' : 'store',
						to: !fromWarehouse ? 'warehouse' : 'store'
					},
					{
						headers: { Authorization: `Bearer ${getToken}` }
					}
				)

				if (response.status === 200) {
					console.log(
						`Перемещено товаров: ${modalQuantities[product.code]} шт. ${product.name}`
					)
				} else {
					console.log(
						response.status,
						'Ошибка в перемещении товара',
						response.data
					)
				}
			}
		} catch (error) {
			console.error('Catch error: ', error)
		}
		setIsMoveToShopModalOpen(false)
		navigate(fromWarehouse ? '/products' : '/warehouse')
	}

	const WarehouseOrNot = fromWarehouse ? 'warehouse' : 'store'

	const addToCart = async (buyerType, nav) => {
		try {
			for (const product of selectedProducts) {
				const response = await axios.post(
					`${serverConfig}/cart`,
					{
						userId: 1,
						itemId: product.id,
						quantity: modalQuantities[product.code],
						buyertype: buyerType
					},
					{ headers: { Authorization: `Bearer ${getToken}` } }
				)
				if (response.status !== 200) {
					console.error('Error blyat', response.data)
				} else {
					console.log(`Added to cart ${product.name}`)
				}
			}
			navigate(nav, { state: WarehouseOrNot })
		} catch (error) {
			console.log(getToken)
			console.error('Catch error: ', error)
		}
	}

	const handleSellToCounterpart = () => {
		addToCart('contractor', '/add-shipment')
		setIsSellModalOpen(false)
		// console.log(`Продать контрагенту: ${JSON.stringify(modalQuantities)}`)
		// // Преобразование modalQuantities в массив объектов с id и количеством
		// const productsForShipment = selectedProducts.map(product => ({
		// 	id: product.id,
		// 	quantity: modalQuantities[product.code] || 0
		// }))
		// setIsSellModalOpen(false)
		// navigate('/add-shipment', {
		// 	state: { shipmentProducts: productsForShipment }
		// })
	}

	const handleSellToCustomer = () => {
		addToCart('customer', '/add-retails')
		setIsSellModalOpen(false)
		// console.log(`Продать клиенту: ${JSON.stringify(modalQuantities)}`)
		// setIsSellModalOpen(false)
		// navigate('/add-retails')
	}

	const handleMoveToShopButtonClick = () => {
		console.log(`Перемещено в магазин: ${JSON.stringify(modalQuantities)}`)
		setIsMoveToShopModalOpen(false)
		navigate('/products')
	}

	const handleMoveToWarehouseButtonClick = () => {
		console.log(`Перемещено на склад: ${JSON.stringify(modalQuantities)}`)
		setIsMoveToShopModalOpen(false)
		navigate('/warehouse')
	}

	const handleMoveToShopQuantityChange = (code, value) => {
		setModalQuantities(prev => ({
			...prev,
			[code]: Math.min(
				fromWarehouse
					? filteredProducts.find(p => p.code === code)?.Warehouse.count || 0
					: filteredProducts.find(p => p.code === code)?.Store.count || 0,
				Math.max(1, Number(value))
			)
		}))
	}

	const handleMoveToShopConfirm = () => {
		console.log(
			`Перемещено в магазин (склад): ${JSON.stringify(modalQuantities)}`
		)
		setIsMoveToShopModalOpen(false)
	}

	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					<div className={styles.scale_wrapper}>
						{group.toLowerCase() !== 'велосипеды' ? (
							<>
								<div className={styles.filter_item__scale}>
									<div className={styles.custom_color_filter} ref={dropdownRef}>
										<div
											className={styles.color_selected}
											onClick={toggleDropdown}
										>
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
							</>
						) : (
							<>
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
										<div
											className={styles.color_selected}
											onClick={toggleDropdown}
										>
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
							</>
						)}
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
								onClick={() => navigate(fromWarehouse ? '/warehouse' : '/')}
								src='/images/back.png'
								alt='Back'
							/>
							<p>
								Продукты модели {filteredProducts[0]?.name}{' '}
								{!fromWarehouse ? 'в магазине' : 'на складе'}{' '}
							</p>
						</div>
						<p className={styles.quantity_product}>{totalQuantity} шт.</p>
					</div>
					{filteredProducts.length > 0 ? (
						<section className={styles.margin}>
							<div className={styles.products_wrapper__head}>
								<div className={styles.checkBox_wrapper}>
									{/* <CheckBox onChange={() => {}} /> */}
								</div>
								<p className={styles.name}>Наименование</p>
								{/* <p className={styles.code}>Код</p> */}
								<p className={styles.unit_of_measurement}>Количество</p>
								<p className={styles.cost_price}>Себестоимость</p>
								<p className={styles.sale_price}>Цена продажи</p>
								<p className={styles.color}>Цвет</p>
								<p className={styles.frameGrowth}>
									{group.toLowerCase() !== 'велосипеды'
										? 'Высота по седлу'
										: 'Ростовка рамы'}
								</p>
								<p className={styles.wheelsSize}>
									{group.toLowerCase() !== 'велосипеды'
										? 'Максимальная нагрузка'
										: 'Диаметр колеса'}
								</p>
							</div>
							<div>
								{filteredProducts.map(product => (
									<ProductCard
										fromWarehouse={fromWarehouse}
										key={product.id}
										operation={
											fromWarehouse
												? product.group.name.toLowerCase() !== 'велосипеды'
													? `/update-moto/${product.id}`
													: `/update-product/${product.id}`
												: null
										}
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
									<button onClick={() => setIsMoveToShopModalOpen(true)}>
										{!fromWarehouse
											? 'Переместить на склад'
											: 'Переместить в магазин'}
									</button>

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
									{product.name} {product.color} {product.frameGrouve}"{' '}
									{product.wheelSize}
								</p>
								<input
									className={styles.sale_input}
									type='number'
									value={modalQuantities[product.code] || ''}
									onChange={e =>
										handleQuantityChange(product.code, e.target.value)
									}
									max={product.itemCount}
								/>
							</div>
						))}
						<div className={styles.modal_buttons}>
							<button onClick={handleSellToCounterpart}>
								Продать контрагенту
							</button>
							<button onClick={handleSellToCustomer}>Продать клиенту</button>
							<div
								className={styles.close_modal}
								onClick={() => setIsSellModalOpen(false)}
							>
								X
							</div>
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
									{product.name} {product.color} {product.frameGrouve}"{' '}
									{product.wheelSize}
								</p>
								<input
									className={styles.sale_input}
									type='number'
									value={modalQuantities[product.code] || ''}
									onChange={e =>
										handleWriteOffQuantityChange(product.code, e.target.value)
									}
									max={product.itemCount}
								/>
							</div>
						))}
						<p className={styles.reason}>Выберите причину списания:</p>
						<div className={styles.writeOff_reasons}>
							<label>
								<input
									type='radio'
									name='writeOffReason'
									value='Спонсорство'
									checked={writeOffReason === 'Спонсорство'}
									onChange={() => handleWriteOffReasonChange('Спонсорство')}
								/>
								Спонсорство
							</label>
							<label>
								<input
									type='radio'
									name='writeOffReason'
									value='Ремонт'
									checked={writeOffReason === 'Ремонт'}
									onChange={() => handleWriteOffReasonChange('Ремонт')}
								/>
								Ремонт
							</label>
							<label>
								<input
									type='radio'
									name='writeOffReason'
									value='Дефект'
									checked={writeOffReason === 'Дефект'}
									onChange={() => handleWriteOffReasonChange('Дефект')}
								/>
								Дефект
							</label>
						</div>
						<div className={styles.modal_buttons}>
							<button onClick={handleWriteOffConfirm}>
								Подтвердить списание
							</button>
							<div
								className={styles.close_modal}
								onClick={() => setIsWriteOffModalOpen(false)}
							>
								X
							</div>
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
									{product.name} {product.color} {product.frameGrouve}"{' '}
									{product.wheelSize}
								</p>
								<input
									className={styles.sale_input}
									type='number'
									value={modalQuantities[product.code] || ''}
									onChange={e =>
										handleMoveToShopQuantityChange(product.code, e.target.value)
									}
									max={
										fromWarehouse
											? product.Warehouse.count
											: product.Store.count
									}
								/>
							</div>
						))}
						<div className={styles.modal_buttons}>
							{fromWarehouse ? (
								<button onClick={transfer}>Переместить в магазин</button>
							) : (
								<button onClick={transfer}>Переместить на склад</button>
							)}

							<div
								className={styles.close_modal}
								onClick={() => setIsMoveToShopModalOpen(false)}
							>
								X
							</div>
						</div>
					</Modal>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default ProductDetailPage
