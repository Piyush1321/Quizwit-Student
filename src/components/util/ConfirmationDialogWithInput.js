import React from 'react'
import '../css/ConfirmationDialogWithInput.css';
function ConfirmationDialogWithInput(props) {
    const hideDialog = () => {
        document.getElementById('confirmation-dialog-with-input').style.display = 'none';
        document.getElementById('route-overlay').style.display = 'none';
    }
    return (
        <div id='confirmation-dialog-with-input'>
            <div className='flex-col jc-sb flex-full'>
                <div className='flex-full'>
                    <h4 className='mb-20 secondary flex-row jc-sb'>
                        <div>Deletion Confirmation</div>
                        <div className='flex-row jc-c m-5'>
                            <i className='fas fa-trash'></i>
                        </div>
                    </h4>
                    <p className='primary' id='delete-exam-title'></p>
                    <p className='mb-10'>
                        <input type="checkbox" id="permanently-delete" className='mr-10' />
                        Permanently Delete
                    </p>
                    <div>
                        <p>Type "DELETE ME" in input box</p>
                        <input type="text" id="delete-me" />
                    </div>
                    <p className='mb-10 danger'>All sections, questions and photos that the exam contains will be deleted.</p>
                </div>
                <div className='flex-row jc-sb'>
                    <button className='btn btn-fade btn-small' onClick={hideDialog}>Cancel</button>
                    <button className='btn btn-danger btn-small' onClick={props.operation}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationDialogWithInput