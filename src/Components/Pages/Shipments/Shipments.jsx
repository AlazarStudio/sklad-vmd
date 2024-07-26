import { Link } from 'react-router-dom'

import { products } from '../../../../data'
import AcceptanceProduct from '../../Blocks/AcceptanceProduct/AcceptanceProduct'
import AddButton from '../../UI/AddButton/AddButton'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './Shipments.module.css'

function Shipments({ ...props }) {
	return (
		<>
			<div className={styles.operations}>
				<p className={styles.operations__title}>Продажи</p>
				<div className={styles.operation_buttons__wrapper}>
					{/* <AddButton img='/images/qr-code.png' text='Найти товар' /> */}
					{/* <AddButton img='/images/green_add.png' text='Отгрузка' /> */}
					<Link to='/add-shipment'>
						<img src='/images/qr-code.png' alt='' />
						Найти товар
					</Link>
					<AddButton img='/images/print.png' text='Печать' />
				</div>
				<input type='search' placeholder='Поиск...' />
			</div>
			<section className={styles.products_wrapper}>
				<div className={styles.products_wrapper__head}>
					<div className={styles.checkBox_wrapper}>
						<CheckBox />
					</div>
					<p className={styles.number}>№</p>
					<p className={styles.time}>Время</p>
					<p className={styles.to_warehouse}>На склад</p>
					<p className={styles.contractors}>Контрагент</p>
					<p className={styles.organization}>Организация</p>
					<p className={styles.sum}>Сумма</p>
				</div>
				<div>
					{products.slice(-5).map((product, index) => (
						<AcceptanceProduct key={index} {...product} />
					))}
				</div>
			</section>
		</>
	)
}

export default Shipments
