import Alert from 'react-bootstrap/Alert'
import { CheckCircle, ShieldX } from 'react-bootstrap-icons'

export const SuccessAlert = ({close, text}) => {
  return (
    <div>
      <Alert variant="success" onClose={close} dismissible>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <CheckCircle style={{width: '50px', height: '50px'}}/>          
          <p className='h5 mt-3'>{text}</p>
        </div>
      </Alert>
    </div>
  )
}

export const FailedAlert = ({close, text}) => {
  return (
    <div>
      <Alert variant="danger" onClose={close} dismissible>
        <Alert.Heading>
          <ShieldX />
          {text}
        </Alert.Heading>
      </Alert>
    </div>
  )
}