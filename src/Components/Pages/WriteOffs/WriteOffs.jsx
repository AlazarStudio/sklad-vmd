import axios from 'axios'
import { useEffect, useState } from 'react'

import { products } from '../../../../data'
import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import Product from '../../Blocks/Product/Product'
import WriteOffProduct from '../../Blocks/WriteOffProduct/WriteOffProduct'
import AddButton from '../../UI/AddButton/AddButton'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './WriteOffs.module.css'

const fetchWriteOffs = async () => {
	try {
		const response = await axios.get(`${serverConfig}/writeoffs`, {
			headers: { Authorization: `Bearer ${getToken}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function WriteOffs({ children, ...props }) {
	const [writeOffProduct, setWriteOffProduct] = useState([])
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		const getWriteOff = async () => {
			const writeOffProduct = await fetchWriteOffs()
			setWriteOffProduct(writeOffProduct)
		}
		getWriteOff()
	}, [])

	const filteredWriteOffs = writeOffProduct.filter(product => {
		const productName = product.item.name?.toLowerCase() || ''
		const productColor = product.item.color?.toLowerCase() || ''
		const frameGrouve = product.item.frameGrouve?.toLowerCase() || ''
		const wheelSize = product.item.wheelSize?.toLowerCase() || ''
		const price = product.price?.toString().toLowerCase() || ''

		const reason = product.reason
			? product.reason.toLowerCase()
			: 'Не указан'.toLowerCase()

		// Сравнение с поисковым запросом
		return (
			productName.includes(searchQuery.toLowerCase()) ||
			productColor.includes(searchQuery.toLowerCase()) ||
			frameGrouve.includes(searchQuery.toLowerCase()) ||
			wheelSize.includes(searchQuery.toLowerCase()) ||
			price.includes(searchQuery.toLowerCase()) ||
			reason.includes(searchQuery.toLowerCase())
		)
	})

	const handleSearchChange = event => {
		setSearchQuery(event.target.value)
	}

	return (
		<>
			<div className={styles.operations}>
				<p className={styles.operations__title}>Списания</p>
				<div className={styles.operation_buttons__wrapper}>
					{/* <AddButton img='/images/green_add.png' text='Списание' /> */}
					{/* <AddButton img='/images/print.png' text='Печать' /> */}
				</div>
				<input
					type='search'
					placeholder='Поиск...'
					value={searchQuery}
					onChange={handleSearchChange}
				/>
			</div>

			<section className={styles.products_wrapper}>
				<div className={styles.products_wrapper__head}>
					{/* <div className={styles.checkBox_wrapper}>
						<CheckBox />
					</div> */}
					<p className={styles.name}>Наименование</p>
					{/* <p className={styles.code}>Код</p> */}
					<p className={styles.sale_price}>Время</p>
					<p className={styles.unit_of_measurement}>Количество</p>
					<p className={styles.reason}>Статус</p>
					<p className={styles.cost_price}>Себестоимость</p>
				</div>
				<div>
					{filteredWriteOffs
						.map(product => (
							<WriteOffProduct
								key={product.id}
								quantity={product.quantity}
								reason={product.reason}
								isVisCheckBox={true}
								linkName={null}
								{...product}
							/>
						))
						.reverse()}
				</div>
			</section>
		</>
	)
}

export default WriteOffs
