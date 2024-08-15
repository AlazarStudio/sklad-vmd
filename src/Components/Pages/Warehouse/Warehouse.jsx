import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { products, types } from '../../../../data'
import RemainsProduct from '../../Blocks/RemainsProduct/RemainsProduct'
import AddButton from '../../UI/AddButton/AddButton'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './Warehouse.module.css'

function Warehouse() {
	const [selectedProducts, setSelectedProducts] = useState([])
	const [selectedType, setSelectedType] = useState('')
	const navigate = useNavigate()

	const transliterate = text => {
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
			.split('')
			.map(char => map[char] || char)
			.join('')
	}

	const handleProductSelect = (product, isChecked) => {
		if (isChecked) {
			setSelectedProducts(prev => [...prev, product])
		} else {
			setSelectedProducts(prev => prev.filter(p => p.code !== product.code))
		}
	}

	// Создаем объект для хранения уникальных продуктов
	const uniqueProducts = {}

	// Проходим по каждому продукту и суммируем их количество, если они имеют одинаковое имя
	products.forEach(product => {
		if (uniqueProducts[product.name]) {
			uniqueProducts[product.name].quantity += +product.quantity
		} else {
			uniqueProducts[product.name] = { ...product }
			uniqueProducts[product.name].quantity = +product.quantity
		}
	})

	// Преобразуем объект обратно в массив для рендеринга
	const productsToDisplay = Object.values(uniqueProducts)

	// Фильтрация продуктов по выбранному типу
	const filteredProducts = selectedType
		? productsToDisplay.filter(
				product => transliterate(product.type).toLowerCase() === selectedType
			)
		: productsToDisplay

	const handleTypeChange = event => {
		setSelectedType(event.target.value)
	}

	const navToShop = e => {
		navigate('/products')
	}

	return (
		<>
			<div className={styles.operations}>
				<p className={styles.operations__title}>Склад</p>
				<div className={styles.operation_buttons__wrapper}>
					{/* <AddButton img='/images/qr-code.png' text='Добавить товар' /> */}
					<Link to='/add-product'>
						<img src='/images/green_add.png' alt='' /> Товар
					</Link>
					<Link to='/add-product-group'>
						<img src='/images/blue_add.png' alt='' />
						Группа
					</Link>
					<select name='group' id='' required onChange={handleTypeChange}>
						<option value='' defaultValue>
							Все товары
						</option>
						{types.map((type, index) => (
							<option key={index} value={transliterate(type).toLowerCase()}>
								{type}
							</option>
						))}
					</select>
				</div>
				<input type='search' placeholder='Поиск...' />
			</div>

			<section className={styles.products_wrapper}>
				<div className={styles.products_wrapper__head}>
					<div className={styles.checkBox_wrapper}>
						<CheckBox />
					</div>
					<p className={styles.name}>Наименование</p>
					<p className={styles.code}>Код</p>
					<p className={styles.remains}>Остаток</p>
					<p className={styles.cost_price}>Себестоимость</p>
					<p className={styles.cost_price_sum}>Сумма себестоимости</p>
					<p className={styles.sale_price}>Цена продажи</p>
					<p className={styles.sale_price_sum}>Сумма продажи</p>
				</div>
				<div>
					{filteredProducts.slice(-5).map((product, index) => (
						<RemainsProduct
							key={index}
							operation={true}
							{...product}
							onSelect={handleProductSelect}
						/>
					))}
				</div>
			</section>

			{/* Блок действий */}
			{selectedProducts.length > 0 && (
				<div className={styles.actions}>
					<div className={styles.actions_width}>
						<p>
							<span style={{ fontWeight: '400' }}>Выбрано товаров:</span>{' '}
							{selectedProducts.length}
						</p>
						<div className={styles.actions_buttons}>
							<button onClick={navToShop}>Переместить в магазин</button>
							{/* <button>Списать</button> */}
							{/* <button>Продать</button> */}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Warehouse
