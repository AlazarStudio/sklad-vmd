import { useParams } from 'react-router-dom'

import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import Acceptance from '../Acceptance/Acceptance'
import Contractors from '../Contractors/Contractors'
import ContractorsPage from '../ContractorsPage/ContractorsPage'
import Contracts from '../Contracts/Contracts'
import InvoicesReceived from '../InvoicesReceived/InvoicesReceived'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import Products from '../Products/Products'
import ProductsPage from '../ProductsPage/ProductsPage'
import Purchases from '../Purchases/Purchases'
import Remains from '../Remains/Remains'
import Sales from '../Sales/Sales'
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
					{id == 'contractors' && <Contractors />}
					{id == 'contractors' && !idType && <ContractorsPage />}
					{id == 'contractors' && idType == 'contracts' && <Contracts />}
					{id == 'purchases' && <Purchases />}
					{id == 'purchases' && !idType && <Acceptance />}
					{id == 'purchases' && idType == 'acceptance' && <Acceptance />}
					{id == 'purchases' && idType == 'invoices-received' && (
						<InvoicesReceived />
					)}
					{id == 'sales' && <Sales />}
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default MainPage
