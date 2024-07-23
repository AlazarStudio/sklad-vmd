import { useParams } from 'react-router-dom'

import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import Products from '../Products/Products'
import ProductsPage from '../ProductsPage/ProductsPage'
import Purchases from '../Purchases/Purchases'
import Remains from '../Remains/Remains'
import Turnovers from '../Turnovers/Turnovers'
import WriteOffs from '../WriteOffs/WriteOffs'

function MainPage({ children, ...props }) {
	let { id, idType } = useParams()
	console.log(id)
	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					{(id == 'products' || !id) && <Products />}
					{!id && !idType && <ProductsPage />}
					{id == 'products' && !idType && <ProductsPage />}
					{id == 'products' && idType == 'write-offs' && <WriteOffs />}
					{id == 'products' && idType == 'remains' && <Remains />}
					{id == 'products' && idType == 'turnovers' && <Turnovers />}
					{id == 'purchases' && 'purchases page'}
					{id == 'sales' && 'sales page'}
					{id == 'contractors' && 'contractors page'}
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default MainPage
