import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { products } from '../../../../data'
import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import AcceptanceProduct from '../../Blocks/AcceptanceProduct/AcceptanceProduct'
import AddButton from '../../UI/AddButton/AddButton'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './Retails.module.css'

function Retails({ ...props }) {
	const [sales, setSales] = useState([])
	const [totalQuantity, setTotalQuantity] = useState(0)
	const [totalAmount, setTotalAmount] = useState(0)
	const [mostSoldColor, setMostSoldColor] = useState('')

	useEffect(() => {
		const fetchSalesReport = async () => {
			try {
				const response = await axios.get(`${serverConfig}/reports/sales`, {
					headers: { Authorization: `Bearer ${getToken}` },
					params: {
						startDate: '2024-01-01', // Укажите нужный диапазон дат
						endDate: '2024-12-31'
					}
				})
				setSales(response.data.sales)
				setTotalQuantity(response.data.totalQuantity)
				setTotalAmount(response.data.totalAmount)
				setMostSoldColor(response.data.mostSoldColor)
			} catch (error) {
				console.error('Error fetching sales report:', error)
			}
		}

		fetchSalesReport()
	}, [])
	return (
		<>
			<div className={styles.operations}>
				<p className={styles.operations__title}>Продажи</p>
				<div className={styles.operation_buttons__wrapper}>
					{/* <AddButton img='/images/qr-code.png' text='Найти товар' /> */}
					{/* <Link to='/add-retails'>
						<img src='/images/qr-code.png' alt='' />
						Продать товар
					</Link> */}
					<Link to='/add-retails'>
						<img
							style={{ width: '25px', height: '25px' }}
							src='/images/cart1.png'
							alt=''
						/>
						Товары к продаже
					</Link>
					{/* <AddButton img='/images/green_add.png' text='Отгрузка' /> */}
					{/* <AddButton img='/images/print.png' text='Печать' /> */}
				</div>
				<input type='search' placeholder='Поиск...' />
			</div>
			<section className={styles.products_wrapper}>
				<div className={styles.products_wrapper__head}>
					<div className={styles.checkBox_wrapper}>{/* <CheckBox /> */}</div>
					{/* <p className={styles.number}>№</p> */}
					<p className={styles.time}>Время</p>
					<p className={styles.name}>Наименование</p>
					<p className={styles.to_warehouse}>Склад / Магазин</p>
					<p className={styles.contractors}>Контрагент</p>
					<p className={styles.organization}>Количество</p>
					<p className={styles.sum}>Сумма</p>
				</div>
				<div>
					{sales
						.map(sale =>
							sale.buyertype === 'customer' ? (
								<AcceptanceProduct
									key={sale.id}
									{...sale}
									name={sale.item.name}
									color={sale.item.color}
									wheelSize={sale.item.wheelSize}
									saddleHeight={sale.item.saddleHeight}
									maximumLoad={sale.item.maximumLoad}
									frameGrouve={sale.item.frameGrouve}
								/>
							) : null
						)
						.reverse()}
				</div>
			</section>
		</>
	)
}

export default Retails
