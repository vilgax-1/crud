import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './crud.scss';
import Panel from '../../components/panel/panel';
import { ajax } from 'rxjs/ajax';
const Crud = (props) => {
    const [formValue, setForm] = useState({ job: '', name: ''});
    const [person, setPerson] = useState({ job: '', name: ''});

    useEffect(()=>{
       ajax({
            url: 'https://reqres.in/api/users',
            method: 'POST',
            body: person
       }).subscribe(data=>{
        console.log(data);
       });
    }, [person]);

    const formSubmit = (e) =>{
        e.preventDefault();  
        setPerson({...formValue}); 
    }

    const formChange = ({target}) => {
        setForm({ 
            ...formValue, 
            [target.name]: target.value
        })
    };
    
    return (
        <div className="container">
            <div className="content">
                <form onSubmit={ formSubmit }>
                    <div className="card">
                        <div className="wrapper">
                            <input type="text" name="name" value={formValue.name} onChange={formChange}  required />
                            <div className="line"></div>
                            <label>Name</label>
                        </div>
                        <div className="wrapper">
                            <input type="text" name="job" value={formValue.job} onChange={formChange}  required />
                            <div className="line"></div>
                            <label>Job</label>
                        </div>
                        <button className="btn-blue" type="submit">Add</button>
                    </div>
                </form>
                <Panel />
            </div>
        </div>
    )
}

export default Crud
