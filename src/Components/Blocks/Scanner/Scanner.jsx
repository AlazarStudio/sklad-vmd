import { Html5Qrcode } from 'html5-qrcode'
import { useEffect, useRef, useState } from 'react'

import styles from './Scanner.module.css'

function Scanner() {
	const [scanResult, setScanResult] = useState(null)
	const [cameraAccessDenied, setCameraAccessDenied] = useState(false)
	const [scanning, setScanning] = useState(false)
	const [fileScanning, setFileScanning] = useState(false)
	const qrCodeRegionId = 'reader'
	const html5QrCodeRef = useRef(null)
	const mediaStreamRef = useRef(null)

	const startScanning = () => {
		const html5QrCode = html5QrCodeRef.current

		if (!html5QrCode) return

		const element = document.getElementById(qrCodeRegionId)
		if (element) {
			html5QrCode
				.start(
					{ facingMode: 'environment' },
					{
						fps: 10,
						qrbox: { width: 350, height: 350 }
					},
					decodedText => {
						setScanResult(decodedText)
						stopScanning()
					},
					error => {
						console.warn(error)
					}
				)
				.then(() => {
					setScanning(true)
				})
				.catch(err => {
					console.error(err)
				})
		} else {
			console.error(`Element with id ${qrCodeRegionId} not found.`)
		}
	}

	const stopScanning = () => {
		if (html5QrCodeRef.current && scanning) {
			html5QrCodeRef.current
				.stop()
				.then(() => {
					html5QrCodeRef.current.clear()
					setScanning(false)

					if (mediaStreamRef.current) {
						mediaStreamRef.current.getTracks().forEach(track => track.stop())
						mediaStreamRef.current = null
					}
				})
				.catch(err => {
					console.error('Failed to clear Html5Qrcode', err)
				})
		}
	}

	const handleStartClick = () => {
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then(stream => {
				setCameraAccessDenied(false)
				mediaStreamRef.current = stream
				startScanning()
			})
			.catch(err => {
				console.error('Access to camera denied', err)
				setCameraAccessDenied(true)
			})
	}

	const handleFileScan = event => {
		const file = event.target.files[0]
		if (file) {
			setFileScanning(true)
			const html5QrCode = html5QrCodeRef.current
			if (html5QrCode) {
				html5QrCode
					.scanFile(file)
					.then(decodedText => {
						setScanResult(decodedText)
						setFileScanning(false)
					})
					.catch(err => {
						console.error('Error scanning file:', err)
						setFileScanning(false)
					})
			}
		}
	}

	useEffect(() => {
		const html5QrCode = new Html5Qrcode(qrCodeRegionId)
		html5QrCodeRef.current = html5QrCode

		return () => {
			stopScanning()
		}
	}, [])

	return (
		<div>
			<h1 style={{ textAlign: 'start' }}>QR Код Сканер</h1>
			{scanResult ? (
				<div>Успешно: {scanResult}</div>
			) : (
				<div className={styles.scanner_wrapper}>
					<div
						id={qrCodeRegionId}
						className={styles.scanner}
						style={{
							backgroundColor: cameraAccessDenied ? '#f54533' : 'white'
						}}
					>
						{cameraAccessDenied && (
							<p className={styles.camera}>Предоставьте доступ к камере</p>
						)}
					</div>
					<div className={styles.button_wrapper}>
						<button
							onClick={handleStartClick}
							disabled={scanning}
							style={{ backgroundColor: !scanning ? '#f77532' : '#c4c4c4' }}
						>
							Начать сканирование
						</button>
						<button
							onClick={stopScanning}
							disabled={!scanning}
							style={{ backgroundColor: scanning ? '#f77532' : '#c4c4c4' }}
						>
							Остановить сканирование
						</button>
					</div>
					<div
						className={styles.file_scan}
						style={{ display: scanning ? 'none' : '' }}
					>
						<p>Если у вас есть файл с кодом, то выберите его</p>
						<input
							className={styles.file_scan__input}
							type='file'
							accept='image/*'
							onChange={handleFileScan}
							disabled={scanning || fileScanning}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default Scanner
