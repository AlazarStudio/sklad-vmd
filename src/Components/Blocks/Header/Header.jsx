import React, { useContext, useState } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../../AuthContext'
import Burger from '../Burger/Burger'

import styles from './Header.module.css'

Modal.setAppElement('#root')

function Header() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { logout } = useContext(AuthContext)

	const handleLogoutClick = () => {
		setIsModalOpen(true)
	}

	const handleLogoutConfirm = () => {
		logout()
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return (
		<header className={styles.header}>
			<div className={styles.widthBlock}>
				<Link to='/'>
					<img src='/images/header_logo.png' alt='Логотип' />
				</Link>
				<Burger />
				<div className={styles.exit} onClick={handleLogoutClick}>
					<img src='/images/logout.png' alt='Выйти' />
				</div>
			</div>

			<Modal
				isOpen={isModalOpen}
				onRequestClose={handleCancel}
				contentLabel='Подтверждение выхода'
				className={styles.modal}
				overlayClassName={styles.modalOverlay}
			>
				<p className={styles.text}>Вы точно хотите выйти?</p>
				<div className={styles.modalActions}>
					<button
						className={styles.confirmButton}
						onClick={handleLogoutConfirm}
					>
						Да
					</button>
					<button className={styles.cancelButton} onClick={handleCancel}>
						Отмена
					</button>
				</div>
			</Modal>
		</header>
	)
}

export default Header
