import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './panel.scss';
import { ajax } from 'rxjs/ajax';
import { pluck} from 'rxjs/operators';

const Panel = (props) => {
    const [employees, setEmployees] = useState([]);

    useEffect(()=>{
        ajax({
            url: 'https://reqres.in/api/users',
            method: 'GET',
        }).pipe(
           pluck('response','data')
        ).subscribe(data =>{
            setEmployees([...data])
        });
    },[]);

    
    const deleteEmployee = (id) =>{
        ajax({
            url: `https://reqres.in/api/users/${id}`,
            method: 'DELETE',
        }).subscribe(()=> console.log);
        setEmployees([...employees.filter(o => o.id !== id)]);
    };

    return (
        <div className="panel">
            {
                employees.map((o, index) => (
                    <div className="info-employee" key={o.id}>
                        <div className="avatar">
                            <img src={o.avatar}/>
                        </div> 
                        <div className="description-employee">
                            <p>{ o.first_name + ' ' + o.last_name}</p>
                            <p>{ o.email }</p>
                        </div>       
                        <div className="actions">
                            <button className="delete" onClick={ () => deleteEmployee(o.id)}>Eliminar</button>
                            {/* <button className="edit" onClick={ () => deleteEmployee(o.id)}>Edit</button> */}
                        </div>
                    </div>

                ))
            }
        </div>
    )
}

export default Panel;
