import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { products } from '../../../../data'
import ProductCard from '../../Blocks/ProductCard/ProductCard'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './AddRetail.module.css'

function AddRetail({ ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()

	const [selectedProducts, setSelectedProducts] = useState([])

	const handleSubmit = e => {
		e.preventDefault()
	}

	const navBack = e => {
		e.preventDefault()
		navigate('/sales/retails')
	}

	const handleProductSelect = (product, isChecked) => {
		if (isChecked) {
			setSelectedProducts(prev => [...prev, product])
		} else {
			setSelectedProducts(prev => prev.filter(p => p.code !== product.code))
		}
	}

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
							<button>Удалить</button>
						</>
					) : (
						<>
							<p>
								<span style={{ fontWeight: '400' }}>Сумма:</span>{' '}
								{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
							</p>
							<button>Оформить продажу</button>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default AddRetail
