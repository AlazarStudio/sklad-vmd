import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import serverConfig from '../../../serverConfig'
import Scanner from '../../Blocks/Scanner/Scanner'
import AddButton from '../../UI/AddButton/AddButton'

import styles from './AddProduct.module.css'

function AddProduct({ children, ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()
	const token = Cookies.get('token')
	// console.log(id)

	const [formData, setFormData] = useState({
		name: '',
		images: [], // Для примера пустой массив, требуется реализация для добавления изображений
		description: '',
		gender: '',
		color: '',
		groupId: 0, // ID группы, которую нужно получить динамически
		type: '',
		price: '',
		priceForSale: '',
		ageGroup: '',
		// code: '',
		barcode: '',
		nds: '',
		frame: '',
		system: '',
		size: '',
		ratchet: '',
		weight: '',
		wheelSize: '12',
		frameGrouve: '13',
		isProm: '',
		amortization: '',
		speed: '',
		fork: '',
		carriage: '',
		flywheels: '',
		breaks: '',
		frontDerailleur: '',
		backDerailleur: '',
		bushings: '',
		rubber: '',
		warehouseCount: 0, // Например, можно установить значение по умолчанию
		storeCount: 0
	})

	// const [selectedFile, setSelectedFile] = useState(null)
	const [selectedFiles, setSelectedFiles] = useState([]) // Было selectedFile
	const [previewImages, setPreviewImages] = useState([])

	const [groups, setGroups] = useState([])

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const response = await axios.get(`${serverConfig}/groups`)
				// console.log(response)
				setGroups(response.data)
			} catch (error) {
				console.error('Error fetching groups:', error)
			}
		}
		fetchGroups()
	}, [])

	const handleChange = e => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleWarehouseStoreChange = e => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name.split('.')[0]]: {
				...formData[name.split('.')[0]],
				[name.split('.')[1]]: parseInt(value, 10)
			}
		})
	}

	// const handleFileChange = e => {
	// 	setSelectedFile(e.target.files[0])
	// }

	const handleFileChange = e => {
		const files = Array.from(e.target.files)
		setSelectedFiles(files)

		const imagePreviews = files.map(file => URL.createObjectURL(file))
		setPreviewImages(imagePreviews)
	}

	// const handleSubmit = async e => {
	// 	e.preventDefault()

	// 	let uploadedFilePath = ''
	// 	if (selectedFile) {
	// 		const formData = new FormData()
	// 		formData.append('image', selectedFile)

	// 		try {
	// 			const uploadResponse = await axios.post(
	// 				`${serverConfig}/upload`,
	// 				formData,
	// 				{
	// 					headers: {
	// 						'Content-Type': 'multipart/form-data'
	// 					}
	// 				}
	// 			)
	// 			uploadedFilePath = uploadResponse.data.filePath
	// 		} catch (error) {
	// 			console.error('Error uploading file:', error)
	// 			return
	// 		}
	// 	}

	// 	const preparedData = {
	// 		...formData,
	// 		images: [uploadedFilePath],
	// 		groupId: parseInt(formData.groupId),
	// 		price: parseInt(formData.price),
	// 		priceForSale: parseInt(formData.priceForSale),
	// 		code: parseInt(formData.code),
	// 		nds: parseInt(formData.nds),
	// 		// Warehouse: { count: parseInt(formData.Warehouse.count) }
	// 		warehouseCount: parseInt(formData.warehouseCount)
	// 	}

	// 	console.log('Submitting form data:', preparedData)

	// 	try {
	// 		const response = await axios.post(`${serverConfig}/items`, preparedData)
	// 		console.log('Response from server:', response.data)
	// 		navigate('/warehouse') // Перенаправление после успешного создания товара
	// 	} catch (error) {
	// 		console.error('Error creating item:', error)
	// 	}
	// }

	const handleSubmit = async e => {
		e.preventDefault()

		let uploadedFilePaths = [] // Массив для хранения путей загруженных файлов

		// Проверяем, есть ли выбранные файлы
		if (selectedFiles.length > 0) {
			const filesData = new FormData()

			// Добавляем каждый файл в filesData
			selectedFiles.forEach(file => {
				filesData.append('images', file)
			})

			try {
				const uploadResponse = await axios.post(
					`${serverConfig}/upload`,
					filesData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				uploadedFilePaths = uploadResponse.data.filePaths // Предполагается, что сервер возвращает массив путей
			} catch (error) {
				console.error('Error uploading files:', error)
				return
			}
		}

		const preparedData = {
			...formData,
			images: uploadedFilePaths,
			groupId: parseInt(formData.groupId),
			price: parseInt(formData.price),
			priceForSale: parseInt(formData.priceForSale),
			code: 0,
			nds: parseInt(formData.nds),
			warehouseCount: parseInt(formData.warehouseCount)
		}

		// console.log('Submitting form data:', preparedData)

		try {
			const response = await axios.post(`${serverConfig}/items`, preparedData, {
				headers: { Authorization: `Bearer ${token}` }
			})
			// console.log('Response from server:', response)
			navigate('/warehouse') // Перенаправление после успешного создания товара
		} catch (error) {
			console.error('Error creating item:', error)
		}
	}

	const navBack = e => {
		e.preventDefault()
		navigate('/select-group')
		// navigate(-1)
	}

	return (
		<>
			{/* <Scanner /> */}
			<form onSubmit={handleSubmit} className={styles.form_product}>
				<div className={styles.products_header__wrapper}>
					<div className={styles.products_buttons}>
						<button type='submit'>Сохранить</button>
						{/* <button
							style={{
								backgroundColor: '#f77532',
								color: '#fff',
								fontWeight: '700',
								border: 'none'
							}}
						>
							Опубликовать
						</button> */}
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
								name='name'
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.item}>
							<p>Изображения</p>
							<div className={styles.item2}>
								<input
									className={styles.image_input}
									type='file'
									accept='images/*'
									multiple
									onChange={handleFileChange}
								/>
							</div>
							<div className={styles.preview}>
								{previewImages.map((src, index) => (
									<div key={index} className={styles.previewImage}>
										<img key={index} src={src} alt={`preview-${index}`} />
									</div>
								))}
							</div>
						</div>
					</div>
					<div className={styles.form_item}>
						<p style={{ flexBasis: '100%' }}>Общие данные</p>
						<div className={styles.item}>
							<label htmlFor='description'>Описание</label>
							<textarea
								name='description'
								value={formData.description}
								onChange={handleChange}
								required
								style={{ resize: 'none' }}
							></textarea>
							{/* <label htmlFor='code'>Код</label>
							<input
								type='text'
								name='code'
								value={formData.code}
								onChange={handleChange}
								required
								placeholder='00001'
							/> */}
							<label htmlFor='warehouseCount'>Количество</label>
							<input
								type='number'
								name='warehouseCount'
								value={formData.warehouseCount}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='nds'>НДС</label>
							<input
								type='number'
								name='nds'
								value={formData.nds}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.item}>
							<label htmlFor='groupId'>Группа</label>
							<select
								name='groupId'
								id='groupId'
								value={formData.groupId}
								required
								onChange={handleChange}
							>
								<option value='' defaultValue>
									Все группы
								</option>
								{groups
									.map(group => (
										<option key={group.id} value={group.id}>
											{group.name}
										</option>
									))
									.reverse()}
							</select>
							{/* <input type='text' name='groupId' value={'Велосипеды'} disabled /> */}
							<label htmlFor='price'>Себестоимость</label>
							<input
								type='text'
								name='price'
								value={formData.price}
								onChange={handleChange}
								required
							/>
							<label htmlFor='priceForSale'>Цена продажи</label>
							<input
								type='text'
								name='priceForSale'
								value={formData.priceForSale}
								onChange={handleChange}
								required
							/>
							<label htmlFor='barcode'>Штрихкоды товара</label>
							<div className={styles.item}>
								<input
									type='text'
									name='barcode'
									value={formData.barcode}
									onChange={handleChange}
									placeholder='EAN13'
									// required
								/>
								{/* <input type='text' placeholder='2000000000022' required /> */}
							</div>
						</div>
					</div>

					<div className={styles.form_item}>
						<p style={{ flexBasis: '100%' }}>Данные велосипеда</p>

						<div className={styles.item}>
							<label htmlFor='frame'>Рама (Материал)</label>
							<input
								type='text'
								name='frame'
								value={formData.frame}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='size'>Размер</label>
							<input
								type='text'
								name='size'
								value={formData.size}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='weight'>Вес</label>
							<input
								type='text'
								name='weight'
								value={formData.weight}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='fork'>Вилка</label>
							<input
								type='text'
								name='fork'
								value={formData.fork}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='flywheels'>Манетки</label>
							<input
								type='text'
								name='flywheels'
								value={formData.flywheels}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='frontDerailleur'>Передний переключатель</label>
							<input
								type='text'
								name='frontDerailleur'
								value={formData.frontDerailleur}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='backDerailleur'>Задний переключатель</label>
							<input
								type='text'
								name='backDerailleur'
								value={formData.backDerailleur}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='wheelSize'>Диаметр колеса</label>
							<input
								type='number'
								name='wheelSize'
								min={12}
								max={29}
								value={formData.wheelSize}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='color'>Цвет</label>
							<select
								name='color'
								value={formData.color}
								onChange={handleChange}
								// required
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
							{/* <input
								type='text'
								name='color'
								value={formData.color}
								onChange={handleChange}
								required
							/> */}
							<label htmlFor='ageGroup'>Возрастная группа</label>
							<select
								name='ageGroup'
								value={formData.ageGroup}
								onChange={handleChange}
								// required
							>
								<option value='' defaultValue hidden>
									Выберите группу
								</option>
								<option value='От 2 до 4 лет'>От 2 до 4 лет</option>
								<option value='От 4 до 6 лет'>От 4 до 6 лет</option>
								<option value='От 5 до 9 лет'>От 6 до 9 лет</option>
								<option value='Подростковый'>Подростковый</option>
								<option value='Для взрослых'>Для взрослых</option>
							</select>

							<label htmlFor='amortization'>Амортизация</label>
							<input
								type='text'
								name='amortization'
								value={formData.amortization}
								onChange={handleChange}
								// required
							/>
							{/* <select
								name='amortization'
								value={formData.amortization}
								onChange={handleChange}
								required
							>
								<option value='' defaultValue hidden>
									Выберите амортизацию
								</option>
								<option value='Двухподвес'>Двухподвес</option>
								<option value='Жесткая вилка'>Жесткая вилка</option>
								<option value='Хардтейл'>Хардтейл</option>
							</select> */}
						</div>

						<div className={styles.item}>
							<label htmlFor='isProm'>Тип подшипника</label>
							<select
								name='isProm'
								value={formData.isProm}
								onChange={handleChange}
								// required
							>
								<option value='' defaultValue hidden>
									Выберите тип подшипника
								</option>
								<option value='Обычный'>Обычный</option>
								<option value='Пром'>Пром</option>
							</select>
							<label htmlFor='system'>Система</label>
							<input
								type='text'
								name='system'
								value={formData.system}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='ratchet'>Кассета трещотка</label>
							<input
								type='text'
								name='ratchet'
								value={formData.ratchet}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='speed'>Скорость</label>
							<input
								type='number'
								name='speed'
								min={1}
								max={27}
								value={formData.speed}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='carriage'>Каретка</label>
							<input
								type='text'
								name='carriage'
								value={formData.carriage}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='breaks'>Тормоза</label>
							<input
								type='text'
								name='breaks'
								value={formData.breaks}
								onChange={handleChange}
								// required
							/>
							{/* <select
								name='breaks'
								value={formData.breaks}
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
							</select> */}

							<label htmlFor='bushings'>Втулки</label>
							<input
								type='text'
								name='bushings'
								value={formData.bushings}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='rubber'>Резина</label>
							<input
								type='text'
								name='rubber'
								value={formData.rubber}
								onChange={handleChange}
								// required
							/>
							<label htmlFor='frameGrouve'>Ростовка рамы</label>
							<input
								type='number'
								name='frameGrouve'
								min={13}
								max={23}
								step={0.5}
								value={formData.frameGrouve}
								// required
								onChange={handleChange}
							/>
							<label htmlFor='gender'>Пол</label>
							<select
								name='gender'
								value={formData.gender}
								onChange={handleChange}
								required
							>
								<option value='' defaultValue hidden>
									Выберите пол
								</option>
								<option value='Мужской'>Мужской</option>
								<option value='Женский'>Женский</option>
							</select>
							{/* <input
								type='text'
								name='gender'
								value={formData.gender}
								required
								onChange={handleChange}
							/> */}
							<label htmlFor='type'>Тип</label>
							<select
								name='type'
								value={formData.type}
								onChange={handleChange}
								// required
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
		</>
	)
}

export default AddProduct
