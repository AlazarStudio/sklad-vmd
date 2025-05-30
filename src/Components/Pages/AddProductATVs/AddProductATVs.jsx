import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import Scanner from '../../Blocks/Scanner/Scanner'
import AddButton from '../../UI/AddButton/AddButton'

import styles from './AddProductATVs.module.css'

function AddProductATVs({ children, ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()
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
		code: '',
		barcode: '',
		nds: '',
		frame: '',
		system: '',
		size: '',
		ratchet: '',
		weight: '',
		wheelSize: '',
		frameGrouve: '',
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
		motor: '',
		frontSuspension: '',
		rearSuspension: '',
		fuelConsumption: '',
		starting: '',
		power: '',
		torque: '',
		maxSpeed: '',
		transmission: '',
		wheelbase: '',
		groundClearance: '',
		fuelTankCapacity: '',
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
			const formData = new FormData()

			// Добавляем каждый файл в FormData
			selectedFiles.forEach(file => {
				formData.append('images', file)
			})

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
			code: parseInt(formData.code),
			nds: parseInt(formData.nds),
			warehouseCount: parseInt(formData.warehouseCount)
		}

		// console.log('Submitting form data:', preparedData)

		try {
			const response = await axios.post(`${serverConfig}/items`, preparedData, {
				headers: { Authorization: `Bearer ${getToken()}` }
			})
			// console.log('Response from server:', response.data)
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
			<form className={styles.form_product}>
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
							<label htmlFor='code'>Код</label>
							<input
								type='text'
								name='code'
								value={formData.code}
								onChange={handleChange}
								required
								placeholder='00001'
							/>
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
									required
								/>
								{/* <input type='text' placeholder='2000000000022' required /> */}
							</div>
						</div>
					</div>

					<div className={styles.form_item}>
						<p style={{ flexBasis: '100%' }}>Данные велосипеда</p>

						<div className={styles.item}>
							<label htmlFor='motor'>Двигатель</label>
							<input
								type='text'
								name='motor'
								value={formData.frame}
								onChange={handleChange}
								required
							/>
							<label htmlFor='size'>Длина х Ширина х Высота</label>
							<input
								type='text'
								name='size'
								value={formData.size}
								onChange={handleChange}
								required
							/>
							<label htmlFor='weight'>Масса</label>
							<input
								type='text'
								name='weight'
								value={formData.weight}
								onChange={handleChange}
								required
							/>
							<label htmlFor='frontDerailleur'>Передний / задний тормоз</label>
							<input
								type='text'
								name='frontDerailleur'
								value={formData.frontDerailleur}
								onChange={handleChange}
								required
							/>
							<label htmlFor='backDerailleur'>Переднее / заднее колесо</label>
							<input
								type='text'
								name='backDerailleur'
								value={formData.backDerailleur}
								onChange={handleChange}
								required
							/>
							<label htmlFor='frontSuspension'>Передняя подвеска</label>
							<input
								type='text'
								name='frontSuspension'
								value={formData.frontSuspension}
								onChange={handleChange}
								required
							/>
							<label htmlFor='rearSuspension'>Задняя подвеска</label>
							<input
								type='text'
								name='rearSuspension'
								value={formData.rearSuspension}
								onChange={handleChange}
								required
							/>
							<label htmlFor='fuelConsumption'>Расход топлива (л/км)</label>
							<input
								type='text'
								name='fuelConsumption'
								value={formData.fuelConsumption}
								onChange={handleChange}
								required
							/>
							<label htmlFor='color'>Цвет</label>
							<select
								name='color'
								value={formData.color}
								onChange={handleChange}
								required
							>
								<option value='' defaultValue hidden>
									Выберите цвет
								</option>
								<option value='черный'>черный</option>
								<option value='белый'>белый</option>
								<option value='серый'>серый</option>
								<option value='черно-красный'>черно-красный</option>
								<option value='черно-желтый'>черно-желтый</option>
								<option value='черно-зеленый'>черно-зеленый</option>
								<option value='черно-синий'>черно-синий</option>
								<option value='белый-розовый'>белый-розовый</option>
								<option value='белый-бирюзовый'>белый-бирюзовый</option>
								<option value='серо-синий'>серо-синий</option>
								<option value='синий'>синий</option>
								<option value='желтый'>желтый</option>
								<option value='оранжевый'>оранжевый</option>
								<option value='коричневый'>коричневый</option>
								<option value='зеленый'>зеленый</option>
								<option value='красный'>красный</option>
								<option value='красно-черный'>красно-черный</option>
								<option value='вишневый'>вишневый</option>
								<option value='бордовый'>бордовый</option>
								<option value='голубой'>голубой</option>
								<option value='бирюзовый'>бирюзовый</option>
								<option value='фиолетовый'>фиолетовый</option>
								<option value='сиреневый'>сиреневый</option>
								<option value='розовый'>розовый</option>
								<option value='бежевый'>бежевый</option>
								<option value='графитовый'>графитовый</option>
								<option value='хаки'>хаки</option>
								<option value='оливковый'>оливковый</option>
							</select>
						</div>

						<div className={styles.item}>
							<label htmlFor='system'>Система питания</label>
							<input
								type='text'
								name='system'
								value={formData.system}
								onChange={handleChange}
								required
							/>
							<label htmlFor='starting'>Запуск</label>
							<input
								type='text'
								name='starting'
								value={formData.starting}
								onChange={handleChange}
								required
							/>
							<label htmlFor='power'>Мощность</label>
							<input
								type='text'
								name='power'
								value={formData.power}
								onChange={handleChange}
								required
							/>
							<label htmlFor='torque'>Крутящий момент</label>
							<input
								type='text'
								name='torque'
								value={formData.torque}
								onChange={handleChange}
								required
							/>
							<label htmlFor='maxSpeed'>Максимальная скорость (км/ч)</label>
							<input
								type='number'
								name='maxSpeed'
								value={formData.maxSpeed}
								onChange={handleChange}
								required
							/>

							<label htmlFor='transmission'>Трансмиссия</label>
							<input
								type='text'
								name='transmission'
								value={formData.transmission}
								onChange={handleChange}
								required
							/>
							<label htmlFor='wheelbase'>Колёсная база (мм)</label>
							<input
								type='number'
								name='wheelbase'
								value={formData.wheelbase}
								onChange={handleChange}
								required
							/>
							<label htmlFor='groundClearance'>Дорожный просвет (мм)</label>
							<input
								type='number'
								name='groundClearance'
								value={formData.groundClearance}
								onChange={handleChange}
								required
							/>
							<label htmlFor='fuelTankCapacity'>Объём топливного бака</label>
							<input
								type='text'
								name='fuelTankCapacity'
								value={formData.fuelTankCapacity}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
				</div>
			</form>
		</>
	)
}

export default AddProductATVs
