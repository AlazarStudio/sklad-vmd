import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import * as React from 'react'

import styles from './Scale.module.css'

function valuetext(value) {
	return `${value}`
}

// Создаем тему с измененным цветом слайдера
const theme = createTheme({
	components: {
		MuiSlider: {
			styleOverrides: {
				root: {
					color: '#f77532' // Изменяем цвет слайдера на синий
				}
			}
		}
	}
})

function Scale({ value, onChange, ...props }) {
	const handleChange = (event, newValue) => {
		onChange(newValue)
	}

	return (
		<div className={styles.scale_wrapper}>
			<p className={styles.scale_title}>{props.title}</p>
			<ThemeProvider theme={theme}>
				<Box sx={{ flexBasis: props.size }}>
					<Slider
						getAriaLabel={() => 'Temperature range'}
						value={value}
						onChange={handleChange}
						valueLabelDisplay='auto'
						getAriaValueText={valuetext}
						min={props.min} // Минимальное значение
						max={props.max} // Максимальное значение
					/>
				</Box>
			</ThemeProvider>
		</div>
	)
}

export default Scale
