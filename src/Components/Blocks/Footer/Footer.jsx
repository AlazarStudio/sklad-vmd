import { Link } from 'react-router-dom'

import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './Footer.module.css'

function Footer({ children, ...props }) {
	return (
		<footer className={styles.footer}>
			<a
				href='https://alazarstudio.ru/'
				target='_blank'
				rel='noopener noreferrer'
			>
				<img src='/images/alazar_light_footer.png' alt='' />
			</a>
			<div className={styles.footer_info}>
				<a href='/' target='_blank' rel='noopener noreferrer'>
					Политика конфиденциальности
				</a>
				<a href='/' target='_blank' rel='noopener noreferrer'>
					Пользовательское соглашение
				</a>
			</div>
		</footer>
	)
}

export default Footer
