import { useParams } from 'react-router-dom'

import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import Acceptance from '../Acceptance/Acceptance'
import AddContractors from '../AddContractors/AddContractors'
import AddGroup from '../AddGroup/AddGroup'
import AddProduct from '../AddProduct/AddProduct'
import AddReport from '../AddReport/AddReport'
import Contractors from '../Contractors/Contractors'
import ContractorsPage from '../ContractorsPage/ContractorsPage'
import Contracts from '../Contracts/Contracts'
import InvoicesIssued from '../InvoicesIssued/InvoicesIssued'
import InvoicesReceived from '../InvoicesReceived/InvoicesReceived'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import Products from '../Products/Products'
import ProductsPage from '../ProductsPage/ProductsPage'
import Purchases from '../Purchases/Purchases'
import Remains from '../Remains/Remains'
import Reports from '../Reports/Reports'
import Sales from '../Sales/Sales'
import Shipments from '../Shipments/Shipments'
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
					{id == 'add-product' && <AddProduct />}
					{id == 'add-product-group' && <AddGroup />}
					{id == 'products' && idType == 'write-offs' && <WriteOffs />}
					{id == 'products' && idType == 'remains' && <Remains />}
					{id == 'products' && idType == 'turnovers' && <Turnovers />}
					{id == 'contractors' && <Contractors />}
					{id == 'contractors' && !idType && <ContractorsPage />}
					{id == 'contractors' && idType == 'contracts' && <Contracts />}
					{id == 'add-contractors' && <AddContractors />}
					{id == 'purchases' && <Purchases />}
					{id == 'purchases' && !idType && <Acceptance />}
					{id == 'purchases' && idType == 'acceptance' && <Acceptance />}
					{id == 'purchases' && idType == 'invoices-received' && (
						<InvoicesReceived />
					)}
					{id == 'sales' && <Sales />}
					{id == 'sales' && !idType && <Shipments />}
					{id == 'sales' && idType == 'shipments' && <Shipments />}
					{id == 'sales' && idType == 'invoices-issued' && <InvoicesIssued />}
					{id == 'reports' && <Reports />}
					{id == 'add-report' && <AddReport />}
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default MainPage
