import Table from 'react-bootstrap/Table';

const CoffeeShops = () => {
    return (
        <div className="wrapper-all">
            <h1>Coffee Shops</h1>

            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Rating</th>
                    <th>Price</th>
                    <th>Hours</th>
                    <th>Phone #</th>
                    </tr>
                </thead>
            </Table>
        </div>
    )   
}

export default CoffeeShops;