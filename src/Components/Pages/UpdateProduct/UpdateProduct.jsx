import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import AddButton from '../../UI/AddButton/AddButton'

import styles from './UpdateProduct.module.css'

function UpdateProduct({ children, ...props }) {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [product, setProduct] = useState(location.state?.product || {})

	const handleSubmit = e => {
		e.preventDefault()
		// Сохранить изменения продукта
		// Здесь можно добавить логику для обработки отправки данных,
		// например, сохранить данные в локальном хранилище или в каком-то другом месте
		console.log('Product updated:', product)
		alert('Changes saved successfully!')
	}

	const navBack = e => {
		e.preventDefault()
		navigate('/products')
	}

	useEffect(() => {
		if (location.state?.product) {
			setProduct(location.state.product)
		}
	}, [location.state])

	return (
		<form onSubmit={handleSubmit} className={styles.form_product}>
			<div className={styles.products_header__wrapper}>
				<div className={styles.products_buttons}>
					<button type='submit'>Изменить</button>
					<button type='button' onClick={navBack}>
						Закрыть
					</button>
				</div>
			</div>
			<div className={styles.form_inputs}>
				<div className={styles.form_item}>
					<div className={styles.item}>
						<label htmlFor='name' style={{ fontWeight: '500' }}>
							Наименование товара
						</label>
						<input
							type='text'
							id='name'
							required
							value={product.name || ''}
							onChange={e => setProduct({ ...product, name: e.target.value })}
						/>
					</div>
					<div className={styles.item}>
						<p>Изображения</p>
						<div className={styles.item2}>
							<AddButton img='/images/green_add.png' text='Изображение' />
						</div>
					</div>
				</div>
				<div className={styles.form_item}>
					<p style={{ flexBasis: '100%' }}>Общие данные</p>
					<div className={styles.item}>
						<label htmlFor='description'>Описание</label>
						<textarea
							id='description'
							required
							style={{ resize: 'none' }}
							value={product.description || ''}
							onChange={e =>
								setProduct({ ...product, description: e.target.value })
							}
						></textarea>
						<label htmlFor='code'>Код</label>
						<input
							type='text'
							id='code'
							required
							placeholder='00001'
							value={product.code || ''}
							onChange={e => setProduct({ ...product, code: e.target.value })}
						/>
						<label htmlFor='vat'>НДС</label>
						<input
							type='text'
							id='vat'
							required
							value={product.vat || ''}
							onChange={e => setProduct({ ...product, vat: e.target.value })}
						/>
					</div>
					<div className={styles.item}>
						<label htmlFor='group'>Группа</label>
						<select
							id='type'
							required
							value={product.type || ''}
							onChange={e => setProduct({ ...product, type: e.target.value })}
						>
							<option value='' defaultValue hidden></option>
							<option value='Велосипеды'>Велосипеды</option>
							<option value='Мопеды'>Мопеды</option>
							<option value='Самокаты'>Самокаты</option>
							<option value='Квадроциклы'>Квадроциклы</option>
							<option value='Мотоциклы'>Мотоциклы</option>
						</select>
						<label htmlFor='costPrice'>Себестоимость</label>
						<input
							type='text'
							id='costPrice'
							required
							value={product.costPrice + ' ₽' || ''}
							onChange={e =>
								setProduct({ ...product, costPrice: e.target.value })
							}
						/>
						<label htmlFor='salePrice'>Цена продажи</label>
						<input
							type='text'
							id='salePrice'
							required
							value={product.currentPrice + ' ₽' || ''}
							onChange={e =>
								setProduct({ ...product, currentPrice: e.target.value })
							}
						/>
						<label htmlFor='barcodes'>Штрихкоды товара</label>
						<div className={styles.item_half}>
							<input
								type='text'
								placeholder='EAN13'
								required
								value={product.ean13 || ''}
								onChange={e =>
									setProduct({ ...product, ean13: e.target.value })
								}
							/>
							<input
								type='text'
								placeholder='2000000000022'
								required
								value={product.barcode || ''}
								onChange={e =>
									setProduct({ ...product, barcode: e.target.value })
								}
							/>
						</div>
					</div>
				</div>
				<div className={styles.form_item}>
					<p style={{ flexBasis: '100%' }}>Данные велосипеда</p>
					<div className={styles.item}>
						<label htmlFor='frame'>Рама</label>
						<input
							type='text'
							id='frame'
							required
							value={product.frameMaterial || ''}
							onChange={e => setProduct({ ...product, frameMaterial: e.target.value })}
						/>
						<label htmlFor='size'>Размер</label>
						<input
							type='text'
							id='size'
							required
							value={product.size || ''}
							onChange={e => setProduct({ ...product, size: e.target.value })}
						/>
						<label htmlFor='weight'>Вес</label>
						<input
							type='text'
							id='weight'
							required
							value={product.weight + ' кг' || ''}
							onChange={e => setProduct({ ...product, weight: e.target.value })}
						/>
						<label htmlFor='fork'>Вилка</label>
						<input
							type='text'
							id='fork'
							required
							value={product.fork || ''}
							onChange={e => setProduct({ ...product, fork: e.target.value })}
						/>
						<label htmlFor='shifters'>Манетки</label>
						<input
							type='text'
							id='manettes'
							required
							value={product.manettes || ''}
							onChange={e =>
								setProduct({ ...product, manettes: e.target.value })
							}
						/>
						<label htmlFor='frontDerailleur'>Передний переключатель</label>
						<input
							type='text'
							id='frontDerailleur'
							required
							value={product.frontDerailleur || ''}
							onChange={e =>
								setProduct({ ...product, frontDerailleur: e.target.value })
							}
						/>
						<label htmlFor='rearDerailleur'>Задний переключатель</label>
						<input
							type='text'
							id='rearDerailleur'
							required
							value={product.rearDerailleur || ''}
							onChange={e =>
								setProduct({ ...product, rearDerailleur: e.target.value })
							}
						/>
					</div>
					<div className={styles.item}>
						<label htmlFor='system'>Система</label>
						<input
							type='text'
							id='system'
							required
							value={product.system || ''}
							onChange={e =>
								setProduct({ ...product, system: e.target.value })
							}
						/>
						<label htmlFor='cassette'>Кассета трещотка</label>
						<input
							type='text'
							id='cassette'
							required
							value={product.cassetteAndRatchet || ''}
							onChange={e =>
								setProduct({ ...product, cassetteAndRatchet: e.target.value })
							}
						/>
						<label htmlFor='speed'>Скорость</label>
						<input
							type='text'
							id='speed'
							required
							value={product.speed || ''}
							onChange={e => setProduct({ ...product, speed: e.target.value })}
						/>
						<label htmlFor='carriage'>Каретка</label>{' '}
						<input
							type='text'
							id='carriage'
							required
							value={product.carriage || ''}
							onChange={e =>
								setProduct({ ...product, carriage: e.target.value })
							}
						/>
						<label htmlFor='brakes'>Тормоза</label>
						<input
							type='text'
							id='brakes'
							required
							value={product.brakes || ''}
							onChange={e => setProduct({ ...product, brakes: e.target.value })}
						/>
						<label htmlFor='bushings'>Втулки</label>
						<input
							type='text'
							id='bushings'
							required
							value={product.bushings || ''}
							onChange={e => setProduct({ ...product, bushings: e.target.value })}
						/>
						<label htmlFor='rubber'>Резина</label>
						<input
							type='text' 
							id='rubber'
							required
							value={product.rubber || ''}
							onChange={e => setProduct({ ...product, rubber: e.target.value })}
						/>
					</div>
				</div>
			</div>
		</form>
	)
}

export default UpdateProduct
