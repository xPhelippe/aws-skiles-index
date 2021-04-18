import React from 'react';
import editUserPage from '../../images/editUserPageHelp.png';
import editUserFields from '../../images/editUserFields.png';
import updateButton from '../../images/updateButton.png';


function EditUserPageHelp() {
    
        return (
            <table className="table table-striped table-dark" style={{'margin-top': '25px'}} >
            <thead class="thead-dark">
                <tr>
                    <th>Edit User Page</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th rowspan="3"><img src={editUserPage} className="Help-pages" alt="landing-page" /></th>
                    <th>Element</th>
                    <th>Description</th>
                </tr>
    
                <tr>
                    <td><img src={editUserFields} className="Maxi-aang" alt="navigation bar" /></td>
                    <td>Text-fields for existing users to enter their updated first name, last name, and/or investment type information.</td>
                </tr>
                <tr>
                    <td><img src={updateButton} className="Mini-aang" alt="navigation bar" /></td>
                    <td>Clicking the button will submit the updated information and redirects to the home page at /home</td>
                </tr>
            </tbody>
        </table> 
        );
    
}

export default EditUserPageHelp;