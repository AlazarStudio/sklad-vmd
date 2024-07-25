import { Link } from 'react-router-dom'

import { products } from '../../../../data'
import AddButton from '../../UI/AddButton/AddButton'
import CheckBox from '../../UI/CheckBox/CheckBox'
import Report from '../Report/Report'

import styles from './Reports.module.css'

function Reports({ ...props }) {
	return (
		<>
			<div className={styles.operations}>
				<p className={styles.operations__title}>Отчеты</p>
				<div className={styles.operation_buttons__wrapper}>
					<Link to='/add-report'>
						<img src='/images/green_add.png' alt='' />
						Отчет
					</Link>
					<div className={styles.period_date}>
						<input type='date' required />
						<input type='date' required />
					</div>
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
					<p className={styles.category}>Категория</p>
					<p className={styles.organization}>Организация</p>
					<p className={styles.period}>Период</p>
				</div>
				<div>
					{products.slice(-5).map((product, index) => (
						<Report key={index} {...product} />
					))}
				</div>
			</section>
		</>
	)
}

export default Reports
