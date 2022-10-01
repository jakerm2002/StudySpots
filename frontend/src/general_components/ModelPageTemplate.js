//import Table from 'react-bootstrap/Table';
import JsonData from '../api_resources/coffeeshops.json'

function ModelPageTemplate(){
    const Dis = JsonData.map(
        (info) => {
            return(
                <tr>
                    <td>{info.id}</td>
                    <td>{info.name}</td>
                    <td>{info.city}</td>
                </tr>
            )
        }
    )
 
    return(
        // <Table striped bordered hover>
        //          <thead>
        //              <tr>
        //              <th>Name</th>
        //                 <th>Address</th>
        //              <th>Rating</th>
        //              <th>Price</th>
        //              <th>Hours</th>
        //              <th>Phone #</th>
        //              </tr>
        //          </thead>
        //      </Table>
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th>Name</th>
                    {/* <th>Name</th>
                    <th>City</th> */}
                    </tr>
                </thead>
                <tbody>
                    {Dis}
                </tbody>
            </table>
             
        </div>
    )
 }
 
 export default ModelPageTemplate;

// const ModelPageTemplate = () => {
// }

// const DataTable = props => {
//     const 
// }


// export default ModelPageTemplate;
