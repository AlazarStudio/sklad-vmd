import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import serverConfig from '../../../serverConfig'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import AddButton from '../../UI/AddButton/AddButton'

import styles from './UpdateProduct.module.css'

function UpdateProduct({ children, ...props }) {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [product, setProduct] = useState(location.state?.product || {})
	const [selectedFile, setSelectedFile] = useState(null)
	const [groups, setGroups] = useState([])

	useEffect(() => {
		if (!location.state?.product) {
			const fetchProduct = async () => {
				try {
					const response = await axios.get(`${serverConfig}/items/${id}`)
					setProduct(response.data)
				} catch (error) {
					console.error('Error fetching product:', error)
				}
			}
			fetchProduct()
		}

		const fetchGroups = async () => {
			try {
				const response = await axios.get(`${serverConfig}/groups`)
				console.log(response)
				setGroups(response.data)
			} catch (error) {
				console.error('Error fetching groups:', error)
			}
		}
		fetchGroups()
	}, [id, location.state])

	const handleChange = e => {
		const { name, value } = e.target
		setProduct({
			...product,
			[name]: value
		})
	}

	const handleFileChange = e => {
		setSelectedFile(e.target.files[0])
	}

	const handleSubmit = async e => {
		e.preventDefault()

		let uploadedFilePath = product.images[0] || ''
		if (selectedFile) {
			const formData = new FormData()
			formData.append('image', selectedFile)

			try {
				const uploadResponse = await axios.post(
					`${serverConfig}/upload`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				uploadedFilePath = uploadResponse.data.filePath
			} catch (error) {
				console.error('Error uploading file:', error)
				return
			}
		}

		const updatedData = {
			...product,
			images: [uploadedFilePath],
			groupId: parseInt(product.groupId),
			price: parseInt(product.price),
			priceForSale: parseInt(product.priceForSale),
			code: parseInt(product.code),
			nds: parseInt(product.nds),
			itemCount: parseInt(product.itemCount)
		}

		try {
			const response = await axios.put(
				`${serverConfig}/items/${id}`,
				updatedData
			)
			console.log('Response from server:', response.data)
			// navigate('/products') // Перенаправление после успешного обновления товара
			navigate(-1)
		} catch (error) {
			console.error('Error updating item:', error)
		}
	}

	const navBack = e => {
		e.preventDefault()
		// navigate('/products')
		navigate(-1)
	}

	// useEffect(() => {
	// 	if (location.state?.product) {
	// 		setProduct(location.state.product)
	// 	}
	// }, [location.state])

	return (
		<main>
			<CenterBlock>
				<WidthBlock>
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
										name='name'
										value={product.name || ''}
										onChange={handleChange}
										required
									/>
								</div>
								<div className={styles.item}>
									<label htmlFor='img'>Изображения</label>
									<div className={styles.item2}>
										<input
											className={styles.image_input}
											id='img'
											type='file'
											accept='images/*'
											multiple='multiple'
											// required
											onChange={handleFileChange}
											// value={product.img || ''}
											// onChange={e => setProduct({ ...product, img: e.target.value })}
										/>
									</div>
								</div>
							</div>
							<div className={styles.form_item}>
								<p style={{ flexBasis: '100%' }}>Общие данные</p>
								<div className={styles.item}>
									<label htmlFor='description'>Описание</label>
									<textarea
										id='description'
										name='description'
										required
										style={{ resize: 'none' }}
										value={product.description || ''}
										onChange={handleChange}
									></textarea>
									<label htmlFor='code'>Код</label>
									<input
										type='text'
										id='code'
										name='code'
										required
										placeholder='00001'
										value={product.code || ''}
										onChange={handleChange}
									/>
									<label htmlFor='itemCount'>Количество</label>
									<input
										type='number'
										id='itemCount'
										name='itemCount'
										required
										value={product.itemCount || ''}
										onChange={handleChange}
									/>
									<label htmlFor='nds'>НДС</label>
									<input
										type='number'
										id='nds'
										name='nds'
										required
										value={product.nds || ''}
										onChange={handleChange}
									/>
								</div>
								<div className={styles.item}>
									<label htmlFor='groupId'>Группа</label>
									<select
										id='groupId'
										name='groupId'
										required
										value={product.groupId || ''}
										onChange={handleChange}
									>
										<option value='' defaultValue hidden>
											Выберите группу
										</option>
										{groups
											.map(group => (
												<option key={group.id} value={group.id}>
													{group.name}
												</option>
											))
											.reverse()}
									</select>
									<label htmlFor='price'>Себестоимость</label>
									<input
										type='text'
										id='price'
										name='price'
										required
										value={product.price || ''}
										onChange={handleChange}
									/>
									<label htmlFor='priceForSale'>Цена продажи</label>
									<input
										type='text'
										id='priceForSale'
										name='priceForSale'
										required
										value={product.priceForSale || ''}
										onChange={handleChange}
									/>
									<label htmlFor='barcode'>Штрихкоды товара</label>
									<div className={styles.item}>
										<input
											type='text'
											placeholder='EAN13'
											id='barcode'
											name='barcode'
											required
											value={product.barcode || ''}
											onChange={handleChange}
										/>
										{/* <input
											type='text'
											placeholder='2000000000022'
											// required
											value={product.barcode || ''}
											onChange={e =>
												setProduct({ ...product, barcode: e.target.value })
											}
										/> */}
									</div>
								</div>
							</div>
							<div className={styles.form_item}>
								<p style={{ flexBasis: '100%' }}>Данные велосипеда</p>
								<div className={styles.item}>
									<label htmlFor='frame'>Рама (Материал)</label>
									<input
										type='text'
										id='frame'
										name='frame'
										required
										value={product.frame || ''}
										onChange={handleChange}
									/>
									<label htmlFor='size'>Размер</label>
									<input
										type='text'
										id='size'
										name='size'
										required
										value={product.size || ''}
										onChange={handleChange}
									/>
									<label htmlFor='weight'>Вес</label>
									<input
										type='text'
										id='weight'
										name='weight'
										required
										value={product.weight || ''}
										onChange={handleChange}
									/>
									<label htmlFor='fork'>Вилка</label>
									<input
										type='text'
										id='fork'
										name='fork'
										required
										value={product.fork || ''}
										onChange={handleChange}
									/>
									<label htmlFor='flywheels'>Манетки</label>
									<input
										type='text'
										id='flywheels'
										name='flywheels'
										required
										value={product.flywheels || ''}
										onChange={handleChange}
									/>
									<label htmlFor='frontDerailleur'>
										Передний переключатель
									</label>
									<input
										type='text'
										id='frontDerailleur'
										name='frontDerailleur'
										required
										value={product.frontDerailleur || ''}
										onChange={handleChange}
									/>
									<label htmlFor='backDerailleur'>Задний переключатель</label>
									<input
										type='text'
										id='backDerailleur'
										name='backDerailleur'
										required
										value={product.backDerailleur || ''}
										onChange={handleChange}
									/>
									<label htmlFor='wheelSize'>Диаметр колеса</label>
									<input
										type='number'
										id='wheelSize'
										name='wheelSize'
										min={12}
										max={29}
										value={product.wheelSize || ''}
										onChange={handleChange}
										required
									/>
									<label htmlFor='color'>Цвет</label>
									<select
										type='text'
										id='color'
										value={product.color || ''}
										onChange={e =>
											setProduct({ ...product, color: e.target.value })
										}
										required
									>
										<option value='' defaultValue hidden>
											Выберите цвет
										</option>
										<option value='черный'>черный</option>
										<option value='графитовый'>графитовый</option>
										<option value='синий'>синий</option>
										<option value='белый'>белый</option>
										<option value='желтый'>желтый</option>
										<option value='оранжевый'>оранжевый</option>
										<option value='красный'>красный</option>
										<option value='зеленый'>зеленый</option>
										<option value='голубой'>голубой</option>
										<option value='серый'>серый</option>
										<option value='фиолетовый'>фиолетовый</option>
										<option value='розовый'>розовый</option>
									</select>

									<label htmlFor='ageGroup'>Возрастная группа</label>
									<select
										name='ageGroup'
										value={product.ageGroup || ''}
										onChange={handleChange}
										required
									>
										<option value='' defaultValue hidden>
											Выберите группу
										</option>
										<option value='Для взрослых'>Для взрослых</option>
										<option value='От 2 до 5 лет'>От 2 до 5 лет</option>
										<option value='От 3 до 6 лет'>От 3 до 6 лет</option>
										<option value='От 5 до 8 лет'>От 5 до 8 лет</option>
										<option value='Подростковый'>Подростковый</option>
									</select>

									<label htmlFor='amortization'>Амортизация</label>
									<select
										name='amortization'
										value={product.amortization || ''}
										onChange={handleChange}
										required
									>
										<option value='' defaultValue hidden>
											Выберите амортизацию
										</option>
										<option value='Двухподвес'>Двухподвес</option>
										<option value='Жесткая вилка'>Жесткая вилка</option>
										<option value='Хардтейл'>Хардтейл</option>
									</select>
								</div>

								<div className={styles.item}>
									<label htmlFor='system'>Система</label>
									<input
										type='text'
										id='system'
										name='system'
										required
										value={product.system || ''}
										onChange={handleChange}
									/>
									<label htmlFor='ratchet'>Кассета трещотка</label>
									<input
										type='text'
										id='ratchet'
										name='ratchet'
										required
										value={product.ratchet || ''}
										onChange={handleChange}
									/>
									<label htmlFor='speed'>Скорость</label>
									<input
										type='number'
										id='speed'
										name='speed'
										min={1}
										max={27}
										value={product.speed || ''}
										onChange={handleChange}
										required
									/>
									<label htmlFor='carriage'>Каретка</label>{' '}
									<input
										type='text'
										id='carriage'
										name='carriage'
										required
										value={product.carriage || ''}
										onChange={handleChange}
									/>
									<label htmlFor='breaks'>Тормоза</label>
									<select
										name='breaks'
										value={product.breaks || ''}
										onChange={handleChange}
									>
										<option value='' disabled hidden defaultValue>
											Выберите тормоза
										</option>
										<option value='U-brake'>U-brake</option>
										<option value='V-brake'>V-brake</option>
										<option value='Дисковые гидравлические'>
											Дисковые гидравлические
										</option>
										<option value='Дисковые механические'>
											Дисковые механические
										</option>
										<option value='Клещевой'>Клещевой</option>
										<option value='Ножной тормоз'>Ножной тормоз</option>
										<option value='Передний V-brake'>Передний V-brake</option>
										<option value='Передний клещевой'>Передний клещевой</option>
									</select>
									<label htmlFor='bushings'>Втулки</label>
									<input
										type='text'
										id='bushings'
										name='bushings'
										required
										value={product.bushings || ''}
										onChange={handleChange}
									/>
									<label htmlFor='rubber'>Резина</label>
									<input
										type='text'
										id='rubber'
										name='rubber'
										required
										value={product.rubber || ''}
										onChange={handleChange}
									/>
									<label htmlFor='frameGrouve'>Ростовка рамы</label>
									<input
										type='number'
										id='frameGrouve'
										name='frameGrouve'
										min={13}
										max={23}
										value={product.frameGrouve || ''}
										onChange={handleChange}
										required
									/>
									<label htmlFor='gender'>Пол</label>
									<select
										name='gender'
										value={product.gender || ''}
										onChange={handleChange}
										required
									>
										<option value='' defaultValue hidden>
											Выберите пол
										</option>
										<option value='Мужской'>Мужской</option>
										<option value='Женский'>Женский</option>
									</select>
									<label htmlFor='type'>Тип</label>
									<select
										name='type'
										value={product.type || ''}
										onChange={handleChange}
										required
									>
										<option value='' defaultValue hidden>
											Выберите тип
										</option>
										<option value='Горный'>Горный</option>
										<option value='Городской'>Городской</option>
										<option value='Складной'>Складной</option>
										<option value='Шоссейный'>Шоссейный</option>
										<option value='Подростковый'>Подростковый</option>
									</select>
								</div>
							</div>
						</div>
					</form>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default UpdateProduct
